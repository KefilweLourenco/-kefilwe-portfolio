"use server";

import { z } from "zod";
import { createHash } from "crypto";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

const LINKEDIN_RE = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]+\/?$/;

const schema = z.object({
  name: z.string().min(2, "Nome muito curto").max(80).transform(stripHtml),
  role: z.string().min(2, "Cargo muito curto").max(120).transform(stripHtml),
  text: z
    .string()
    .min(20, "Escreva pelo menos 20 caracteres")
    .max(1200, "Máximo de 1200 caracteres")
    .transform(stripHtml),
  avatar_style: z.enum(["liso", "cacheado", "locs"], {
    message: "Escolha um estilo de cabelo para continuar.",
  }),
  skin_tone: z.enum(["branca", "amarela", "morena", "parda", "retinta"]),
  linkedin_url: z
    .string()
    .max(300)
    .refine(
      (v) => v === "" || LINKEDIN_RE.test(v),
      "URL do LinkedIn inválida. Use o formato: https://linkedin.com/in/seu-perfil",
    )
    .transform((v) => (v === "" ? null : v))
    .optional(),
});

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret:   process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!,
        response: token,
        remoteip: ip,
      }),
    });
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.error("[turnstile] falhou:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] request falhou:", err);
    return false;
  }
}

export async function submitRecommendation(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // honeypot
  if (formData.get("website")) {
    return { status: "success" };
  }

  // Turnstile — verificação anti-bot via Cloudflare
  const headersList = await headers();
  const rawIp =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  // Turnstile — obrigatório em produção, ignorado em dev sem a secret key
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (secretKey) {
    const turnstileToken = formData.get("cf-turnstile-response");
    if (!turnstileToken || typeof turnstileToken !== "string") {
      return { status: "error", message: "Verificação de segurança inválida. Tente novamente." };
    }
    const turnstileOk = await verifyTurnstile(turnstileToken, rawIp);
    if (!turnstileOk) {
      return { status: "error", message: "Verificação de segurança falhou. Tente novamente." };
    }
  }

  // rate limit: máximo 3 envios por IP por hora
  const ipHash = hashIp(rawIp);

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("recommendations")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= 3) {
    return { status: "error", message: "Muitas tentativas. Tente novamente em 1 hora." };
  }

  // validação
  const raw = {
    name:         formData.get("name"),
    role:         formData.get("role"),
    text:         formData.get("text"),
    avatar_style: formData.get("avatar_style"),
    skin_tone:    formData.get("skin_tone"),
    linkedin_url: formData.get("linkedin_url") ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  // insert — ip_hash salvo como hash, nunca o IP real
  const { error: insertError } = await supabase.from("recommendations").insert({
    ...parsed.data,
    approved: false,
    ip_hash: ipHash,
  });

  if (insertError) {
    console.error("[recommendations] insert failed:", insertError.code, insertError.message);
    return { status: "error", message: "Erro ao salvar. Tente novamente." };
  }

  // notificação por e-mail — falha silenciosa
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "portfolio@kefilwe.dev",
      to: process.env.RECOMMENDATIONS_EMAIL_TO!,
      subject: `Nova recomendação de ${parsed.data.name}`,
      text: [
        `${parsed.data.name} (${parsed.data.role}) enviou:`,
        `\n"${parsed.data.text}"`,
        parsed.data.linkedin_url ? `\nLinkedIn: ${parsed.data.linkedin_url}` : "",
      ].join("\n"),
    });
  } catch {
    console.error("[recommendations] email notification failed");
  }

  return { status: "success" };
}

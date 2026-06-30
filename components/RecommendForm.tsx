"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import AvatarPicker from "@/components/AvatarPicker";
import { submitRecommendation, FormState } from "@/app/recomendar/actions";
import type { AvatarStyle, SkinTone } from "@/components/Avatar";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const initialState: FormState = { status: "idle" };

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center py-16 gap-5">
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-full text-[1.3rem]"
        style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
        aria-hidden="true"
      >
        ✓
      </span>
      <div className="flex flex-col gap-2">
        <p
          className="font-display text-[1.4rem] font-semibold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Obrigado!
        </p>
        <p className="text-[0.88rem]" style={{ color: "var(--color-muted)" }}>
          Sua recomendação foi enviada com sucesso.
        </p>
        <p className="text-[0.88rem]" style={{ color: "var(--color-muted)" }}>
          Ela será analisada e publicada após aprovação.
        </p>
      </div>
      <a
        href="/"
        className="mt-2 px-5 py-2 rounded-card border text-[0.84rem] font-semibold transition-colors duration-150"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
          background: "var(--color-surface)",
        }}
      >
        Voltar ao portfólio
      </a>
    </div>
  );
}

interface RecommendationFormProps {
  action: (payload: FormData) => void;
  pending: boolean;
  error: string | null;
  avatarStyle: AvatarStyle;
  skinTone: SkinTone;
  onStyleChange: (s: AvatarStyle) => void;
  onSkinChange: (s: SkinTone) => void;
}

function RecommendationForm({
  action,
  pending,
  error,
  avatarStyle,
  skinTone,
  onStyleChange,
  onSkinChange,
}: RecommendationFormProps) {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    // Sem sitekey configurada (dev local sem .env) — widget não renderiza,
    // Server Action deixa passar (ver actions.ts).
    if (!TURNSTILE_SITE_KEY) return;

    let destroyed = false;

    const doRender = () => {
      if (destroyed || !window.turnstile || !turnstileRef.current) return;
      if (widgetId.current) {
        try { window.turnstile.remove(widgetId.current); } catch { /* ignore */ }
      }
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
      });
    };

    if (window.turnstile) {
      // Script já estava carregado quando o componente montou
      doRender();
    } else {
      // Script ainda carregando — registra callback ANTES dele terminar
      window.onloadTurnstileCallback = doRender;
    }

    return () => {
      destroyed = true;
      if (widgetId.current && window.turnstile) {
        try { window.turnstile.remove(widgetId.current); } catch { /* ignore */ }
      }
    };
  }, []);

  return (
    <form action={action} className="flex flex-col gap-6 max-w-lg mx-auto">
      <div className="mb-4">
        <p
          className="font-mono text-[0.72rem] mb-3 tracking-widest uppercase"
          style={{ color: "var(--color-accent)" }}
        >
          Recomendações
        </p>
        <h1
          className="font-display text-[1.8rem] font-semibold tracking-tight leading-[1.2] mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Você trabalhou comigo?
        </h1>
        <p className="text-[0.9rem] max-w-[480px]" style={{ color: "var(--color-muted)" }}>
          Sua recomendação aparecerá no portfólio após aprovação. Leva menos de dois minutos.
        </p>
      </div>

      <AvatarPicker
        style={avatarStyle}
        skin={skinTone}
        onStyleChange={onStyleChange}
        onSkinChange={onSkinChange}
      />
      <input type="hidden" name="avatar_style" value={avatarStyle} />
      <input type="hidden" name="skin_tone"    value={skinTone} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="rec-name" className="text-[0.78rem]" style={{ color: "var(--color-muted)" }}>
          Nome
        </label>
        <input
          id="rec-name"
          name="name"
          type="text"
          required
          placeholder="Seu nome"
          maxLength={80}
          className="w-full rounded-card border bg-transparent px-3 py-2 text-[0.88rem] outline-none focus:border-[var(--color-accent)] transition-colors"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rec-role" className="text-[0.78rem]" style={{ color: "var(--color-muted)" }}>
          Cargo ou função
        </label>
        <input
          id="rec-role"
          name="role"
          type="text"
          required
          placeholder="Ex: Tech Lead na Empresa X"
          maxLength={120}
          className="w-full rounded-card border bg-transparent px-3 py-2 text-[0.88rem] outline-none focus:border-[var(--color-accent)] transition-colors"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rec-text" className="text-[0.78rem]" style={{ color: "var(--color-muted)" }}>
          Recomendação
        </label>
        <textarea
          id="rec-text"
          name="text"
          required
          rows={4}
          placeholder="Escreva sobre sua experiência trabalhando comigo..."
          maxLength={1200}
          className="w-full rounded-card border bg-transparent px-3 py-2 text-[0.88rem] outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rec-linkedin" className="text-[0.78rem]" style={{ color: "var(--color-muted)" }}>
          LinkedIn <span style={{ opacity: 0.6 }}>(opcional)</span>
        </label>
        <input
          id="rec-linkedin"
          name="linkedin_url"
          type="url"
          placeholder="https://linkedin.com/in/seu-perfil"
          maxLength={300}
          className="w-full rounded-card border bg-transparent px-3 py-2 text-[0.88rem] outline-none focus:border-[var(--color-accent)] transition-colors"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        />
        <p className="text-[0.7rem] mt-0.5" style={{ color: "var(--color-muted)", opacity: 0.7 }}>
          Ajuda visitantes e recrutadores a conhecerem quem escreveu a recomendação.
        </p>
      </div>

      {/* Turnstile widget — renderizado via JS explícito após hidratação */}
      <div ref={turnstileRef} />

      {error && (
        <p className="text-[0.8rem]" style={{ color: "#E05555" }}>
          {error}
        </p>
      )}

      <p className="text-[0.74rem] leading-[1.5]" style={{ color: "var(--color-muted)" }}>
        Ao enviar, você concorda que seu nome, cargo e depoimento poderão ser publicados neste portfólio.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="self-start px-5 py-2 rounded-card text-[0.84rem] font-semibold transition-opacity disabled:opacity-50"
        style={{ background: "var(--color-accent)", color: "#fff" }}
      >
        {pending ? "Enviando…" : "Enviar recomendação"}
      </button>
    </form>
  );
}

export default function RecommendForm() {
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>("liso");
  const [skinTone, setSkinTone]       = useState<SkinTone>("morena");
  const [state, action, pending]      = useActionState(submitRecommendation, initialState);

  if (state.status === "success") {
    return <SuccessScreen />;
  }

  return (
    <RecommendationForm
      action={action}
      pending={pending}
      error={state.status === "error" ? state.message : null}
      avatarStyle={avatarStyle}
      skinTone={skinTone}
      onStyleChange={setAvatarStyle}
      onSkinChange={setSkinTone}
    />
  );
}

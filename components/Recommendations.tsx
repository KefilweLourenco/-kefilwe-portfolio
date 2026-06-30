import { supabase } from "@/lib/supabase";
import Avatar from "@/components/Avatar";
import type { AvatarStyle, SkinTone } from "@/components/Avatar";
import Link from "next/link";

interface Recommendation {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar_style: AvatarStyle;
  skin_tone: SkinTone;
  linkedin_url: string | null;
}

async function getRecommendations(): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from("recommendations")
    .select("id, name, role, text, avatar_style, skin_tone, linkedin_url")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }
  return data ?? [];
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <article
      className="flex flex-col gap-6 p-7 rounded-card border"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      {/* depoimento — elemento principal */}
      <p
        className="text-[0.92rem] leading-[1.8] flex-1"
        style={{ color: "var(--color-text)" }}
      >
        &ldquo;{rec.text}&rdquo;
      </p>

      {/* autor */}
      <div
        className="flex items-center gap-4 pt-5 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Avatar style={rec.avatar_style} skin={rec.skin_tone} size={46} />

        <div className="flex flex-col gap-1 min-w-0">
          <p
            className="text-[0.92rem] font-semibold leading-none"
            style={{ color: "var(--color-text)" }}
          >
            {rec.name}
          </p>

          <p className="text-[0.8rem] leading-snug" style={{ color: "var(--color-muted)" }}>
            {rec.role}
          </p>

          {rec.linkedin_url && (
            <a
              href={rec.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[0.72rem] mt-0.5 w-fit transition-opacity duration-150"
              style={{ color: "var(--color-accent)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function Recommendations() {
  const recs = await getRecommendations();

  return (
    <section
      id="recomendacoes"
      aria-labelledby="recs-title"
      className="border-t py-14"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-container px-6 mb-10">
        <p
          className="font-mono text-[0.72rem] mb-2 tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          Na voz de quem conhece
        </p>
        <h2
          id="recs-title"
          className="font-display text-[1.3rem] font-semibold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Recomendações
        </h2>
      </div>

      <div className="mx-auto max-w-container px-6">
        {recs.length === 0 && (
          <p className="text-[0.84rem]" style={{ color: "var(--color-muted)" }}>
            Seja o primeiro a recomendar.{" "}
            <Link href="/recomendar" style={{ color: "var(--color-accent)" }}>
              Deixar recomendação →
            </Link>
          </p>
        )}

        {/* 1 card: centralizado, largura contida */}
        {recs.length === 1 && (
          <div className="max-w-lg">
            <RecommendationCard rec={recs[0]} />
          </div>
        )}

        {/* 2+ cards: grid responsivo */}
        {recs.length >= 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {recs.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        )}

        {recs.length > 0 && (
          <div className="mt-5">
            <Link
              href="/recomendar"
              className="text-[0.8rem] font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              Compartilhar uma recomendação →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

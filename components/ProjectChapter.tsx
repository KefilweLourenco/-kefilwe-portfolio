// Seção de projetos em formato editorial (não grid de cards).
// Dados vêm de featuredProject em lib/data.ts.
import Image from "next/image";
import { featuredProject } from "@/lib/data";

export default function ProjectChapter() {
  return (
    <section
      id="projetos"
      aria-labelledby="project-chapter-title"
      className="border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-container px-6 py-16">
        <h2 id="project-chapter-title" className="sr-only">
          Projeto
        </h2>
        <div className="grid gap-9 sm:grid-cols-2 sm:items-center">
          {/* Coluna esquerda — imagem + legenda com link para o projeto */}
          <div>
            <Image
              src={featuredProject.image}
              alt={featuredProject.alt}
              width={0}
              height={0}
              sizes="(max-width: 640px) 100vw, 50vw"
              // width/height zerados + w-full h-auto: Next.js calcula o tamanho real
              // da imagem automaticamente sem distorcer.
              className="w-full h-auto rounded-card"
            />
            <p
              className="mt-2.5 text-[0.8rem] leading-[1.5]"
              style={{ color: "var(--color-muted)" }}
            >
              <span className="mr-2 font-mono" style={{ color: "var(--color-text)" }}>
                {featuredProject.captionLabel}
              </span>
              {featuredProject.captionTech}{" "}
              <a
                href={featuredProject.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {featuredProject.link.label} ↗
              </a>
            </p>
          </div>

          {/* Coluna direita — texto narrativo com links inline.
              closingParts, closingParts2 e githubLine são arrays de partes
              { type: "text" | "link", value, href? } renderizados como um único <p>. */}
          <div>
            {featuredProject.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[0.95rem] leading-[1.75]"
                style={{
                  color: "var(--color-text)",
                  marginBottom: i < featuredProject.paragraphs.length - 1 ? "16px" : "20px",
                }}
              >
                {p}
              </p>
            ))}
            {[featuredProject.closingParts, featuredProject.closingParts2, featuredProject.githubLine].map((parts, pi) => (
              <p
                key={pi}
                className="text-[0.95rem] leading-[1.75]"
                style={{ color: "var(--color-text)", marginTop: "16px" }}
              >
                {parts.map((part, i) =>
                  part.type === "link" ? (
                    <a
                      key={i}
                      href={part.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {part.value}
                    </a>
                  ) : (
                    <span key={i}>{part.value}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

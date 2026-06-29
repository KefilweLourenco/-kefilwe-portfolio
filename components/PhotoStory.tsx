// Seção editorial com foto quadrada + texto narrativo lado a lado.
// Usado três vezes na página: fotos 01, 02 (de photoStories) e 03 (testimonial).
// Dados vêm de photoStories[] e testimonial em lib/data.ts.
import Image from "next/image";

type PhotoStoryProps = {
  slug?: string; // vira id da seção para ancoragem (ex: href="#presencial")
  title: string;
  description: string | string[]; // aceita string simples ou array de parágrafos
  image: string;
  alt: string;
  reverse?: boolean; // true = foto à direita, texto à esquerda
  captionNumber?: string;
  caption?: string;
};

export default function PhotoStory({
  slug,
  title,
  description,
  image,
  alt,
  reverse = false,
  captionNumber,
  caption,
}: PhotoStoryProps) {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section
      id={slug}
      aria-labelledby={`photo-story-${title}`}
      className="border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-container px-6 py-10">
        <div
          className={`grid gap-9 sm:grid-cols-2 sm:items-center ${
            reverse ? "sm:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* flex flex-col garante que a legenda (figcaption) sempre fique
              colada imediatamente abaixo da foto, sem gap extra da grid. */}
          <div className="flex flex-col">
            <div
              className="relative aspect-square overflow-hidden"
              style={{ background: "var(--color-bg)" }}
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, 480px"
                className="object-contain"
              />
              {/* Fade lateral dissolve a borda EXTERNA da foto (lado oposto ao texto)
                  para o sujeito (Kefilwe) se destacar no lado interno. */}
              <div
                className="absolute inset-0"
                style={{
                  background: reverse
                    ? "linear-gradient(to left, var(--color-bg) 0%, transparent 24%)"
                    : "linear-gradient(to right, var(--color-bg) 0%, transparent 24%)",
                }}
              />
              {/* Fade inferior dissolve a base da foto no fundo da página. */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, var(--color-bg) 0%, transparent 26%)" }}
              />
            </div>
            {caption && (
              <p
                className="mt-2.5 text-[0.8rem] leading-[1.5]"
                style={{ color: "var(--color-muted)" }}
              >
                {captionNumber && (
                  <span
                    className="mr-2 font-mono"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {captionNumber}
                  </span>
                )}
                {caption}
              </p>
            )}
          </div>
          <div>
            <h2
              id={`photo-story-${title}`}
              className="font-display mb-2.5 text-[1.2rem] font-semibold tracking-tight"
            >
              {title}
            </h2>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="max-w-[400px] text-[0.92rem] leading-[1.75]"
                style={{
                  color: "var(--color-text)",
                  marginBottom: i < paragraphs.length - 1 ? "12px" : 0,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

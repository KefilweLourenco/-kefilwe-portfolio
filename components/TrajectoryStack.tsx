// Seção de trajetória (timeline) + tecnologias por era.
// Dados vêm de timeline[] e stackEras[] em lib/data.ts.
import Image from "next/image";
import { timeline, stackEras } from "@/lib/data";

export default function TrajectoryStack() {
  return (
    <section
      id="trajetoria"
      aria-labelledby="trajectory-stack-title"
      className="border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-container px-6 py-16">
        <h2 id="trajectory-stack-title" className="sr-only">
          Trajetória e stack
        </h2>
        <div className="grid gap-12 sm:grid-cols-[1.2fr_1fr]">
          {/* Coluna esquerda — timeline vertical com linha e bolinhas */}
          <ol>
            {timeline.map((item, index) => (
              <li
                key={item.title}
                className={`relative pl-[22px] ${
                  index < timeline.length - 1 ? "border-l pb-6" : "border-l"
                }`}
                style={{ borderColor: "var(--color-border)" }}
              >
                {/* Bolinha verde posicionada sobre a linha vertical */}
                <span
                  aria-hidden="true"
                  className="absolute left-[-5px] top-1 h-[9px] w-[9px] rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 0 3px var(--color-bg)", // anel no fundo da página cria separação visual
                  }}
                />
                <p
                  className="mb-1.5 font-mono text-[0.72rem]"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.date}
                </p>
                <h3 className="font-display mb-1.5 text-[1rem] font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p
                  className="text-[0.87rem] leading-[1.65]"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          {/* Coluna direita — stacks por era com ícones do Simple Icons via CDN */}
          <div>
            <p
              className="mb-4 font-mono text-[0.72rem] font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              Tecnologias por fase
            </p>
            {stackEras.map((era) => (
              <div key={era.label} className="mb-6">
                <p
                  className="mb-2.5 text-[0.78rem] font-semibold tracking-tight"
                  style={{ color: "var(--color-text)" }}
                >
                  {era.label}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {era.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-[6px] text-[0.78rem] whitespace-nowrap"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.slug ? (
                        // Ícone carregado do Simple Icons CDN usando slug e cor hex do item.
                        // alt="" porque é decorativo — o nome ao lado já descreve.
                        <Image
                          src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
                          alt=""
                          width={13}
                          height={13}
                          unoptimized
                        />
                      ) : (
                        // Placeholder invisível para alinhar itens sem ícone com os que têm.
                        <span className="inline-block w-[13px] shrink-0" aria-hidden="true" />
                      )}
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Dados vêm de processSteps em lib/data.ts (3 itens: Compreender, Estruturar, Construir).
import { processSteps } from "@/lib/data";

export default function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* sr-only: o h2 existe para leitores de tela mas não aparece visualmente. */}
      <h2 id="process-title" className="sr-only">
        Como eu trabalho
      </h2>
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid gap-7 sm:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              // No mobile empilha com borda no topo; no desktop usa borda lateral (esquerda).
              className={
                index > 0
                  ? "border-t pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0"
                  : ""
              }
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="mb-3.5 block font-mono text-[0.78rem] font-medium"
                style={{ color: "var(--color-accent)" }}
              >
                {step.number}
              </span>
              <h3 className="font-display mb-2.5 text-[1.2rem] font-semibold tracking-tight">
                {step.title}
              </h3>
              <p
                className="max-w-[280px] text-[0.92rem] leading-[1.6]"
                style={{ color: "var(--color-text)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

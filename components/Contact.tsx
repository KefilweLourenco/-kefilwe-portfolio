// Dados vêm de contact em lib/data.ts (email, linkedin, github).
import { contact } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="border-t py-16 text-center"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-container px-6">
        <h2
          id="contact-title"
          className="font-display mb-2.5 text-[1.4rem] font-semibold tracking-tight"
        >
          Vamos construir algo juntos?
        </h2>
        <p
          className="mx-auto mb-[26px] max-w-[440px] text-[0.9rem]"
          style={{ color: "var(--color-text)" }}
        >
          Disponível para oportunidades como Desenvolvedor Full Stack, Instrutor de Tecnologia ou áreas que conectem tecnologia e educação.
        </p>

        {/* Os três links são gerados a partir de um array local.
            external: true adiciona target="_blank" e rel para segurança em links externos. */}
        <div className="flex justify-center gap-5">
          {[
            { href: `mailto:${contact.email}`, label: "E-mail", symbol: "@", external: false },
            { href: contact.linkedin, label: "LinkedIn", symbol: "in", external: true },
            { href: contact.github, label: "GitHub", symbol: "gh", external: true },
          ].map(({ href, label, symbol, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex flex-col items-center gap-1.5 group"
            >
              {/* group no <a> + group-hover no <span> faz o hover do link inteiro
                  mudar a borda do ícone, sem precisar de JS. */}
              <span
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-card border text-[0.85rem] font-semibold transition-colors duration-150 group-hover:border-[var(--color-accent)]"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                {symbol}
              </span>
              <span className="text-[0.68rem]" style={{ color: "var(--color-muted)" }}>{label}</span>
            </a>
          ))}
        </div>

        {/* download faz o browser baixar o PDF em vez de abrir no browser. */}
        <a
          href="/docs/curriculo-kefilwe-lourenco.pdf"
          download
          className="inline-flex items-center gap-1.5 text-[0.82rem]"
          style={{ color: "var(--color-accent)" }}
        >
          Ler currículo ↗
        </a>
      </div>
    </section>
  );
}

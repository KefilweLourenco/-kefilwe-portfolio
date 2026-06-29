import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-container gap-14 px-6 py-24 sm:grid-cols-[1.4fr_0.57fr] sm:items-center sm:gap-12"
    >
      <div>
        <div
          className="mb-[22px] inline-flex items-center gap-2 text-[0.78rem] font-semibold"
          style={{ color: "var(--color-muted)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 0 0 3px var(--color-accent-soft)",
            }}
          />
          Disponível para oportunidades
        </div>

        <h1
          id="hero-title"
          className="font-display mb-[22px] text-[clamp(2.4rem,4.2vw,3.4rem)] font-semibold leading-[1.08] tracking-tight"
        >
          Tecnologia para <span style={{ color: "var(--color-accent)" }}>pessoas.</span>
        </h1>

        <p
          className="mb-8 max-w-[480px] text-[1.05rem] leading-[1.65]"
          style={{ color: "var(--color-text)" }}
        >
          Transformo compreensão em experiências digitais acessíveis, claras e humanas.
        </p>

        <div className="flex flex-col items-start gap-2.5">
          <a
            href="#projetos"
            className="inline-flex items-center gap-1.5 rounded-[8px] border px-4 py-2 text-[0.82rem] font-semibold"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-accent-contrast)",
              borderColor: "var(--color-accent)",
            }}
          >
            Conhecer projetos →
          </a>
        </div>
      </div>

      <div className="relative">
  <div className="relative aspect-[4/5] overflow-hidden">
    <Image
      src="/images/kefilwe.jpg"
      alt="Kefilwe Lourenço, desenvolvedor Fullstack Júnior"
      fill
      sizes="(max-width: 640px) 100vw, 480px"
      className="object-cover"
      priority
    />
    {/* fade horizontal — funde a borda esquerda da foto no fundo */}
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(to right, var(--color-bg) 0%, transparent 26%)" }}
    />
    {/* fade vertical — funde a base da foto no fundo */}
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(to top, var(--color-bg) 0%, transparent 28%)" }}
    />
  </div>
  <div
    className="absolute bottom-4 left-4 font-mono text-[0.7rem]"
    style={{ color: "var(--color-muted)" }}
  >
    React • TypeScript • NestJS
  </div>
</div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para expandir o header de max-w-container para largura total.
  // { passive: true } melhora performance — diz ao browser que não vai chamar preventDefault.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Fundo em div separado para que o backdrop-blur e a opacidade
          não afetem o texto e botões dentro do nav. */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "var(--color-bg)", opacity: 0.88 }}
      />
      <nav
        className={`relative flex items-center justify-between gap-5 px-6 py-[18px] transition-[max-width,margin] duration-300 ease-in-out ${
          scrolled ? "mx-0 max-w-none" : "mx-auto max-w-container"
        }`}
      >
        <a
          href="/#inicio"
          aria-label="Voltar ao início do portfólio"
          className="font-display text-[1.1rem] font-semibold tracking-tight"
        >
          Kefilwe <span style={{ color: "var(--color-accent)" }}>L.</span>
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

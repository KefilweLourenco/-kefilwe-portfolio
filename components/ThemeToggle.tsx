"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // mounted evita hydration mismatch: no servidor o tema ainda não é conhecido,
  // então renderiza um botão placeholder até o componente montar no cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="rounded-pill border px-3.5 py-1.5 text-[0.78rem] font-medium"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
        aria-hidden="true"
      >
        Modo claro
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={!isDark}
      className="rounded-pill border px-3.5 py-1.5 text-[0.78rem] font-medium transition-all duration-150 hover:border-[var(--color-accent)]"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}
    >
      {isDark ? "Modo claro" : "Modo escuro"}
    </button>
  );
}

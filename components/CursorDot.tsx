"use client";

import { useEffect, useRef, useState } from "react";

// Tags que contêm texto legível — quando o cursor passa sobre elas, a bolinha some.
const TEXT_TAGS = new Set([
  "P", "H1", "H2", "H3", "H4", "H5", "H6",
  "SPAN", "LI", "LABEL", "BLOCKQUOTE", "A", "STRONG", "EM", "TIME",
]);

// Sobe no DOM a partir do elemento sob o cursor até BODY.
// Se encontrar qualquer TEXT_TAG no caminho, retorna true.
// getComputedStyle().cursor não funciona em parágrafos normais (retorna "auto"),
// por isso a checagem é feita manualmente nas tags.
function isOverText(e: MouseEvent): boolean {
  let el = e.target as HTMLElement | null;
  while (el && el.tagName !== "BODY") {
    if (TEXT_TAGS.has(el.tagName)) return true;
    el = el.parentElement;
  }
  return false;
}

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Respeita prefers-reduced-motion (acessibilidade WCAG 2.1).
  // Se o usuário configurou "reduzir movimento" no sistema, a bolinha não aparece.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    let raf: number;
    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(!isOverText(e));
      // requestAnimationFrame sincroniza o movimento com o refresh do monitor,
      // evitando lag e consumo desnecessário de CPU.
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        // top/left negativos compensam o centro do círculo (metade de 10px).
        top: -5,
        left: -5,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "var(--color-accent)",
        pointerEvents: "none", // impede que a bolinha bloqueie cliques
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
        willChange: "transform", // avisa o browser para preparar aceleração GPU
      }}
    />
  );
}

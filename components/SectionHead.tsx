export default function SectionHead({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-9 max-w-[560px]">
      <span
        className="mb-2.5 block text-[0.78rem] font-semibold tracking-wide"
        style={{ color: "var(--color-accent)" }}
      >
        {kicker}
      </span>
      <h2 className="font-display mb-2.5 text-[1.7rem] font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-[0.95rem] leading-[1.6]" style={{ color: "var(--color-muted)" }}>
          {description}
        </p>
      )}
    </div>
  );
}

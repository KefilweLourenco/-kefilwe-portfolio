"use client";

import Avatar, {
  AvatarStyle,
  SkinTone,
  SKIN_COLORS,
  SKIN_LABELS,
} from "@/components/Avatar";

const STYLES: { value: AvatarStyle; label: string }[] = [
  { value: "liso",     label: "Liso" },
  { value: "cacheado", label: "Crespo" },
  { value: "locs",     label: "Locs" },
];

const SKINS: SkinTone[] = ["branca", "amarela", "morena", "parda", "retinta"];

interface AvatarPickerProps {
  style: AvatarStyle;
  skin: SkinTone;
  onStyleChange: (s: AvatarStyle) => void;
  onSkinChange: (s: SkinTone) => void;
}

export default function AvatarPicker({
  style,
  skin,
  onStyleChange,
  onSkinChange,
}: AvatarPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* preview com aro verde */}
      <div
        className="rounded-full overflow-hidden self-start"
        style={{ outline: "2px solid var(--color-accent)", outlineOffset: "2px" }}
      >
        <Avatar style={style} skin={skin} size={72} />
      </div>

      {/* pills de estilo */}
      <div className="flex flex-col gap-2">
        <p className="text-[0.78rem]" style={{ color: "var(--color-muted)" }}>
          Escolha um cabelo
        </p>
        <div className="flex gap-2 flex-wrap">
          {STYLES.map((s) => {
            const selected = style === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => onStyleChange(s.value)}
                className="px-4 py-1.5 rounded-full border text-[0.82rem] transition-colors duration-150"
                style={{
                  borderColor: selected ? "var(--color-accent)" : "var(--color-border)",
                  color:       selected ? "var(--color-accent)" : "var(--color-muted)",
                  background:  "transparent",
                  fontWeight:  selected ? 600 : 400,
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* swatches de tom de pele */}
      <div className="flex gap-2 items-center">
        {SKINS.map((t) => (
          <button
            key={t}
            type="button"
            title={SKIN_LABELS[t]}
            onClick={() => onSkinChange(t)}
            className="w-6 h-6 rounded-full border-2 transition-transform duration-100 hover:scale-110"
            style={{
              background:    SKIN_COLORS[t].fill,
              borderColor:   skin === t ? "var(--color-accent)" : "transparent",
              outline:       skin === t ? "2px solid var(--color-accent)" : "none",
              outlineOffset: "2px",
            }}
            aria-label={SKIN_LABELS[t]}
          />
        ))}
      </div>
    </div>
  );
}

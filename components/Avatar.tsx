export type AvatarStyle = "liso" | "cacheado" | "locs";
export type SkinTone = "branca" | "amarela" | "morena" | "parda" | "retinta";

export const SKIN_COLORS: Record<SkinTone, { fill: string; shadow: string }> = {
  branca:  { fill: "#F2C9A0", shadow: "#C8956A" },
  amarela: { fill: "#E8B07A", shadow: "#A06830" },
  morena:  { fill: "#C17F4A", shadow: "#7A4A1A" },
  parda:   { fill: "#8B5A2B", shadow: "#5A3010" },
  retinta: { fill: "#3D1C06", shadow: "#6B3010" },
};

export const SKIN_LABELS: Record<SkinTone, string> = {
  branca:  "Branca",
  amarela: "Amarela",
  morena:  "Morena",
  parda:   "Parda",
  retinta: "Retinta",
};

const HAIR_COLOR  = "#0D0503";
const BG_COLOR    = "#1C2B1A";
const SHIRT_COLOR = "#2D4A29";

function HairLiso() {
  return (
    <>
      <ellipse cx="30" cy="22" rx="17" ry="13" fill={HAIR_COLOR} />
      <rect x="13" y="18" width="6" height="26" rx="3" fill={HAIR_COLOR} />
      <rect x="41" y="18" width="6" height="26" rx="3" fill={HAIR_COLOR} />
    </>
  );
}

function HairCacheado() {
  return (
    <>
      <ellipse cx="30" cy="22" rx="18" ry="14" fill={HAIR_COLOR} />
      <circle cx="22" cy="12" r="9" fill={HAIR_COLOR} />
      <circle cx="30" cy="10" r="9" fill={HAIR_COLOR} />
      <circle cx="38" cy="12" r="9" fill={HAIR_COLOR} />
      <circle cx="13" cy="22" r="8" fill={HAIR_COLOR} />
      <circle cx="47" cy="22" r="8" fill={HAIR_COLOR} />
      <circle cx="12" cy="33" r="8" fill={HAIR_COLOR} />
      <circle cx="48" cy="33" r="8" fill={HAIR_COLOR} />
    </>
  );
}

// Locs: base larga colada ao rosto + tranças densas
function HairLocs() {
  return (
    <>
      <ellipse cx="30" cy="20" rx="18" ry="12" fill={HAIR_COLOR} />
      <rect x="12" y="18" width="5" height="22" rx="2.5" fill={HAIR_COLOR} />
      <rect x="43" y="18" width="5" height="22" rx="2.5" fill={HAIR_COLOR} />
      <rect x="18" y="14" width="5" height="26" rx="2.5" fill={HAIR_COLOR} />
      <rect x="24" y="12" width="5" height="28" rx="2.5" fill={HAIR_COLOR} />
      <rect x="30" y="11" width="5" height="29" rx="2.5" fill={HAIR_COLOR} />
      <rect x="36" y="11" width="5" height="29" rx="2.5" fill={HAIR_COLOR} />
      <rect x="42" y="12" width="5" height="28" rx="2.5" fill={HAIR_COLOR} />
    </>
  );
}

const HAIR_COMPONENTS = {
  liso:     HairLiso,
  cacheado: HairCacheado,
  locs:     HairLocs,
};

interface AvatarProps {
  style: AvatarStyle;
  skin: SkinTone;
  size?: number;
}

export default function Avatar({ style, skin, size = 60 }: AvatarProps) {
  const { fill, shadow } = SKIN_COLORS[skin];
  const Hair = HAIR_COMPONENTS[style];
  const id = `clip-${style}-${skin}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <clipPath id={id}>
        <circle cx="30" cy="30" r="28" />
      </clipPath>
      <circle cx="30" cy="30" r="28" fill={BG_COLOR} />
      {/* camisa */}
      <ellipse cx="30" cy="68" rx="24" ry="14" fill={SHIRT_COLOR} clipPath={`url(#${id})`} />
      {/* pescoço — mais largo */}
      <rect x="24" y="46" width="12" height="12" fill={fill} clipPath={`url(#${id})`} />
      {/* rosto */}
      <ellipse cx="30" cy="34" rx="13" ry="14" fill={fill} />
      {/* cabelo */}
      <Hair />
      {/* olhos */}
      <circle cx="25" cy="32" r="1.8" fill={shadow} />
      <circle cx="35" cy="32" r="1.8" fill={shadow} />
    </svg>
  );
}

// Ilustraciones SVG de productos (mug y camiseta) con diseños de ejemplo.
// Se usan mientras no haya fotos reales en Supabase.

export type Arte = "sol" | "ondas" | "texto" | "puntos" | "corazon" | "rayo";

const INK = "#1A1423";

function ArteSVG({
  arte,
  uid,
  texto,
  x,
  y,
  w,
  h,
}: {
  arte: Arte;
  uid: string;
  texto?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <svg x={x} y={y} width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sunset-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF3D7F" />
          <stop offset="1" stopColor="#FF8C42" />
        </linearGradient>
        <pattern id={`dots-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="3.2" fill="#FFF6E9" />
        </pattern>
      </defs>

      {arte === "sol" && (
        <>
          <rect width="100" height="100" fill={`url(#sunset-${uid})`} />
          <circle cx="50" cy="58" r="24" fill="#FFD23F" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="0" y={62 + i * 7} width="100" height="3" fill="#FF3D7F" />
          ))}
          <path d="M0 100 L28 70 L48 88 L70 62 L100 100 Z" fill={INK} />
        </>
      )}

      {arte === "ondas" && (
        <>
          <rect width="100" height="100" fill="#3D5AFE" />
          {[18, 38, 58, 78].map((yy, i) => (
            <path
              key={yy}
              d={`M-10 ${yy} q 15 -12 30 0 t 30 0 t 30 0 t 30 0`}
              stroke={i % 2 ? "#FFD23F" : "#FFF6E9"}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </>
      )}

      {arte === "texto" && (
        <>
          <rect width="100" height="100" fill="#FFD23F" />
          <circle cx="82" cy="18" r="10" fill="#FF3D7F" />
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize={texto && texto.length > 8 ? 15 : 20}
            fill={INK}
          >
            {texto ?? "TE AMO"}
          </text>
          <path d="M20 70 q 30 10 60 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {arte === "puntos" && (
        <>
          <rect width="100" height="100" fill="#2EC4B6" />
          <rect width="100" height="100" fill={`url(#dots-${uid})`} />
          <circle cx="50" cy="50" r="22" fill="#FF3D7F" stroke={INK} strokeWidth="4" />
          <circle cx="42" cy="45" r="3" fill={INK} />
          <circle cx="58" cy="45" r="3" fill={INK} />
          <path d="M40 56 q10 9 20 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {arte === "corazon" && (
        <>
          <rect width="100" height="100" fill="#C8B6FF" />
          <path
            d="M50 82 C 18 60 14 40 28 30 C 38 23 47 28 50 36 C 53 28 62 23 72 30 C 86 40 82 60 50 82 Z"
            fill="#FF3D7F"
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M35 40 q4 -6 10 -4" stroke="#FFF6E9" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {arte === "rayo" && (
        <>
          <rect width="100" height="100" fill={INK} />
          {[...Array(6)].map((_, i) => (
            <circle key={i} cx={(i * 37) % 100} cy={(i * 53) % 100} r="1.8" fill="#FFF6E9" />
          ))}
          <path
            d="M56 10 L28 56 L48 56 L40 90 L72 40 L52 40 Z"
            fill="#FFD23F"
            stroke="#FF3D7F"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

export function Mug({
  arte = "sol",
  texto,
  uid,
  className,
}: {
  arte?: Arte;
  texto?: string;
  uid: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Mug personalizado">
      <ellipse cx="96" cy="184" rx="62" ry="8" fill={INK} opacity="0.15" />
      {/* asa */}
      <path
        d="M148 72 h10 a30 30 0 0 1 0 60 h-10"
        stroke={INK}
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M148 72 h10 a30 30 0 0 1 0 60 h-10"
        stroke="#FFFFFF"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* cuerpo */}
      <rect x="38" y="44" width="116" height="136" rx="16" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
      <ArteSVG arte={arte} texto={texto} uid={uid} x={46} y={64} w={100} h={100} />
      <rect x="46" y="64" width="100" height="100" fill="none" stroke={INK} strokeWidth="2" opacity="0.15" />
      {/* brillo */}
      <rect x="52" y="54" width="10" height="118" rx="5" fill="#FFFFFF" opacity="0.45" />
      {/* boca */}
      <ellipse cx="96" cy="46" rx="58" ry="10" fill="#F1ECE4" stroke={INK} strokeWidth="4" />
    </svg>
  );
}

export function Camiseta({
  arte = "ondas",
  texto,
  color = "#FFFFFF",
  uid,
  className,
}: {
  arte?: Arte;
  texto?: string;
  color?: string;
  uid: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Camiseta personalizada">
      <ellipse cx="100" cy="188" rx="60" ry="7" fill={INK} opacity="0.15" />
      <path
        d="M72 22 L46 30 L12 60 L34 90 L52 78 L52 180 L148 180 L148 78 L166 90 L188 60 L154 30 L128 22 Q100 46 72 22 Z"
        fill={color}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M72 22 Q100 46 128 22" stroke={INK} strokeWidth="4" fill="none" />
      <path d="M52 78 L52 96 M148 78 L148 96" stroke={INK} strokeWidth="3" opacity="0.25" />
      <ArteSVG arte={arte} texto={texto} uid={uid} x={68} y={66} w={64} h={64} />
      <rect x="68" y="66" width="64" height="64" fill="none" stroke={INK} strokeWidth="2" opacity="0.15" />
    </svg>
  );
}

/** Estrella tipo sticker con texto, para los badges. */
export function Estallido({
  className,
  color = "#FFD23F",
  children,
}: {
  className?: string;
  color?: string;
  children?: React.ReactNode;
}) {
  const puntas = 14;
  const pts = Array.from({ length: puntas * 2 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 41;
    const a = (Math.PI * i) / puntas - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <div className={`${className?.includes("absolute") ? "" : "relative"} ${className ?? ""}`}>
      <svg viewBox="-4 -4 108 108" className="absolute inset-0 h-full w-full animate-spin-slow">
        <polygon points={pts} fill={color} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center p-4 text-center">{children}</div>
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <path d="M15 4 q-3 4 0 8 M22 3 q-3 5 0 9" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M30 18 h2 a6 6 0 0 1 0 12 h-2" stroke={INK} strokeWidth="3.5" fill="none" />
        <rect x="6" y="14" width="25" height="22" rx="5" fill="#FF3D7F" stroke={INK} strokeWidth="3" />
        <circle cx="18.5" cy="25" r="4.5" fill="#FFD23F" stroke={INK} strokeWidth="2" />
      </svg>
      <span className="font-display text-2xl font-extrabold tracking-tight">
        tintazo<span className="text-fucsia">.</span>
      </span>
    </span>
  );
}

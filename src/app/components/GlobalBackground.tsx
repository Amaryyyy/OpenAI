/**
 * Fond fixe global — palette mesh (teal / bleu / bronze) très atténuée.
 * Fixed derrière tout le site, -z-10 pour ne jamais couvrir le contenu.
 */
export default function GlobalBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Base chaude off-white */}
      <div className="absolute inset-0 bg-[#ede9e4]" />

      {/* Blob 1 — teal, haut-gauche */}
      <div
        className="absolute -left-[18%] -top-[20%] h-[min(110vw,900px)] w-[min(110vw,900px)] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(42,95,95,0.28)_0%,rgba(42,95,95,0.06)_55%,transparent_75%)] blur-[90px]"
        style={{ animation: 'blob-drift-a 28s ease-in-out infinite' }}
      />

      {/* Blob 2 — bleu nuit, droite haute */}
      <div
        className="absolute -right-[15%] top-[8%] h-[min(90vw,780px)] w-[min(90vw,780px)] rounded-full bg-[radial-gradient(circle_at_55%_45%,rgba(53,74,114,0.22)_0%,rgba(53,74,114,0.05)_55%,transparent_75%)] blur-[100px]"
        style={{ animation: 'blob-drift-b 34s ease-in-out infinite' }}
      />

      {/* Blob 3 — bronze/gold, centre-bas */}
      <div
        className="absolute -bottom-[15%] left-[25%] h-[min(80vw,720px)] w-[min(80vw,720px)] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(180,145,95,0.18)_0%,rgba(180,145,95,0.04)_55%,transparent_75%)] blur-[110px]"
        style={{ animation: 'blob-drift-c 38s ease-in-out infinite' }}
      />

      {/* Blob 4 — teal doux, bas-droite */}
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[min(70vw,600px)] w-[min(70vw,600px)] rounded-full bg-[radial-gradient(circle_at_45%_55%,rgba(42,95,95,0.16)_0%,transparent_65%)] blur-[80px]"
        style={{ animation: 'blob-drift-d 30s ease-in-out infinite' }}
      />

      {/* Grain très léger — subtil sur fond clair */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="global-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-noise)" />
      </svg>
    </div>
  );
}

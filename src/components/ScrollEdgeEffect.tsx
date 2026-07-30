/**
 * Figma's "Scroll Edge Effect" — the progressive blur that fades content out at an edge.
 * It is two stacked backdrop filters, not one: a light pass across the whole band, plus a
 * heavier pass on a 90%-opaque plate that a gradient mask ramps away. Stacking them is
 * what gives the blur its depth — a single layer reads as a hard line where it stops.
 *
 * The instances differ along four axes, so these are props rather than separate components:
 *
 * - `tone` — white under the navigation and over light pages; ink for the "- Soft" variant,
 *   which caps dark photography (the hall-of-fame cards, the About map) and carries white
 *   copy over it.
 * - `blur` — the outer radius: 5 under the nav, 50 or 10 on the timeline cards.
 * - `flip` — fade upwards from a bottom edge instead of down from a top one.
 * - `maskAlpha` — the "- Soft" variant's mask tops out at 0.9 rather than 1, which combines
 *   with the plate's own 0.9 for an effective 0.81.
 */
const PLATE = {
  light: 'bg-white/90',
  dark: 'bg-ink/90',
} as const

export default function ScrollEdgeEffect({
  className = '',
  flip = false,
  tone = 'light',
  blur = 5,
  plateBlur = 30,
  maskAlpha = 1,
}: {
  className?: string
  flip?: boolean
  tone?: keyof typeof PLATE
  /** Outer backdrop-blur radius, in px. */
  blur?: number
  /** Radius of the masked plate behind it, in px. */
  plateBlur?: number
  /** Alpha at the mask's solid end. */
  maskAlpha?: number
}) {
  const mask = `linear-gradient(${flip ? 'to top' : 'to bottom'}, rgba(0,0,0,${maskAlpha}) 0%, rgba(0,0,0,0) 100%)`

  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}
    >
      <div
        className={`absolute inset-0 ${PLATE[tone]}`}
        style={{
          backdropFilter: `blur(${plateBlur}px)`,
          WebkitBackdropFilter: `blur(${plateBlur}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  )
}

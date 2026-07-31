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
  /*
   * A straight alpha ramp still lands on a visible line: the blur radius holds steady the
   * whole way down and only the opacity falls, so the eye catches where it stops. These
   * stops ease the tail out instead, spending most of the band near full strength and then
   * dropping away quickly over the last fifth.
   */
  const a = (f: number) => `rgba(0,0,0,${(maskAlpha * f).toFixed(3)})`
  const mask =
    `linear-gradient(${flip ? 'to top' : 'to bottom'}, ` +
    `${a(1)} 0%, ${a(0.94)} 25%, ${a(0.78)} 45%, ${a(0.5)} 65%, ${a(0.22)} 82%, ${a(0)} 100%)`

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      {/*
       * The light pass carries the same mask as the plate. Left unmasked — as it was — the
       * blur covers the band evenly and then cuts off dead straight at the bottom edge,
       * which is the hard line this effect exists to avoid.
       */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
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

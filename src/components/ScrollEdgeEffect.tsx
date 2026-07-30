/**
 * Figma's "Scroll Edge Effect" — progressive blur that fades content out at an edge.
 *
 * Figma renders a *radius ramp*: sharp at the open edge, `plateBlur` at the solid edge.
 * CSS has no variable-radius backdrop filter, so it has to be faked, and the two obvious
 * fakes both fail:
 *
 * 1. One masked `backdrop-filter` only ramps the *opacity* of a single radius, so it reads
 *    as a fog bank with a line where the plate ends.
 * 2. N sibling layers each carrying a `backdrop-filter` do NOT compound — a backdrop filter
 *    samples the page behind the layer, not the layer below it. Stacking them therefore
 *    gives N discrete bands, which is the banding this file used to show.
 *
 * What actually works is a crossfade. Each layer gets its own radius and a mask that is
 * opaque from the solid edge out to its own station, then ramps to transparent across the
 * next-weaker layer's station. Layers are painted weakest-first, so at any point down the
 * band exactly two layers are visible: the weaker one fully opaque underneath, the stronger
 * one fading out on top. That is a true alpha crossfade between two radii, and because no
 * partially-transparent mask ever has raw page showing through it, there is no haze.
 *
 * Two more constraints keep it smooth:
 * - Adjacent radii differ by RATIO (1.6, i.e. under 2x). Bigger jumps make the crossfade
 *   itself visible as a soft band.
 * - Each layer's station sits at `1 - radius/peak`, so radius falls *linearly* down the
 *   band even though the radii themselves are a geometric series. That is the ramp shape
 *   Figma draws.
 *
 * The second artifact was smearing at the edges: `backdrop-filter` clamps its sample at the
 * element's own box, so the boundary row of pixels gets stretched along the whole ramp. The
 * fix is to grow every layer OVERSIZE x its own radius past the box on all four sides and
 * clip the lot with `overflow-hidden` on the root. The clamped boundary then lands outside
 * the visible area. Growing the box also moves the mask, so every stop is re-expressed as
 * `calc(f * 100% + (p - 2fp)px)` — f of the *unpadded* band, measured inside a box that is
 * `2p` taller than it. The masks are built from CSS gradients, not from an asset: the old
 * `scroll-edge-mask.svg` was swept up with the other unreferenced Figma exports.
 *
 * Props (unchanged API):
 * - `tone`  — white for light pages; ink for the "- Soft" variant over dark photography.
 * - `plateBlur` — the radius at the solid edge, i.e. the strength of the whole effect.
 * - `flip`  — solid edge at the bottom instead of the top.
 * - `maskAlpha` — the "- Soft" variant's tint tops out at 0.9 rather than 1.
 */
const TINT = {
  light: '255 255 255',
  dark: '40 40 40', // --color-ink
} as const

/** 7 stations is enough that a 1.6x step is invisible; more layers cost another compositor pass. */
const LAYERS = 7

/** Ratio between adjacent radii. Anything above 2 shows the crossfade as a band. */
const RATIO = 1.6

/** Oversize factor: 1.8x the layer's own radius is past where a Gaussian tail still reads. */
const OVERSIZE = 1.8

export default function ScrollEdgeEffect({
  className = '',
  flip = false,
  tone = 'light',
  plateBlur = 30,
  maskAlpha = 1,
}: {
  className?: string
  flip?: boolean
  tone?: keyof typeof TINT
  plateBlur?: number
  maskAlpha?: number
}) {
  // Solid edge: top by default (the nav effect is strongest at the very top of the page);
  // `flip` puts it at the bottom (the effect capping the bottom of an image). Mask fractions
  // below are always measured from the solid edge, so only the gradient direction changes.
  const towardOpenEdge = flip ? 'to top' : 'to bottom'

  const peak = plateBlur

  // Weakest first so the strongest ends up on top, covering the region at the solid edge.
  const layers = Array.from({ length: LAYERS }, (_, n) => {
    const i = LAYERS - 1 - n // 0 = strongest, sits at the solid edge
    const strength = RATIO ** -i // 1, 0.63, 0.39, ... — the geometric radius series
    const radius = peak * strength

    // Station: the point where this radius is the whole story, at `1 - strength` so the
    // radius ramp comes out linear in space. The layer is opaque from the solid edge up to
    // its own station and then hands over to the next-weaker one across the gap to that
    // one's station. The weakest layer has nothing to hand over to, so it fades to zero
    // exactly at the open edge — otherwise its (small) blur would end on a hard line.
    const from = 1 - strength
    const to = i === LAYERS - 1 ? 1 : 1 - RATIO ** -(i + 1)

    const pad = radius * OVERSIZE
    // f of the unpadded band, re-expressed inside the padded box (see header comment).
    const stop = (f: number) =>
      `calc(${(f * 100).toFixed(2)}% + ${(pad - 2 * f * pad).toFixed(2)}px)`
    const mask = `linear-gradient(${towardOpenEdge}, #000 ${stop(from)}, transparent ${stop(to)})`

    return { radius, pad, mask }
  })

  const tint = `linear-gradient(${towardOpenEdge}, rgb(${TINT[tone]} / ${(0.9 * maskAlpha).toFixed(
    3,
  )}) 0%, rgb(${TINT[tone]} / 0) 100%)`

  return (
    // overflow-hidden is load-bearing: it clips the oversized layers back to the design box
    // (and to the caller's rounded corners, which arrive on `className`).
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      {layers.map((l, n) => (
        <div
          key={n}
          className="absolute"
          style={{
            inset: `${(-l.pad).toFixed(2)}px`,
            backdropFilter: `blur(${l.radius.toFixed(2)}px)`,
            WebkitBackdropFilter: `blur(${l.radius.toFixed(2)}px)`,
            maskImage: l.mask,
            WebkitMaskImage: l.mask,
          }}
        />
      ))}
      {/* the tint plate rides over the ramp so copy stays legible against it */}
      <div className="absolute inset-0" style={{ background: tint }} />
    </div>
  )
}

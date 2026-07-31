/*
 * The homepage's decorations, consolidated. Figma pins every prop in one
 * "Homepage - Background" frame (935:451), 1440x5178, anchored at page y = 0 and painted
 * entirely behind the section content — so they render here as a single 1440-wide canvas
 * at the back of the page, clipped at the frame's own edges the way Figma clips it.
 *
 * Every table below is a transcription of that frame rather than a set of choices, so the
 * rows stay one-per-node (`prettier-ignore`) and the numbers stay as found — reading them
 * against Figma is the only way to check them. DOM order = the frame's paint order.
 *
 * The frame is transcribed ONCE and then rendered in one of two coordinate spaces:
 *
 *   - **px**, against the centred 1440 canvas. Every prop lands on its Figma page y. This
 *     is the desktop reading and is exact — but it is only meaningful while the sections
 *     have Figma's heights, i.e. at `lg` and up.
 *   - **fluid**, as percentages of a band box. A band states a *window* of canvas y and is
 *     sized `aspect-ratio: 1440 / window`, so its width is the viewport's and every number
 *     inside it resolves to exactly 100vw/1440 of the Figma number. Nothing distorts, the
 *     whole group is the Figma arrangement at phone scale, and the band's *position* is the
 *     one thing that becomes a choice — stated against a section or an edge, never against
 *     a page y, because narrow sections do not have Figma's heights.
 *
 * See `nodeStyle` for the two-space renderer and `FluidGroup` for the bands.
 */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

const pasta1 = '/assets/figma/9411a40dfd006a723a0a9654923706988c019803.png'
const pasta24 = '/assets/figma/dc1a2b1e496026d2ffb6efe6645f8155f8dd73f1.png'
const garlic = '/assets/figma/789932a40b3a11554f67e156b251aa5348ebcef4.png'
const cheeseChunk = '/assets/figma/1dd3f1f43fd0ed1c5a00ba203e5893bdc7acd558.png'
const spoon = '/assets/figma/e3f126eae3b64304ddef1da90bc0d5f13f1a4161.png'
const fork = '/assets/figma/669d80cf5814c6779007ac79ca0395b2134e2acf.png'
const redBlob = '/assets/figma/698744474ca70b049053608ab4751a69839434a7.svg'
const waveCluster = '/assets/figma/bca04b60dba2c906fd3530e53d512366ad9270c0.svg'
const creamWave = '/assets/figma/433f3f26ad6f98ea3006669c9135c89114e7516e.svg'
const yellowWave = '/assets/figma/73268ad299185fd28c6c6d5d19f64f2f35afe370.svg'
const redWave = '/assets/figma/ea2b8a309e7e0fc3158050a5351b69d87e094972.svg'
const wash15 = '/assets/figma/872ea85568057dd3fd543654d790878da9b98197.svg'
const wash10 = '/assets/figma/a915d7877097844540d11c4defd51424f31744fd.svg'

/** The canvas Figma authors against. Every fluid percentage below is a ratio to this. */
const CANVAS = 1440

type Crop = [w: number, h: number, x: number, y: number]

/** Every tube is one sprite sheet; the crop is the window onto its single piece. */
const TUBE: Crop = [641.92, 600.87, -143.34, -469.05]
const RIGATONI: Crop = [1135.56, 683.33, -709.14, -505.81]

export type DecorNode = {
  /** the *bounding* box of the (possibly rotated) shape, in the parent's space */
  x: number
  y: number
  w: number
  h: number
  /** the unrotated art box, centred inside the bounding box; defaults to w/h */
  aw?: number
  ah?: number
  rotate?: number
  flipX?: boolean
  flipY?: boolean
  skewX?: number
  src?: string
  /** sprite-sheet window: width, height, x, y as % of the art box */
  crop?: Crop
  /** px the exported SVG bleeds past the node on all sides — a Figma layer blur */
  spread?: number
  /** a nested Figma frame; children are positioned in this node's space */
  kids?: DecorNode[]
}

/*
 * ---------------------------------------------------------------- the two spaces
 *
 * `null` is the px space: a node's numbers are used as they are, against the centred 1440
 * canvas. A `Space` is a fluid band: numbers become percentages of `box`, which is the
 * band's own canvas-unit size, and `dy` is the top of the band's window so a band can start
 * part-way down (or above) the group it draws.
 *
 * The invariant that makes this safe is that a fluid box's *rendered* aspect ratio always
 * equals `box.w / box.h` — the band sets `aspect-ratio` from its window, and every child box
 * is a percentage of a parent that already holds. So a percentage width and a percentage
 * height are the same scale factor, and no shape is ever stretched.
 */
type Box = { w: number; h: number }
type Space = { box: Box; dy: number } | null

const pc = (v: number, of: number) => `${((v / of) * 100).toFixed(4)}%`

function nodeStyle(n: DecorNode, space: Space): CSSProperties {
  if (!space) return { left: n.x, top: n.y, width: n.w, height: n.h }
  return {
    left: pc(n.x, space.box.w),
    top: pc(n.y - space.dy, space.box.h),
    width: pc(n.w, space.box.w),
    height: pc(n.h, space.box.h),
  }
}

function Node({ n, space = null, flow }: { n: DecorNode; space?: Space; flow?: FlowProps }) {
  const frame = nodeStyle(n, space)

  if (n.kids) {
    /* the children's space is this node's own box, with no window offset */
    const kidSpace: Space = space ? { box: { w: n.w, h: n.h }, dy: 0 } : null
    return (
      <div className="absolute" style={frame}>
        {n.kids.map((kid, i) => (
          <Node key={i} n={kid} space={kidSpace} />
        ))}
      </div>
    )
  }

  const aw = n.aw ?? n.w
  const ah = n.ah ?? n.h
  // Figma's own order: rotate, then skew, then the mirror flips
  const transform =
    [
      n.rotate ? `rotate(${n.rotate}deg)` : '',
      n.skewX ? `skewX(${n.skewX}deg)` : '',
      n.flipX ? 'scaleX(-1)' : '',
      n.flipY ? 'scaleY(-1)' : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined

  const art: CSSProperties = space
    ? { width: pc(aw, n.w), height: pc(ah, n.h), transform }
    : { width: aw, height: ah, transform }

  const bleed: CSSProperties | undefined = n.spread
    ? space
      ? {
          left: pc(-n.spread, aw),
          top: pc(-n.spread, ah),
          width: pc(aw + n.spread * 2, aw),
          height: pc(ah + n.spread * 2, ah),
        }
      : {
          left: -n.spread,
          top: -n.spread,
          width: aw + n.spread * 2,
          height: ah + n.spread * 2,
        }
    : undefined

  return (
    <div
      className={`absolute flex items-center justify-center ${flow?.className ?? ''}`}
      style={flow ? { ...frame, ...flow.vars } : frame}
    >
      {/* `relative` so a blurred export's bleed is measured from the art box, not the bbox */}
      <div className="relative shrink-0" style={art}>
        {n.crop ? (
          <div className="relative size-full overflow-hidden">
            <img
              src={n.src}
              alt=""
              className="absolute max-w-none"
              style={{
                width: `${n.crop[0]}%`,
                height: `${n.crop[1]}%`,
                left: `${n.crop[2]}%`,
                top: `${n.crop[3]}%`,
              }}
            />
          </div>
        ) : bleed ? (
          <img src={n.src} alt="" className="absolute max-w-none" style={bleed} />
        ) : (
          <img src={n.src} alt="" className="size-full object-cover" />
        )}
      </div>
    </div>
  )
}

/**
 * One Figma group, drawn fluidly. `y0`/`y1` is the window of canvas y the band covers: the
 * band is exactly the viewport's width and `(y1 - y0) / 1440` of it tall, so everything
 * inside comes out at 100vw/1440 of its Figma size. Props whose boxes fall outside the
 * window are still rendered — they simply hang off the band, as they hang off the 1440
 * canvas in Figma — so `overflow-clip` is the band's own crop. `clip` and not `hidden`:
 * a hidden box is a scroll container and could be panned.
 */
function FluidGroup({
  nodes,
  y0,
  y1,
  className,
  style,
  flowOf,
}: {
  nodes: DecorNode[]
  y0: number
  y1: number
  className?: string
  style?: CSSProperties
  /** per-node flow props, by index into `nodes` */
  flowOf?: (n: DecorNode, i: number) => FlowProps | undefined
}) {
  const space: Space = { box: { w: CANVAS, h: y1 - y0 }, dy: y0 }
  return (
    <div
      className={`absolute overflow-clip ${className ?? ''}`}
      style={{ aspectRatio: `${CANVAS} / ${y1 - y0}`, ...style }}
    >
      {nodes.map((n, i) => (
        <Node key={i} n={n} space={space} flow={flowOf?.(n, i)} />
      ))}
    </div>
  )
}

/*
 * ------------------------------------------------------------------- the frame
 *
 * Split into the frame's own groups rather than one flat list, because a group is the unit
 * a narrow viewport can be given: "Top pasta" belongs to the masthead, the rigatoni scatter
 * to the CTA, the garlic and the cutlery to the calendar, "Home Buttom" to the page's foot.
 * `PROPS` puts them back in the frame's paint order for the px canvas.
 */

/** "Top pasta" (935:472) — 23 tubes crowding the masthead, in the frame's own 1440x335. */
// prettier-ignore
const TOP_PASTA: DecorNode[] = [
  { x: -101.95, y: -279.68, w: 662.179, h: 535.839, aw: 597, ah: 443, rotate: 9.54, crop: TUBE, src: pasta1 },
  { x: 1140.43, y: -181.59, w: 470.605, h: 588.381, aw: 537.881, ah: 399.417, rotate: 81.97, crop: TUBE, src: pasta1 },
  { x: -599.42, y: -276.26, w: 905.439, h: 733.056, aw: 816.252, ah: 606.127, rotate: 9.54, crop: TUBE, src: pasta1 },
  { x: 864, y: -585, w: 643.668, h: 804.754, aw: 735.684, ah: 546.3, rotate: 81.97, crop: TUBE, src: pasta1 },
  { x: -168.57, y: -258.92, w: 498.603, h: 552.926, aw: 452, ah: 336, rotate: 64.34, crop: TUBE, src: pasta1 },
  { x: 1058.02, y: -256.71, w: 504.293, h: 499.711, aw: 407.602, ah: 302.675, rotate: 136.77, crop: TUBE, src: pasta1 },
  { x: -690.41, y: -247.81, w: 681.88, h: 756.448, aw: 618.546, ah: 459.316, rotate: 64.34, crop: TUBE, src: pasta1 },
  { x: -45.23, y: -106.97, w: 391.694, h: 311.259, aw: 360.806, ah: 267.925, rotate: 7.24, crop: TUBE, src: pasta1 },
  { x: 1154.53, y: -120.08, w: 295.871, h: 363.218, aw: 325.192, ah: 241.479, rotate: 79.67, crop: TUBE, src: pasta1 },
  { x: -521.93, y: -39.98, w: 535.735, h: 425.721, aw: 493.487, ah: 366.451, rotate: 7.24, crop: TUBE, src: pasta1 },
  { x: 883.3, y: -500.79, w: 404.674, h: 496.788, aw: 444.778, ah: 330.281, rotate: 79.67, crop: TUBE, src: pasta1 },
  { x: 126.96, y: -269.86, w: 510.392, h: 487.225, aw: 410, ah: 304, rotate: -36.11, crop: TUBE, src: pasta1 },
  { x: 1199.69, y: 20.28, w: 459.923, h: 439.64, aw: 369.255, ah: 274.199, rotate: 36.32, crop: TUBE, src: pasta1 },
  { x: -286.42, y: -262.52, w: 697.927, h: 666.401, aw: 560.353, ah: 416.104, rotate: -36.11, crop: TUBE, src: pasta1 },
  { x: 945.07, y: -308.81, w: 629.054, h: 601.312, aw: 505.044, ah: 375.032, rotate: 36.32, crop: TUBE, src: pasta1 },
  { x: 134.05, y: -306.93, w: 371.291, h: 404.633, aw: 327.906, ah: 243.495, rotate: -61.22, crop: TUBE, src: pasta1 },
  { x: 1313.88, y: 28.75, w: 332.574, h: 272.741, aw: 295.54, ah: 219.461, rotate: 11.21, crop: TUBE, src: pasta1 },
  { x: -276.71, y: -313.48, w: 507.828, h: 553.431, aw: 448.49, ah: 333.037, rotate: -61.22, crop: TUBE, src: pasta1 },
  { x: 1101.26, y: -297.24, w: 454.874, h: 373.038, aw: 404.221, ah: 300.164, rotate: 11.21, crop: TUBE, src: pasta1 },
  { x: 248.86, y: -69.76, w: 245.702, h: 300.254, aw: 267.457, ah: 198.607, rotate: -79.07, crop: TUBE, src: pasta1 },
  { x: 1205.3, y: 157.29, w: 260.145, h: 205.685, aw: 241.058, ah: 179.003, rotate: -6.64, crop: TUBE, src: pasta1 },
  { x: -119.69, y: 10.91, w: 336.056, h: 410.669, aw: 365.811, ah: 271.642, rotate: -79.07, crop: TUBE, src: pasta1 },
  { x: 952.74, y: -121.42, w: 355.81, h: 281.323, aw: 329.704, ah: 244.83, rotate: -6.64, crop: TUBE, src: pasta1 },
]

/** The tubes' own extent inside that frame, which is the widest window a band can crop to. */
const TOP_PASTA_WINDOW = { y0: -585, y1: 421.58 }

/**
 * "Decoration / Pasta 24-43" — the loose rigatoni scatter falling past the hero CTA, in
 * page coordinates. Ordered as the frame paints them, which is also left-to-right enough
 * for the arrival stagger below to read as a flow.
 */
// prettier-ignore
const RIGATONI_SCATTER: DecorNode[] = [
  { x: 1249, y: 767, w: 384.135, h: 444, crop: RIGATONI, src: pasta24 },
  { x: 1102, y: 709, w: 526.315, h: 557.294, aw: 384.123, ah: 444.227, rotate: 22.59, skewX: -0.14, crop: RIGATONI, src: pasta24 },
  { x: 1262.09, y: 707.97, w: 428.297, h: 418.749, aw: 281.184, ah: 325.005, rotate: -53.86, crop: RIGATONI, src: pasta24 },
  { x: 670, y: 909, w: 289.847, h: 310.793, aw: 218.733, ah: 252.821, rotate: 19.25, flipY: true, crop: RIGATONI, src: pasta24 },
  { x: 556, y: 989, w: 215.808, h: 236.593, aw: 175.817, ah: 203.218, rotate: -12.56, flipY: true, crop: RIGATONI, src: pasta24 },
  { x: 1220.32, y: 769.29, w: 408.872, h: 423.656, aw: 281.184, ah: 325.005, rotate: -31.2, crop: RIGATONI, src: pasta24 },
  { x: -56, y: 903, w: 280.613, h: 309.397, aw: 233.467, ah: 269.852, rotate: -10.99, crop: RIGATONI, src: pasta24 },
  { x: 1196.99, y: 856.26, w: 337.966, h: 372.633, aw: 281.184, ah: 325.005, rotate: -10.99, crop: RIGATONI, src: pasta24 },
  { x: 904.78, y: 863.53, w: 427.699, h: 417.208, aw: 281.184, ah: 325.005, rotate: 54.75, flipY: true, crop: RIGATONI, src: pasta24 },
  { x: 795.3, y: 907.39, w: 378.662, h: 345.494, aw: 281.184, ah: 325.005, rotate: 102.64, flipY: true, crop: RIGATONI, src: pasta24 },
  { x: 1337.73, y: 737.26, w: 427.699, h: 417.208, aw: 281.184, ah: 325.005, rotate: -54.75, crop: RIGATONI, src: pasta24 },
  { x: 1084.03, y: 839.32, w: 483.183, h: 471.2, aw: 317.72, ah: 367.235, rotate: 54.85, crop: RIGATONI, src: pasta24 },
  { x: 1312.58, y: 757.86, w: 427.634, h: 471.313, aw: 355.265, ah: 410.631, rotate: 11.09, crop: RIGATONI, src: pasta24 },
  { x: 1239.53, y: 802.53, w: 469.53, h: 503.872, aw: 355.265, ah: 410.631, rotate: -18.99, crop: RIGATONI, src: pasta24 },
  { x: 1431.88, y: 819.71, w: 333.538, h: 366.965, aw: 275.306, ah: 318.211, rotate: -11.57, crop: RIGATONI, src: pasta24 },
  { x: -203, y: 904, w: 418.68, h: 408.296, aw: 275.306, ah: 318.211, rotate: 54.85, crop: RIGATONI, src: pasta24 },
  { x: 1020.93, y: 922.7, w: 418.68, h: 408.296, aw: 275.306, ah: 318.211, rotate: 54.85, crop: RIGATONI, src: pasta24 },
  { x: 120, y: 952, w: 267.044, h: 294.32, aw: 221.852, ah: 256.427, rotate: 11.09, crop: RIGATONI, src: pasta24 },
  { x: 100.95, y: 958.81, w: 305.144, h: 280.707, aw: 221.852, ah: 256.427, rotate: 74.99, crop: RIGATONI, src: pasta24 },
  { x: 1338.94, y: 924.88, w: 331.386, h: 365.234, aw: 275.306, ah: 318.211, rotate: 11.09, crop: RIGATONI, src: pasta24 },
]

/** The box the scatter occupies on the page, y 707 to 1470 — the flow's sentinel and band. */
const RIGATONI_WINDOW = { y0: 707, y1: 1470 }

/** "Garlic Left" (935:587) — ten bulbs on a yellow wave, hanging off the left edge. */
// prettier-ignore
const GARLIC_LEFT: DecorNode = { x: -203, y: 2184.068, w: 662.879, h: 363.932, kids: [
  { x: 0, y: 3.93, w: 569, h: 360, src: yellowWave },
  { x: 68.68, y: 0, w: 594.199, h: 363.856, kids: [
    { x: 0, y: 0, w: 349.641, h: 363.856, aw: 297, ah: 211, rotate: 51.71, src: garlic },
    { x: 170.03, y: 4.12, w: 394.71, h: 325.635, aw: 342.342, ah: 243.443, rotate: 15.4, src: garlic },
    { x: 170.03, y: 4.12, w: 394.71, h: 325.635, aw: 342.342, ah: 243.443, rotate: 15.4, src: garlic },
    { x: 94.32, y: 49.43, w: 260.505, h: 214.916, aw: 225.943, ah: 160.671, rotate: 15.4, src: garlic },
    { x: 242.75, y: 70.3, w: 190.993, h: 231.471, aw: 200.735, ah: 142.745, rotate: 74.58, src: garlic },
    { x: 242.75, y: 70.3, w: 190.993, h: 231.471, aw: 200.735, ah: 142.745, rotate: 74.58, src: garlic },
    { x: 129.99, y: 103, w: 267.673, h: 221.546, aw: 231.557, ah: 164.663, rotate: -15.82, src: garlic },
    { x: 310.32, y: 49.93, w: 283.879, h: 264.183, aw: 231.557, ah: 164.663, rotate: 32.98, src: garlic },
    { x: 413.32, y: 101.93, w: 173.779, h: 203.35, aw: 171.834, ah: 122.193, rotate: 69.91, src: garlic },
    { x: 193.51, y: 58.21, w: 187.358, h: 174.359, aw: 152.826, ah: 108.676, rotate: 32.98, src: garlic },
  ] },
] }

/** "Fork Right" (935:838) — two cutlery stars on a red wave, hanging off the right edge. */
// prettier-ignore
const FORK_RIGHT: DecorNode = { x: 968.299, y: 2034.703, w: 888.51, h: 875.25, kids: [
  { x: 0, y: 0, w: 888.51, h: 875.25, aw: 592.084, ah: 665.407, rotate: -127.65, src: redWave },
  { x: 138.24, y: 195.3, w: 457.6, h: 454.096, kids: [
    { x: 101.56, y: 0, w: 261.478, h: 261.478, aw: 184.896, ah: 184.896, rotate: 45.32, src: spoon },
    { x: 100.86, y: 192.62, w: 261.478, h: 261.478, aw: 184.896, ah: 184.896, rotate: -45.32, flipY: true, src: spoon },
    { x: 0, y: 97.36, w: 261.478, h: 261.478, aw: 184.896, ah: 184.896, rotate: 44.68, flipY: true, src: spoon },
    { x: 196.12, y: 94.56, w: 261.478, h: 261.478, aw: 184.896, ah: 184.896, rotate: -135.32, flipY: true, src: spoon },
    { x: 100.46, y: 94, w: 150, h: 150, src: fork },
    { x: 209.46, y: 206, w: 150, h: 150, rotate: 180, src: fork },
    { x: 209.46, y: 94, w: 150, h: 150, rotate: 180, flipY: true, src: fork },
    { x: 100.46, y: 206, w: 150, h: 150, flipY: true, src: fork },
  ] },
  { x: 56.7, y: 178.1, w: 194.797, h: 193.783, kids: [
    { x: 33.78, y: 0, w: 111.688, h: 111.688, aw: 80.872, ah: 80.872, rotate: 32.57, src: spoon },
    { x: 52.23, y: 82.38, w: 111.403, h: 111.403, aw: 80.872, ah: 80.872, rotate: -58.08, flipY: true, src: spoon },
    { x: 0, y: 51.48, w: 111.403, h: 111.403, aw: 80.872, ah: 80.872, rotate: 31.92, flipY: true, src: spoon },
    { x: 83.39, y: 31.35, w: 111.403, h: 111.403, aw: 80.872, ah: 80.872, rotate: -148.08, flipY: true, src: spoon },
    { x: 29.83, y: 38.53, w: 78.607, h: 78.607, aw: 65.718, ah: 65.718, rotate: -12.76, src: fork },
    { x: 87.01, y: 75.76, w: 78.607, h: 78.607, aw: 65.718, ah: 65.718, rotate: 167.24, src: fork },
    { x: 76.2, y: 28.03, w: 78.607, h: 78.607, aw: 65.718, ah: 65.718, rotate: 167.24, flipY: true, src: fork },
    { x: 40.64, y: 86.26, w: 78.607, h: 78.607, aw: 65.718, ah: 65.718, rotate: -12.76, flipY: true, src: fork },
  ] },
] }

/**
 * The food props above the washes, in the frame's paint order: the masthead crowd, the
 * rigatoni scatter, then the garlic and the cutlery riding over the calendar's tail.
 */
const PROPS: DecorNode[] = [
  { x: 0, y: 0, w: CANVAS, h: 335, kids: TOP_PASTA },
  ...RIGATONI_SCATTER,
  GARLIC_LEFT,
  FORK_RIGHT,
]

/**
 * "Home Buttom" (935:452) — the frame's bottom-most layers, in its own 1440x1414 space: the
 * cream wave, the wave cluster, the red blob whose wavy edges are the prize band (painted
 * over the cluster, so only what hangs below its bottom edge shows), and the cheese pile.
 *
 * Every one of these is drawn far wider than 1440 on purpose — the blob is 2213.6 across a
 * 1440 canvas, 387 off each edge; the cluster and the cream wave together span -50..1639 —
 * which is Figma stating that the band is full-bleed. So it is the one group that is fluid
 * at *every* width: as a band it is always exactly the viewport wide, which makes the bleed
 * hold at 1920 and 2560 where a fixed 1440 stage left a white gutter down both sides.
 */
// prettier-ignore
const HOME_BOTTOM: DecorNode[] = [
  { x: 1000, y: 964, w: 639, h: 404, src: creamWave },
  { x: -49.999, y: 770.363, w: 1103.028, h: 643.143, src: waveCluster },
  { x: -387, y: 0, w: 2213.647, h: 1162.509, src: redBlob },
  { x: 960.952, y: 891, w: 667.021, h: 468.249, kids: [
    { x: 113, y: 0, w: 518, h: 368, src: cheeseChunk },
    { x: 0, y: 58, w: 421, h: 300, src: cheeseChunk },
    { x: 235.15, y: 81.59, w: 431.868, h: 386.039, aw: 356.123, ah: 253.243, rotate: 26.64, src: cheeseChunk },
    { x: 99.81, y: 125.42, w: 351.887, h: 314.546, aw: 290.17, ah: 206.343, rotate: 26.64, src: cheeseChunk },
    { x: 32.04, y: 184.79, w: 317.113, h: 283.462, aw: 261.495, ah: 185.952, rotate: 153.36, flipY: true, src: cheeseChunk },
  ] },
]

/** The group's own frame: page y 3764 to 5178, which is where the footer starts. */
const HOME_BOTTOM_HEIGHT = 1414

/**
 * The two faint washes: a #D79A4E blob at 15% and at 10%, each under an 800px layer
 * blur. That blur is baked into the export, which is why the SVG runs 800px past its
 * node on every side — `spread` puts the bleed back.
 *
 * These stay in the px space at every width. They are single soft gradients thousands of px
 * across: a centred slice of one reads as the same tint whatever the viewport, and scaling
 * them down with the viewport would shrink the only thing on a narrow page that stops the
 * background being flat white.
 */
// prettier-ignore
const WASH: DecorNode[] = [
  { x: 517, y: 2835, w: 1149, h: 1120, spread: 800, src: wash15 },
  { x: 728, y: 1188, w: 1125, h: 1155, aw: 1155, ah: 1125, rotate: 90, spread: 800, src: wash10 },
]

/*
 * ------------------------------------------------------------------ rigatoni flow
 *
 * The twenty `RIGATONI` rows above are a scatter that ends in a pile at the right edge.
 * They arrive: each tube drifts in from the left, gathers into the pile, and nudges its
 * neighbours outward as it settles at the Figma coordinate it is transcribed from. The
 * keyframes live in styles/pasta-motion.css; everything a piece needs to differ from its
 * neighbours is handed over as custom properties, computed once here.
 *
 * The numbers are derived from the piece's index with coprime multipliers rather than
 * drawn at random: a re-render — or a future server render — has to produce the same
 * flight, and a random one would re-roll it. The offsets are intentionally large: a tube
 * that starts 500px out has time to read as *travelling* rather than as popping in.
 *
 * Once a tube has landed it does not stop: it drifts on a slow closed orbit around the
 * Figma coordinate, forever. The orbit is a handful of pixels wide and a couple of degrees
 * — small enough that the composition still reads as the design at any instant, which is
 * the constraint the arrangement itself imposes — and the idle only starts once *that*
 * piece's arrival has finished, hence `--pasta-idle-delay` being the sum of the two.
 * Nothing needs a phase offset: the arrival stagger already starts every orbit at a
 * different moment, and the per-piece periods are coprime enough not to re-converge.
 *
 * Every distance is stated in canvas units and then emitted in the unit of the space the
 * band is drawn in: `px` against the 1440 canvas, `vw` inside a fluid band, where 1 canvas
 * unit is 1/1440 of the viewport. So the flight is the same *fraction of the tube's own
 * size* at 390 as at 1440 — a phone tube is a quarter the size and travels a quarter as
 * far, which is the only reading under which the motion looks like the same motion.
 */
type FlowProps = { className: string; vars: CSSProperties }

/** The one thing not derived from the index: which way a piece is pushed as the pile packs. */
const PILE_X = 1150

function flowVars(i: number, x: number, fluid = false): CSSProperties {
  const out = x >= PILE_X ? 1 : -1
  // neighbours orbit opposite ways, so the band breathes rather than drifting as one body
  const spin = i % 2 ? 1 : -1
  const delay = i * 95
  const duration = 1800 + ((i * 137) % 5) * 180
  /** canvas units → the band's own unit */
  const u = (v: number) => (fluid ? `${((v / CANVAS) * 100).toFixed(4)}vw` : `${v}px`)

  return {
    '--pasta-dx': u(-(440 + ((i * 89) % 7) * 55)),
    '--pasta-dy': u((((i * 53) % 9) - 4) * 16),
    '--pasta-spin': `${(((i * 71) % 11) - 5) * 4}deg`,
    '--pasta-scale': `${(0.86 + ((i * 31) % 6) * 0.03).toFixed(3)}`,
    '--pasta-px': u(out * (7 + ((i * 17) % 3) * 6)),
    '--pasta-py': u((((i * 41) % 5) - 2) * 6),
    '--pasta-delay': `${delay}ms`,
    '--pasta-duration': `${duration}ms`,
    '--pasta-idle-delay': `${delay + duration}ms`,
    '--pasta-idle-duration': `${17000 + ((i * 61) % 9) * 1900}ms`,
    '--pasta-idle-x': u(spin * (5 + ((i * 43) % 5) * 1.8)),
    '--pasta-idle-y': u(3 + ((i * 29) % 4) * 1.6),
    '--pasta-idle-r': `${spin * (1.1 + ((i * 23) % 4) * 0.5)}deg`,
  } as CSSProperties
}

/** Keyed by node so the flight belongs to the piece, not to its position in the array. */
const FLOW_PX = new Map<DecorNode, CSSProperties>(
  RIGATONI_SCATTER.map((n, i) => [n, flowVars(i, n.x)]),
)
const FLOW_FLUID = new Map<DecorNode, CSSProperties>(
  RIGATONI_SCATTER.map((n, i) => [n, flowVars(i, n.x, true)]),
)

/*
 * 'rest' is the Figma composition and the only state the markup can be rendered in
 * without JS; 'armed' parks the pieces at the flight's first frame (set in a layout
 * effect, so it lands before the browser paints and there is nothing to see jump); the
 * observer then moves to 'run' the first time the band is on screen. Under reduced motion
 * nothing arms, so the whole thing is a no-op and the pile is simply drawn.
 *
 * Shared by the desktop canvas and the narrow-viewport band below, which each observe
 * their own sentinel — the two bands are at different places on the page and neither
 * should start because the other scrolled in.
 */
function useFlowPhase() {
  const [phase, setPhase] = useState<'rest' | 'armed' | 'run'>('rest')
  const band = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = band.current
    if (!el || !('IntersectionObserver' in window)) return
    setPhase('armed')
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        setPhase('run')
        io.disconnect()
      },
      // the band should be properly on screen, not one pixel of it
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const flowClass = phase === 'run' ? 'pasta-flow' : phase === 'armed' ? 'pasta-flow-armed' : ''
  return { band, flowClass }
}

/*
 * ----------------------------------------------------------- the section anchor
 *
 * Two of the groups belong to a section in the middle of the page — the garlic and the
 * cutlery both ride the calendar's tail — and below `lg` a page y cannot say where that is:
 * the calendar's height is set by its own reflowed content, and it is being changed. So the
 * band is positioned against the *section*, at the same fraction of it Figma puts the prop
 * at, and the section is measured.
 *
 * `offsetTop` is relative to the nearest positioned ancestor, which for these sections is
 * the page wrapper — the same box the canvas is stretched over — so it needs no correction.
 * Both the section and that wrapper are observed: a section can be moved by something above
 * it growing without changing size itself, and then only the wrapper's own resize fires.
 */
export function useSectionAnchor(id: string) {
  const [box, setBox] = useState<{ top: number; height: number } | null>(null)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const read = () => {
      const parent = el.offsetParent as HTMLElement | null
      setBox((prev) =>
        prev?.top === el.offsetTop && prev?.height === el.offsetHeight
          ? prev
          : { top: el.offsetTop, height: el.offsetHeight },
      )
      return parent
    }
    const parent = read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    if (parent) ro.observe(parent)
    return () => ro.disconnect()
  }, [id])

  return box
}

/**
 * A fluid band placed at the fraction of `section` that Figma places `y` at on the 1440
 * canvas, where `sectionTop`/`sectionHeight` are that section's Figma box. Renders nothing
 * until the section has been measured, so it can never land at a guessed position.
 */
function SectionBand({
  anchor,
  figma,
  children,
}: {
  anchor: { top: number; height: number } | null
  /** the group's y and the Figma box of the section it belongs to */
  figma: { y: number; top: number; height: number }
  children: (top: number) => ReactNode
}) {
  if (!anchor) return null
  const fraction = (figma.y - figma.top) / figma.height
  return <>{children(anchor.top + fraction * anchor.height)}</>
}

/** Figma's own box for the calendar section — the anchor for the garlic and the cutlery. */
const FIGMA_CALENDAR = { top: 1192, height: 1344 }

export default function HomeBackground() {
  const { band, flowClass } = useFlowPhase()
  const calendar = useSectionAnchor('calendar')
  const prizes = useSectionAnchor('prizes')

  return (
    /*
     * Two boxes, because the canvas is doing two jobs that used to fight. The outer one is
     * the CLIP and is viewport-wide: the washes and the red band are drawn thousands of px
     * across on purpose, and cutting them at 1440 is what put a white gutter down both
     * sides of a 1600 or 1920 display. The inner one is the COORDINATE SPACE and stays a
     * centred 1440, because every prop in the px space is pinned at its Figma page x/y.
     *
     * `inset-0` and not `top-0 h-[5178px]`: the canvas's parent is the page wrapper, whose
     * bottom is exactly where the footer starts at every width (`lg:min-h-[5178px]` only
     * pins it to the Figma frame's height on desktop). Stretching to it gives the closing
     * band a bottom edge to sit on that is right at 390 as well as at 1440, which a fixed
     * 5178 could only be on desktop.
     */
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-clip"
    >
      {/*
       * The prizes section's red field, below `lg` only, and painted HERE rather than as the
       * section's own `bg-brand-red`.
       *
       * Figma's red is the 2213x1162 blob in this frame, and on desktop the section is
       * transparent and the blob shows through. On a phone the section is three times taller
       * relative to the blob, so the blob cannot fill it and a flat stand-in is needed — but
       * as the *section's* background it was opaque and painted over this whole canvas,
       * hiding the cheese pile and the cream strands that are supposed to sit on top of it.
       * Inside the canvas, and before the band in DOM order, it is behind them instead.
       *
       * It runs from the section's measured top to the canvas's own bottom, i.e. the footer.
       */}
      {prizes && (
        <div
          className="absolute inset-x-0 bg-brand-red lg:hidden"
          style={{ top: prizes.top, bottom: 0 }}
        />
      )}

      {/*
       * "Home Buttom", full-bleed at every width. Bottom-anchored to the canvas, so its own
       * bottom edge — where the cream strands stop, 1414 down its 1414-tall frame — lands on
       * the footer exactly as it does in Figma.
       */}
      <FluidGroup
        nodes={HOME_BOTTOM}
        y0={0}
        y1={HOME_BOTTOM_HEIGHT}
        className="inset-x-0 bottom-0"
      />

      <div className="absolute top-0 left-1/2 h-full w-[1440px] -translate-x-1/2">
        {/*
         * The washes are drawn at every width — see the note on WASH. Everything else in
         * the px space is desktop-only: below `lg` the sections no longer have Figma's
         * heights, so a page y lands nowhere near the content it belongs to, and the same
         * props are drawn instead as the section-anchored bands below.
         */}
        <div>
          {WASH.map((n, i) => (
            <Node key={i} n={n} />
          ))}
        </div>
        <div className="hidden lg:block">
          {/* The rigatoni band's own sentinel — the tubes themselves are spread over 700px
            of page and half of them start off-canvas, so they are the wrong thing to
            observe. This is the box Figma's rows occupy, y 707 to 1470. */}
          <div ref={band} className="absolute top-[707px] h-[763px] w-full" />
          {PROPS.map((n, i) => {
            const vars = FLOW_PX.get(n)
            return (
              <Node
                key={i}
                n={n}
                flow={vars && flowClass ? { className: flowClass, vars } : undefined}
              />
            )
          })}
        </div>
      </div>

      {/*
       * Below `lg`: the same two groups, as bands hung off the calendar section at the
       * fraction of it Figma puts them at. The garlic keeps its left-edge bleed and the
       * cutlery its right-edge bleed, both cropped by this canvas rather than by a page-wide
       * scroll area.
       */}
      <div className="lg:hidden">
        <SectionBand anchor={calendar} figma={{ y: GARLIC_LEFT.y, ...FIGMA_CALENDAR }}>
          {(top) => (
            <FluidGroup
              nodes={[{ ...GARLIC_LEFT, y: 0 }]}
              y0={0}
              y1={GARLIC_LEFT.h}
              className="inset-x-0"
              style={{ top }}
            />
          )}
        </SectionBand>
        <SectionBand anchor={calendar} figma={{ y: FORK_RIGHT.y, ...FIGMA_CALENDAR }}>
          {(top) => (
            <FluidGroup
              nodes={[{ ...FORK_RIGHT, y: 0 }]}
              y0={0}
              y1={FORK_RIGHT.h}
              className="inset-x-0"
              style={{ top }}
            />
          )}
        </SectionBand>
      </div>
    </div>
  )
}

/*
 * ------------------------------------------------------- the masthead, narrowed
 *
 * Below `lg` the px canvas above is hidden, and the two groups that belong to the masthead
 * are drawn here instead — inside the hero section, which is the anchor that survives the
 * section heights changing. Both are the real Figma groups: the same 23 tubes crowding the
 * wordmark and the same 20 rigatoni falling past the CTA, at 100vw/1440 of their Figma size
 * and in Figma's arrangement. Nothing is a hand-drawn substitute any more; the only thing
 * chosen here is each band's window and where it hangs.
 *
 * The two windows are chosen and not transcribed, for one reason each:
 *
 *   - the masthead crowd hangs 585 above the page top in Figma, where a 1192-tall hero
 *     leaves 421 of it on screen. A phone's hero is 686 tall and its wordmark is 91% of the
 *     screen's width rather than 56%, so that same crop scaled to 100vw/1440 puts 114px of
 *     pasta above a wordmark that starts at 129 — and the nav pill covers 92 of it. The band
 *     is pinned under the nav instead and its window opened to y -470, which shows more of
 *     the same crowd and puts it around the wordmark, which is where the design has it.
 *   - the scatter's window is Figma's own, y 707..1470, and it is hung by its *bottom*: the
 *     frame ends 278 below the hero's own bottom edge, i.e. 19.31% of the canvas past it, so
 *     `bottom: -19.31vw` reproduces the overhang exactly at any width.
 */
export function HeroMobileDecor() {
  const { band, flowClass } = useFlowPhase()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden">
      <FluidGroup
        nodes={TOP_PASTA}
        y0={-470}
        y1={TOP_PASTA_WINDOW.y1}
        /* the nav pill is a fixed 92 tall at the narrow widths; the crowd starts under it */
        className="inset-x-0 top-[92px]"
      />

      {/* the flow's sentinel is the band's own box, which is one node rather than twenty */}
      <div ref={band} className="absolute inset-x-0 bottom-[-19.31vw] aspect-[1440/763]">
        <FluidGroup
          nodes={RIGATONI_SCATTER}
          y0={RIGATONI_WINDOW.y0}
          y1={RIGATONI_WINDOW.y1}
          className="inset-0"
          flowOf={(n) => {
            const vars = FLOW_FLUID.get(n)
            return vars && flowClass ? { className: flowClass, vars } : undefined
          }}
        />
      </div>
    </div>
  )
}

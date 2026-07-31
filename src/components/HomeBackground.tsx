/*
 * The homepage's decorations, consolidated. Figma pins every prop in one
 * "Homepage - Background" frame (935:451), 1440x5178, anchored at page y = 0 and painted
 * entirely behind the section content — so they render here as a single 1440-wide canvas
 * at the back of the page, clipped at the frame's own edges the way Figma clips it.
 *
 * Every table below is a transcription of that frame rather than a set of choices, so the
 * rows stay one-per-node (`prettier-ignore`) and the numbers stay as found — reading them
 * against Figma is the only way to check them. DOM order = the frame's paint order.
 */

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

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

function Node({ n, flow }: { n: DecorNode; flow?: FlowProps }) {
  const frame: CSSProperties = { left: n.x, top: n.y, width: n.w, height: n.h }

  if (n.kids) {
    return (
      <div className="absolute" style={frame}>
        {n.kids.map((kid, i) => (
          <Node key={i} n={kid} />
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

  return (
    <div
      className={`absolute flex items-center justify-center ${flow?.className ?? ''}`}
      style={flow ? { ...frame, ...flow.vars } : frame}
    >
      {/* `relative` so a blurred export's bleed is measured from the art box, not the bbox */}
      <div className="relative shrink-0" style={{ width: aw, height: ah, transform }}>
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
        ) : n.spread ? (
          <img
            src={n.src}
            alt=""
            className="absolute max-w-none"
            style={{
              left: -n.spread,
              top: -n.spread,
              width: aw + n.spread * 2,
              height: ah + n.spread * 2,
            }}
          />
        ) : (
          <img src={n.src} alt="" className="size-full object-cover" />
        )}
      </div>
    </div>
  )
}

/**
 * "Home Buttom" — the frame's bottom-most layers: the cream wave, the wave cluster, the
 * red blob whose wavy edges are the prize band (painted over the cluster, so only what
 * hangs below its bottom edge shows), and the cheese pile on top of the blob.
 */
// prettier-ignore
const HOME_BOTTOM: DecorNode[] = [
  { x: 0, y: 3764, w: 1440, h: 1414, kids: [
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
  ] },
]

/**
 * The two faint washes: a #D79A4E blob at 15% and at 10%, each under an 800px layer
 * blur. That blur is baked into the export, which is why the SVG runs 800px past its
 * node on every side — `spread` puts the bleed back.
 */
// prettier-ignore
const WASH: DecorNode[] = [
  { x: 517, y: 2835, w: 1149, h: 1120, spread: 800, src: wash15 },
  { x: 728, y: 1188, w: 1125, h: 1155, aw: 1155, ah: 1125, rotate: 90, spread: 800, src: wash10 },
]

/**
 * The food props above the washes: the "Top pasta" frame crowding the masthead, a looser
 * rigatoni scatter falling past the hero CTA, then garlic on a yellow wave and the
 * cutlery star on a red one riding over the calendar's tail.
 */
// prettier-ignore
const PROPS: DecorNode[] = [
  { x: 0, y: 0, w: 1440, h: 335, kids: [
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
  ] },
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
  { x: -203, y: 2184.068, w: 662.879, h: 363.932, kids: [
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
  ] },
  { x: 968.299, y: 2034.703, w: 888.51, h: 875.25, kids: [
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
  ] },
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
 */
type FlowProps = { className: string; vars: CSSProperties }

/** The one thing not derived from the index: which way a piece is pushed as the pile packs. */
const PILE_X = 1150

function flowVars(i: number, x: number): CSSProperties {
  const out = x >= PILE_X ? 1 : -1
  // neighbours orbit opposite ways, so the band breathes rather than drifting as one body
  const spin = i % 2 ? 1 : -1
  const delay = i * 95
  const duration = 1800 + ((i * 137) % 5) * 180

  return {
    '--pasta-dx': `${-(440 + ((i * 89) % 7) * 55)}px`,
    '--pasta-dy': `${(((i * 53) % 9) - 4) * 16}px`,
    '--pasta-spin': `${(((i * 71) % 11) - 5) * 4}deg`,
    '--pasta-scale': `${(0.86 + ((i * 31) % 6) * 0.03).toFixed(3)}`,
    '--pasta-px': `${out * (7 + ((i * 17) % 3) * 6)}px`,
    '--pasta-py': `${(((i * 41) % 5) - 2) * 6}px`,
    '--pasta-delay': `${delay}ms`,
    '--pasta-duration': `${duration}ms`,
    '--pasta-idle-delay': `${delay + duration}ms`,
    '--pasta-idle-duration': `${17000 + ((i * 61) % 9) * 1900}ms`,
    '--pasta-idle-x': `${spin * (5 + ((i * 43) % 5) * 1.8)}px`,
    '--pasta-idle-y': `${3 + ((i * 29) % 4) * 1.6}px`,
    '--pasta-idle-r': `${spin * (1.1 + ((i * 23) % 4) * 0.5)}deg`,
  } as CSSProperties
}

/** Keyed by node so the flight belongs to the piece, not to its position in the array. */
const FLOW = new Map<DecorNode, CSSProperties>(
  PROPS.filter((n) => n.crop === RIGATONI).map((n, i) => [n, flowVars(i, n.x)]),
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

export default function HomeBackground() {
  const { band, flowClass } = useFlowPhase()

  return (
    /*
     * Two boxes, because the canvas is doing two jobs that used to fight. The outer one is
     * the CLIP and is viewport-wide: the washes and the red band are drawn thousands of px
     * across on purpose, and cutting them at 1440 is what put a white gutter down both
     * sides of a 1600 or 1920 display. The inner one is the COORDINATE SPACE and stays a
     * centred 1440, because every prop in here is pinned at its Figma page x/y and a wider
     * space would walk all of them away from the content they belong to.
     */
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[5178px] w-screen -translate-x-1/2 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 h-full w-[1440px] -translate-x-1/2">
        {/*
         * Figma has no spec below the 1440 canvas, so narrower viewports get a policy
         * instead: the photographic props hide below `lg`, where a 1440-scale prop would
         * dwarf the reflowed content (the prizes section's flat bg-brand-red stands in for
         * the hidden red blob there); the washes, already thousands of px across, stay at
         * every width since a centred slice of a soft gradient still reads as the same tint.
         * Three groups rather than two because the frame paints Home Buttom *under* the
         * washes but every other prop *over* them.
         */}
        <div className="hidden lg:block">
          {HOME_BOTTOM.map((n, i) => (
            <Node key={i} n={n} />
          ))}
        </div>
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
            const vars = FLOW.get(n)
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
    </div>
  )
}

/*
 * Below `lg` the canvas above is hidden, and hiding it left the narrow layouts bare: at
 * 375 the homepage had ~180px of empty white between the nav and the wordmark and ~240px
 * between the CTA and the calendar header — exactly the two places the 1440 design fills
 * with pasta. Figma has no spec under 1440, so this is a stated policy rather than a
 * transcription, and it is deliberately NOT the desktop canvas rescaled: that canvas is
 * anchored to page coordinates while narrow content reflows to a different height, so any
 * uniform scale walks the props away from the content they belong to. These two bands are
 * anchored to the hero section instead, and every number below is a fraction of the band's
 * own width, so the arrangement holds its shape from 320 up to the `lg` handover.
 *
 * The art is the same two sprite sheets the desktop rows use, at the same crops, so the
 * pieces are the same objects at a size that suits the viewport.
 */
type MobilePiece = {
  /** all four in % of the band's width, except `t` which is % of its height */
  l: number
  t: number
  w: number
  /** the piece's own box ratio; both sprites are drawn at their art box's aspect */
  ratio: number
  rot: number
  crop: Crop
  src: string
}

const TUBE_RATIO = 597 / 443
const RIGATONI_RATIO = 281.184 / 325.005

/*
 * The masthead crowd: three tubes into each side of the wordmark, bleeding off both edges.
 * Unlike the 1440 rows these do not bleed off the *top* — up there the fixed nav pill sits
 * over the first 92px of the page and simply covered them, so the cluster starts below it
 * and fills the gap between the nav and the wordmark instead.
 */
// prettier-ignore
const MOBILE_TOP: MobilePiece[] = [
  { l: -24, t:  0, w: 46, ratio: TUBE_RATIO, rot:   10, crop: TUBE, src: pasta1 },
  { l:   2, t: 14, w: 34, ratio: TUBE_RATIO, rot:   64, crop: TUBE, src: pasta1 },
  { l: -14, t: 34, w: 30, ratio: TUBE_RATIO, rot:  -36, crop: TUBE, src: pasta1 },
  { l:  78, t:  2, w: 44, ratio: TUBE_RATIO, rot:   82, crop: TUBE, src: pasta1 },
  { l:  60, t: 18, w: 30, ratio: TUBE_RATIO, rot:  137, crop: TUBE, src: pasta1 },
  { l:  86, t: 38, w: 32, ratio: TUBE_RATIO, rot:   36, crop: TUBE, src: pasta1 },
]

/**
 * The rigatoni band, in the same reading as the desktop rows: loose on the left, packing
 * into a pile on the right. Ordered left to right so the shared `flowVars` stagger — which
 * keys off the index — also runs left to right.
 */
// prettier-ignore
const MOBILE_BAND: MobilePiece[] = [
  { l:  -8, t: 28, w: 22, ratio: RIGATONI_RATIO, rot: -11, crop: RIGATONI, src: pasta24 },
  { l:  10, t: 48, w: 17, ratio: RIGATONI_RATIO, rot:  75, crop: RIGATONI, src: pasta24 },
  { l:  28, t: 20, w: 19, ratio: RIGATONI_RATIO, rot:  19, crop: RIGATONI, src: pasta24 },
  { l:  42, t: 44, w: 16, ratio: RIGATONI_RATIO, rot: -13, crop: RIGATONI, src: pasta24 },
  { l:  56, t: 14, w: 24, ratio: RIGATONI_RATIO, rot:  23, crop: RIGATONI, src: pasta24 },
  { l:  67, t: 42, w: 21, ratio: RIGATONI_RATIO, rot: -54, crop: RIGATONI, src: pasta24 },
  { l:  79, t: 18, w: 26, ratio: RIGATONI_RATIO, rot:  11, crop: RIGATONI, src: pasta24 },
  { l:  88, t: 46, w: 20, ratio: RIGATONI_RATIO, rot: -31, crop: RIGATONI, src: pasta24 },
]

/*
 * `scale` is how much smaller the pieces are drawn than the <md table states. A tablet is
 * twice as wide as a phone, and `w` is a fraction of the band's width, so at 1:1 the same
 * composition comes out at twice the size and the tubes crowd the CTA instead of framing
 * it. Only the two end pieces of a band bleed off an edge; those keep their bleed in
 * proportion to their own (now smaller) size by mirroring the scale about that edge, while
 * everything in between stays where the table puts it — otherwise scaling the whole row
 * inward would open a hole down the middle of a band that is meant to read left to right.
 */
function left(p: MobilePiece, scale: number) {
  if (p.l < 0) return p.l * scale
  if (p.l + p.w > 100) return 100 - (100 - p.l) * scale
  return p.l
}

function MobileBand({
  pieces,
  className,
  scale,
  flowClass,
}: {
  pieces: MobilePiece[]
  className: string
  scale: number
  /** present only for the band that flows; the corners are static, as they are at 1440 */
  flowClass?: string
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute -z-10 ${className}`}>
      {pieces.map((p, i) => (
        /*
         * Two boxes, exactly as the 1440 canvas has: the flight animates the outer one and
         * the piece's own turn stays on the inner. One box for both would mean the flow's
         * keyframes and `rotate(p.rot)` writing the same `transform`, and the animation
         * would win — which, now that it never ends, would flatten every piece to 0deg.
         */
        <div
          key={i}
          className={`absolute ${flowClass ?? ''}`}
          style={{
            left: `${left(p, scale)}%`,
            top: `${p.t}%`,
            width: `${p.w * scale}%`,
            aspectRatio: p.ratio,
            // `l` maps the piece onto the 1440 canvas's x axis, so the nudge direction and
            // the stagger come from the same function the desktop band uses.
            ...(flowClass ? flowVars(i, p.l * 14.4) : {}),
          }}
        >
          <div
            className="relative size-full overflow-hidden"
            style={{ transform: `rotate(${p.rot}deg)` }}
          >
            <img
              src={p.src}
              alt=""
              className="absolute max-w-none"
              style={{
                width: `${p.crop[0]}%`,
                height: `${p.crop[1]}%`,
                left: `${p.crop[2]}%`,
                top: `${p.crop[3]}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function HeroMobileDecor() {
  const phone = useFlowPhase()
  const tablet = useFlowPhase()

  return (
    <>
      {/* Two copies rather than one with a CSS variable: the bleed correction in `left()`
          has to be computed per scale, and a media query cannot reach into it. */}
      <div className="md:hidden">
        <MobileBand
          pieces={MOBILE_TOP}
          scale={1}
          className="inset-x-0 top-[92px] aspect-[375/170]"
        />
        {/* the flow's sentinel is the band's own box, which is one node rather than 20 */}
        <div ref={phone.band} className="absolute inset-x-0 bottom-0 aspect-[375/160]">
          <MobileBand
            pieces={MOBILE_BAND}
            scale={1}
            className="inset-0 h-full"
            flowClass={phone.flowClass}
          />
        </div>
      </div>

      <div className="hidden md:block lg:hidden">
        <MobileBand
          pieces={MOBILE_TOP}
          scale={0.56}
          className="inset-x-0 top-[92px] aspect-[768/210]"
        />
        <div ref={tablet.band} className="absolute inset-x-0 bottom-0 aspect-[768/190]">
          <MobileBand
            pieces={MOBILE_BAND}
            scale={0.56}
            className="inset-0 h-full"
            flowClass={tablet.flowClass}
          />
        </div>
      </div>
    </>
  )
}

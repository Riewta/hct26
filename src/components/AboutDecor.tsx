import type { ReactNode } from 'react'

/**
 * The About page's page-level decorations — the soft out-of-focus food behind the four
 * sections. In Figma they live in one consolidated "About - Background" frame (935:858),
 * 1440x4888, anchored to the top of the page, painted entirely behind the section
 * content — so they render here as a single 1440-wide canvas at the back of the page.
 * (The Star mascot is not part of that frame; it stays a foreground piece of FaqSection.)
 *
 * The canvas is desktop-only. Below `lg` the sections no longer have Figma's fixed
 * heights, so page-absolute offsets would land nowhere near the content they belong to.
 */

const A = '/assets/figma/'
const PASTA = `${A}75a3f21d83e48c826faf73145f277697d0b6d0b5.png`
const TOMATO = `${A}c9bba25699e9ddc8ec5315b54821489e5b1d4aba.png`
const POT = `${A}6bb2b5a195d39a53e0c729d07460bbbcacc39e65.png`
const GARLIC = `${A}3762ab86266f19ae60ffdbc35a12c302cdeaeaae.png`
/* The three waves each prop pile sits on, and the warm wash over the whole page. */
const POT_WAVE = `${A}04e4ea7c8b321468519b19736f247ed81b6e13b4.svg`
const TOMATO_WAVE = `${A}0bfef7e400c4e3e40a9a5e579a3bfb301e852a4d.svg`
const GARLIC_WAVE = `${A}1929430b7343966fe082e8a4e52d59eeeeca1c68.svg`
const WASH = `${A}31e583ef33f9b578ae1882798097740e00a4a0bf.svg`

/** A node whose image fill is cropped — Figma scales the bitmap past the node box. */
type Crop = {
  src: string
  x: number
  y: number
  w: number
  h: number
  /** image placement inside the box, as percentages of the box */
  ix: string
  iy: string
  iw: string
  ih: string
}

/*
 * Pasta 1 (935:897) and Pasta 2 (935:898) share one bitmap at the same crop; only their
 * boxes differ, which is what turns the same lattice into two different washes.
 *
 * These four percentages are NOT the ones Figma's own generated CSS reports for the fill
 * (291.47/298.81/-113.3/-90.4): those describe a fill roughly 25% too wide and 75% too
 * tall, which rendered the whole cloth across the page instead of the corner Figma paints.
 * They are solved from the frame's render instead — the bitmap's opaque bounds land at
 * page x 860 (Pasta 1's left edge) and x 447 (Pasta 2's right edge), page y 817..1502
 * (Pasta 2, its only two unclipped edges) — which reproduces Pasta 1's bottom edge to
 * within 6px as a check. Re-derive them the same way if the fill ever moves in Figma.
 */
const PASTA_FILL = { ix: '-117.72%', iy: '-24.19%', iw: '233.09%', ih: '170.18%' }

/* Frame paint order: 1, then 2. (Pasta 3, 935:899, and Pasta 4, 935:1328, both render
   empty in Figma — 935:899 exports as a 1x1 image — so neither is drawn here.) */
const CROPS: Crop[] = [
  { src: PASTA, x: 1226.604, y: -522.67, w: 1528.462, h: 1468.876, ...PASTA_FILL },
  { src: PASTA, x: -371.576, y: 236.908, w: 1669.054, h: 1669.042, ...PASTA_FILL },
]

/** A rotated prop: `w/h` is the box Figma reports, `uw/uh` the size before rotation. */
type Prop = {
  src: string
  x: number
  y: number
  w: number
  h: number
  uw: number
  uh: number
  rot: number
  flip?: boolean
}

/**
 * Tomatoes, bottom left, page y 4515 (frame 935:890). Wave 2 is the maroon blob they sit
 * on; the four tomatoes are one bitmap, four turns of it.
 */
// prettier-ignore
const TOMATOES: Prop[] = [
  { src: TOMATO_WAVE, x: -43.31, y: 21.91, w: 653, h: 566, uw: 566, uh: 653, rot: -90 },
  { src: TOMATO, x: 0, y: 0, w: 559.203, h: 435.764, uw: 510.239, uh: 362.837, rot: 8.69 },
  { src: TOMATO, x: 288.8, y: 135.31, w: 375.472, h: 280.463, uw: 357.147, uh: 253.971, rot: 175.63, flip: true },
  { src: TOMATO, x: 119.28, y: 137.38, w: 415.592, h: 355.743, uw: 350.801, uh: 249.458, rot: 20.32 },
  { src: TOMATO, x: 29, y: 181.78, w: 298.748, h: 267.146, uw: 246.313, uh: 175.156, rot: -26.7 },
]

/**
 * Stock pots, bottom right, page y 4581 (frame 935:859), on Wave 1's grey blob. Both
 * lists are positioned from the inner "Pot"/"Tomato" frame, so the waves — siblings of
 * that frame, not children — carry its offset back out (-63 here, -43.31 above).
 */
// prettier-ignore
const POTS: Prop[] = [
  { src: POT_WAVE, x: -63, y: 33, w: 537, h: 480, uw: 480, uh: 537, rot: 90 },
  { src: POT, x: 66, y: 0, w: 452.963, h: 347.757, uw: 419.286, uh: 298.159, rot: 7.11 },
  { src: POT, x: 0, y: 104, w: 367.23, h: 281.382, uw: 340.584, uh: 242.193, rot: -6.9 },
]

/*
 * Garlic. Figma expresses each bulb's size with container-relative `hypot()` maths, which
 * resolves to one art box per bulb — 362.86x258 for the three largest, scaled copies for
 * the rest, all at the bitmap's own 1.406 aspect — inside the box Figma reports for the
 * node. Drawing the bitmap at the *box* size instead (as this file used to) made every
 * bulb 17-40% too big and dropped its rotation, which is why the pile read as two giant
 * cloves rather than a heap of whole bulbs.
 *
 * Both rows are clipped by their frame, which is the only reason the pile stops where it
 * does rather than running down over the map. Row 2 (935:1314) is left out: it starts at
 * page x 1414 and its nearest bulb at 1478, so every part of it is off the 1440 canvas.
 */
// prettier-ignore
const GARLIC_ROW_1: Prop[] = [
  { src: GARLIC, x: 171.685, y: 74.988, w: 426.191, h: 360.270, uw: 362.86, uh: 258.00, rot: -1.7 },
  { src: GARLIC, x: 468.661, y: 65.420, w: 418.774, h: 445.207, uw: 362.86, uh: 258.00, rot: 72.17 },
  { src: GARLIC, x: 561.234, y: 262.551, w: 351.854, h: 421.923, uw: 362.86, uh: 258.00, rot: 123.69 },
  { src: GARLIC, x: 427.739, y: 435.920, w: 349.510, h: 302.099, uw: 293.17, uh: 208.51, rot: 175.21 },
  { src: GARLIC, x: 251.966, y: 506.264, w: 448.948, h: 409.661, uw: 367.61, uh: 261.44, rot: -133.27 },
  { src: GARLIC, x: 103.347, y: 263.711, w: 269.782, h: 337.196, uw: 300.24, uh: 213.46, rot: -61.44 },
]

/* Row 3 is Row 1 at 0.5453 scale — same six turns, same art boxes shrunk to match. */
// prettier-ignore
const GARLIC_ROW_3: Prop[] = [
  { src: GARLIC, x: 127.376, y: 79.120, w: 232.386, h: 196.442, uw: 197.87, uh: 140.69, rot: -1.7 },
  { src: GARLIC, x: 289.306, y: 73.903, w: 228.342, h: 242.755, uw: 197.87, uh: 140.69, rot: 72.17 },
  { src: GARLIC, x: 339.784, y: 181.390, w: 191.853, h: 230.059, uw: 197.87, uh: 140.69, rot: 123.69 },
  { src: GARLIC, x: 266.993, y: 275.922, w: 190.575, h: 164.724, uw: 159.87, uh: 113.70, rot: 175.21 },
  { src: GARLIC, x: 171.152, y: 314.279, w: 244.795, h: 223.373, uw: 200.46, uh: 142.55, rot: -133.27 },
  { src: GARLIC, x: 90.116, y: 182.023, w: 147.102, h: 183.861, uw: 163.72, uh: 116.40, rot: -61.44 },
]

function Props({ items, x, y }: { items: Prop[]; x: number; y: number }) {
  return (
    <>
      {items.map((p, i) => (
        <img
          key={i}
          src={p.src}
          alt=""
          className="absolute max-w-none object-cover"
          style={{
            left: x + p.x + p.w / 2 - p.uw / 2,
            top: y + p.y + p.h / 2 - p.uh / 2,
            width: p.uw,
            height: p.uh,
            transform: `rotate(${p.rot}deg)${p.flip ? ' scaleY(-1)' : ''}`,
          }}
        />
      ))}
    </>
  )
}

/**
 * The background frame is 1440x4888 — it stops where the footer starts — and clips its
 * children to that box, so the tomatoes and pots (whose boxes run to page y 5008) are
 * cut at 4888 rather than drawn on under the footer.
 */
function Canvas({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 -z-10 hidden h-[4888px] w-[1440px] -translate-x-1/2 overflow-hidden lg:block"
    >
      {children}
    </div>
  )
}

export function AboutDecor() {
  return (
    <Canvas>
      {/* Frame paint order, bottom-most first: pots, tomatoes, pasta, garlic, wash. */}
      <Props items={POTS} x={1031} y={4581} />
      <Props items={TOMATOES} x={-149.69} y={4515.094} />
      {CROPS.map((c, i) => (
        <div
          key={i}
          className="absolute overflow-hidden"
          style={{ left: c.x, top: c.y, width: c.w, height: c.h }}
        >
          <img
            src={c.src}
            alt=""
            className="absolute max-w-none"
            style={{ left: c.ix, top: c.iy, width: c.iw, height: c.ih }}
          />
        </div>
      ))}
      {/*
       * Wave 3 (935:1298), the beige blob under the garlic. Figma reports the node's
       * pre-rotation origin, so its 180° turn puts the box at (1600-597, 3690-378).
       */}
      <img
        src={GARLIC_WAVE}
        alt=""
        className="absolute max-w-none rotate-180"
        style={{ left: 1003, top: 3312, width: 597, height: 378 }}
      />
      {/* Figma keeps a second, separately clipped copy of the first row under the pile */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 960, top: 3377.507, width: 718.808, height: 708.605 }}
      >
        <Props items={GARLIC_ROW_1} x={0} y={0} />
      </div>
      <div
        className="absolute overflow-hidden"
        style={{ left: 867, top: 3196, width: 811.808, height: 721.604 }}
      >
        <Props items={GARLIC_ROW_1} x={93} y={181.507} />
        <Props items={GARLIC_ROW_3} x={91} y={582.637} />
      </div>
      {/*
       * "Decoration / Circle" (935:1656) — a #D79A4E blob at 20% under a 400px layer blur,
       * and the frame's last child, so it washes over everything above. Its 1125x1155 box
       * holds a quarter-turned 1155x1125 blob, the same art the homepage's two washes use;
       * the blur is baked into the export, which is why the SVG is 2755x2725 — 800px past
       * the art on every side — and why the img is offset by that bleed.
       */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 611, top: 1116, width: 1125, height: 1155 }}
      >
        <div className="relative shrink-0 rotate-90" style={{ width: 1155, height: 1125 }}>
          <img
            src={WASH}
            alt=""
            className="absolute max-w-none"
            style={{ left: -800, top: -800, width: 2755, height: 2725 }}
          />
        </div>
      </div>
    </Canvas>
  )
}

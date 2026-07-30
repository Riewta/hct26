import type { ReactNode } from 'react'

/**
 * The About page's page-level decorations — the soft out-of-focus food that sits behind
 * (and in one case over) the four sections. In Figma these are siblings of the sections,
 * positioned in page coordinates on the 1440 frame, so they live in one 1440-wide canvas
 * anchored to the top of the page rather than being split across the sections.
 *
 * Figma's z-order is not a single layer: the pasta and the pots/tomatoes sit *under* the
 * sections while the garlic is drawn last, over everything — hence `back` and `front`.
 *
 * The canvas is desktop-only. Below `lg` the sections no longer have Figma's fixed
 * heights, so page-absolute offsets would land nowhere near the content they belong to.
 */

const A = '/assets/figma/'
const PASTA = `${A}75a3f21d83e48c826faf73145f277697d0b6d0b5.png`
const TOMATO = `${A}c9bba25699e9ddc8ec5315b54821489e5b1d4aba.png`
const POT = `${A}6bb2b5a195d39a53e0c729d07460bbbcacc39e65.png`
const GARLIC = `${A}3762ab86266f19ae60ffdbc35a12c302cdeaeaae.png`

/** A node whose image fill is cropped — Figma scales the bitmap past the node box. */
type Crop = {
  src: string
  x: number
  y: number
  w: number
  h: number
  /** image placement inside the box, as the percentages Figma reports */
  ix: string
  iy: string
  iw: string
  ih: string
}

/* Pasta 1 and 2 share one bitmap at the same crop; only their boxes differ, which is what
   turns the same lattice into two different washes. Pasta 4 has no fill in Figma at all. */
const PASTA_FILL = { ix: '-113.3%', iy: '-90.4%', iw: '291.47%', ih: '298.81%' }

const CROPS: Crop[] = [
  // Pasta 3 — the small hard-cropped corner behind the scope heading
  {
    src: `${A}9411a40dfd006a723a0a9654923706988c019803.png`,
    x: -276.395,
    y: -247.809,
    w: 681.88,
    h: 756.448,
    ix: '-143.34%',
    iy: '-469.05%',
    iw: '641.92%',
    ih: '600.87%',
  },
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

/** Tomatoes, bottom left, page y 4515. One bitmap, four turns of it. */
const TOMATOES: Prop[] = [
  { src: TOMATO, x: 0, y: 0, w: 559.203, h: 435.764, uw: 510.239, uh: 362.837, rot: 8.69 },
  {
    src: TOMATO,
    x: 288.8,
    y: 135.31,
    w: 375.472,
    h: 280.463,
    uw: 357.147,
    uh: 253.971,
    rot: 175.63,
    flip: true,
  },
  {
    src: TOMATO,
    x: 119.28,
    y: 137.38,
    w: 415.592,
    h: 355.743,
    uw: 350.801,
    uh: 249.458,
    rot: 20.32,
  },
  { src: TOMATO, x: 29, y: 181.78, w: 298.748, h: 267.146, uw: 246.313, uh: 175.156, rot: -26.7 },
]

/** Stock pots, bottom right, page y 4581. */
const POTS: Prop[] = [
  { src: POT, x: 66, y: 0, w: 452.963, h: 347.757, uw: 419.286, uh: 298.159, rot: 7.11 },
  { src: POT, x: 0, y: 104, w: 367.23, h: 281.382, uw: 340.584, uh: 242.193, rot: -6.9 },
]

/*
 * Garlic. Figma expresses each bulb's rotation with container-relative `hypot()` maths
 * that has no meaning outside its own layout, so each bulb is placed in the box Figma
 * reports for it instead — the pile reads the same, the individual turns are approximate.
 * Both rows are clipped by their frame, which is the only reason the pile stops where it
 * does rather than running down over the map.
 */
const GARLIC_ROW_1 = [
  { x: 171.685, y: 74.988, w: 426.191, h: 360.27 },
  { x: 468.661, y: 65.42, w: 418.774, h: 445.207 },
  { x: 561.234, y: 262.551, w: 351.854, h: 421.923 },
  { x: 427.739, y: 435.92, w: 349.51, h: 302.099 },
  { x: 251.966, y: 506.264, w: 448.948, h: 409.661 },
  { x: 103.347, y: 263.711, w: 269.782, h: 337.196 },
]

const GARLIC_ROW_3 = [
  { x: 127.376, y: 79.12, w: 232.386, h: 196.442 },
  { x: 289.306, y: 73.903, w: 228.342, h: 242.755 },
  { x: 339.784, y: 181.39, w: 191.853, h: 230.059 },
  { x: 266.993, y: 275.922, w: 190.575, h: 164.724 },
  { x: 171.152, y: 314.279, w: 244.795, h: 223.373 },
  { x: 90.116, y: 182.023, w: 147.102, h: 183.861 },
]

function Bulbs({ items, x, y }: { items: typeof GARLIC_ROW_1; x: number; y: number }) {
  return (
    <>
      {items.map((g, i) => (
        <img
          key={i}
          src={GARLIC}
          alt=""
          className="decor-art absolute max-w-none object-cover"
          style={{ left: x + g.x, top: y + g.y, width: g.w, height: g.h }}
        />
      ))}
    </>
  )
}

function Props({ items, x, y }: { items: Prop[]; x: number; y: number }) {
  return (
    <>
      {items.map((p, i) => (
        <img
          key={i}
          src={p.src}
          alt=""
          className="decor-art absolute max-w-none object-cover"
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
 * Figma's page frame is 1440x5312 and clips these props to it, so the canvas takes that
 * whole box rather than just the four sections: the tomatoes and pots run to page y 5008,
 * past where the footer starts at 4888, and Figma draws them under it.
 */
function Canvas({ z, children }: { z: string; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className={`decor-canvas pointer-events-none absolute top-0 hidden h-[5312px] overflow-hidden lg:block ${z}`}
    >
      {children}
    </div>
  )
}

export function AboutDecorBack() {
  return (
    <Canvas z="-z-10">
      {CROPS.map((c, i) => (
        <div
          key={i}
          className="decor-art absolute overflow-hidden"
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
      <Props items={TOMATOES} x={-149.69} y={4515.094} />
      <Props items={POTS} x={1031} y={4581} />
    </Canvas>
  )
}

export function AboutDecorFront() {
  return (
    <Canvas z="z-30">
      {/* Figma keeps a second, separately clipped copy of the first row on top */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 960, top: 3377.507, width: 718.808, height: 708.605 }}
      >
        <Bulbs items={GARLIC_ROW_1} x={0} y={0} />
      </div>
      <div
        className="absolute overflow-hidden"
        style={{ left: 867, top: 3196, width: 811.808, height: 721.604 }}
      >
        <Bulbs items={GARLIC_ROW_1} x={93} y={181.507} />
        <Bulbs items={GARLIC_ROW_3} x={91} y={582.637} />
      </div>
    </Canvas>
  )
}

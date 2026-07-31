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
const CONTACT_BAND = `${A}7b1205541033ca44bebf6de0974444d5c89fc456.svg`
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
 * ------------------------------------------------------------------- garlic
 *
 * Three heaps of garlic between the FAQ and the Contact section. Each heap is a Figma
 * *frame* of six bulbs turned to roughly 60deg intervals, so the six read as one whole,
 * splayed bulb rather than as six loose cloves — and getting that reading right is the
 * whole difficulty here, because the frame is rotated and Figma reports two boxes for it:
 *
 *   - the **bbox** (`x/y/w/h` below), the axis-aligned box the rotated frame occupies in
 *     its parent — this is what `get_metadata` returns and it is where the heap *sits*;
 *   - the **inner box** (`iw/ih`), the frame's own unrotated size, centred in the bbox —
 *     this is the space the six bulbs are laid out in, and it is 20-25% smaller.
 *
 * This file previously read the bbox as the layout space and dropped the frame rotation
 * entirely, which scaled every bulb up by ~1.35 and pushed the heaps a few hundred px down
 * and right; at that size the six bulbs no longer overlapped, so the pile came apart into
 * separate cloves and only two of them were left on the 1440 canvas. `get_metadata` also
 * reports a rotated frame's `x/y` as the position of its *rotated* top-left corner, not of
 * the bbox — Row 1 reads (93, 181.5) there but its bbox top is 13 — so the row positions
 * below are taken from `get_design_context`, which states the bbox directly.
 *
 * Inside a heap the same two-box rule applies per bulb: `w/h` is the container Figma sizes
 * from the inner box, `aw/ah` the art box (its `hypot()` maths) centred in it and turned by
 * `rot`. Everything is transcribed; `scratch/calc.mjs`-style arithmetic is not repeated at
 * runtime. Check: Row 1's six containers tile its inner box exactly (right edge 579.79,
 * bottom 564.48), which is what proves the inner box is the right layout space.
 */
type Bulb = { x: number; y: number; w: number; h: number; aw: number; ah: number; rot: number }

/** 935:1307 / 935:1300-1305 — the big heap, laid out in a 579.78 x 564.464 frame. */
// prettier-ignore
const HEAP_1: Bulb[] = [
  { x: 171.69, y:  64.24, w: 370.35, h: 268.68, aw: 315.27, ah: 192.46, rot:   -1.7 },
  { x: 223.04, y:  65.42, w: 356.75, h: 424.43, aw: 342.64, ah: 222.40, rot:  72.17 },
  { x: 145.27, y: 119.44, w: 415.96, h: 445.04, aw: 397.52, ah: 295.31, rot: 123.69 },
  { x: 118.14, y: 228.16, w: 309.60, h: 232.26, aw: 259.51, ah: 160.49, rot: 175.21 },
  { x:      0, y:  59.38, w: 442.32, h: 446.86, aw: 383.25, ah: 270.87, rot: -133.27 },
  { x: 103.34, y:      0, w: 331.05, h: 365.77, aw: 335.93, ah: 255.37, rot: -61.44 },
]

/** 935:1314 — mirrored and turned nearly upside down, in a 441.654 x 430.329 frame. */
// prettier-ignore
const HEAP_2: Bulb[] = [
  { x: 124.32, y:  58.57, w: 275.95, h: 285.96, aw: 239.60, ah: 166.86, rot:  51.02 },
  { x: 104.29, y: 111.93, w: 269.75, h: 286.50, aw: 254.60, ah: 188.19, rot: 124.89 },
  { x:  65.76, y: 165.42, w: 243.44, h: 180.34, aw: 205.22, ah: 126.29, rot: 176.41 },
  { x:  41.97, y: 100.35, w: 226.03, h: 229.97, aw: 195.84, ah: 137.84, rot: -132.07 },
  { x:  63.86, y:  34.43, w: 204.79, h: 260.97, aw: 240.94, ah: 174.38, rot: -80.55 },
  { x: 130.12, y:  67.82, w: 211.80, h: 165.10, aw: 174.70, ah: 109.73, rot:  -8.72 },
]

/** 935:1321 — Heap 1's six turns again, in a 400.706 x 372.726 frame. */
// prettier-ignore
const HEAP_3: Bulb[] = [
  { x: 127.37, y:  73.24, w: 201.94, h: 146.50, aw: 171.91, ah: 104.94, rot:   -1.7 },
  { x: 155.37, y:  73.91, w: 194.52, h: 231.43, aw: 186.83, ah: 121.26, rot:  72.17 },
  { x: 112.98, y: 103.36, w: 226.81, h: 242.66, aw: 216.76, ah: 161.02, rot: 123.69 },
  { x:  98.18, y: 162.62, w: 168.81, h: 126.64, aw: 141.50, ah:  87.51, rot: 175.21 },
  { x:  33.76, y:  70.63, w: 241.18, h: 243.66, aw: 208.97, ah: 147.70, rot: -133.27 },
  { x:  90.12, y:  38.24, w: 180.51, h: 199.44, aw: 183.17, ah: 139.24, rot: -61.44 },
]

type Heap = {
  /** the rotated frame's axis-aligned box in its parent */
  x: number
  y: number
  w: number
  h: number
  /** the frame's own unrotated size, centred in that box */
  iw: number
  ih: number
  rot: number
  flipY?: boolean
  bulbs: Bulb[]
}

/** The three heaps, positioned inside the "Garlic Row" frame (935:1306). */
const HEAPS: Heap[] = [
  { x: 93, y: 13, w: 718.808, h: 708.605, iw: 579.78, ih: 564.464, rot: -16.9, bulbs: HEAP_1 },
  {
    x: 0,
    y: 0,
    w: 547.66,
    h: 540.115,
    iw: 441.654,
    ih: 430.329,
    rot: -163.1,
    flipY: true,
    bulbs: HEAP_2,
  },
  {
    x: 91,
    y: 226,
    w: 491.738,
    h: 473.098,
    iw: 400.706,
    ih: 372.726,
    rot: 16.9,
    flipY: true,
    bulbs: HEAP_3,
  },
]

function GarlicHeap({ heap }: { heap: Heap }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: heap.x, top: heap.y, width: heap.w, height: heap.h }}
    >
      <div
        className="relative shrink-0"
        style={{
          width: heap.iw,
          height: heap.ih,
          transform: `rotate(${heap.rot}deg)${heap.flipY ? ' scaleY(-1)' : ''}`,
        }}
      >
        {heap.bulbs.map((b, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
          >
            <img
              src={GARLIC}
              alt=""
              className="max-w-none shrink-0 object-cover"
              style={{ width: b.aw, height: b.ah, transform: `rotate(${b.rot}deg)` }}
            />
          </div>
        ))}
      </div>
    </div>
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
    /*
     * Outer box = the clip, viewport-wide so the oversized washes reach the screen edge
     * instead of leaving a white gutter past 1440. Inner box = the coordinate space, a
     * centred 1440, because every child is pinned at its Figma page x/y.
     */
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 -z-10 hidden h-[4888px] w-screen -translate-x-1/2 overflow-hidden lg:block"
    >
      <div className="absolute top-0 left-1/2 h-full w-[1440px] -translate-x-1/2">{children}</div>
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
       * "Vector Shape" (935:1125) — the #FFEAB4 field behind the FAQ, whose curved bottom
       * edge is what the contact section is drawn against and what the garlic heap rides.
       * Without it the FAQ's own flat band just stopped dead across the full width.
       *
       * 3023 wide against a 1440 canvas is deliberate: only the middle third is ever on
       * screen, and it is the curve that has to land, not the box.
       *
       * `get_metadata` reports y = 3495, which is 1163 — exactly one height — too low: the
       * node is flipped, so the y it gives is the transformed corner, the same trap the
       * rotated garlic frames spring. The real box top is 3495 − 1163. Checked against the
       * render of the parent frame, where the band runs from just under the Codern card to
       * the middle of the garlic's beige blob.
       *
       * Painted here, before the garlic and its blob, because the frame paints it under both.
       */}
      <img
        src={CONTACT_BAND}
        alt=""
        className="absolute max-w-none"
        style={{ left: -794, top: 2332, width: 3023, height: 1163 }}
      />
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
      {/*
       * Figma keeps a second copy of the big heap (935:1299) in its own frame, painted
       * just under the row. Its bbox works out to exactly where the row's own copy lands
       * — (960, 3209), the row's (867+93, 3196+13) — so the two coincide; it is drawn
       * because the frame does, not because it adds anything.
       */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 960, top: 3208.98, width: 718.808, height: 708.605 }}
      >
        <GarlicHeap heap={{ ...HEAPS[0], x: 0, y: 0 }} />
      </div>
      {/* "Garlic Row" (935:1306), which clips — the only reason the heaps stop where they
          do rather than running on down over the map. */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 867, top: 3196, width: 811.808, height: 721.604 }}
      >
        {HEAPS.map((heap, i) => (
          <GarlicHeap key={i} heap={heap} />
        ))}
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

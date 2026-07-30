import SectionHeader from './SectionHeader'
import HomeDecor, { PRIZES_DECOR, PRIZES_OVERLAY } from './HomeDecor'
import { PRIZES } from '../data'
import { useReveal } from '../hooks/useReveal'

const band = '/assets/figma/698744474ca70b049053608ab4751a69839434a7.svg'

/** Figma centres these two titles in their column; the outer two sit flush left. */
const CENTRED = [1, 2]

export default function Prizes() {
  const head = useReveal()
  const grid = useReveal({ group: true })

  return (
    // Figma: 165.5 of red above the header and below the grid.
    <section
      id="prizes"
      /*
       * Figma leaves 248 of page between this section's end (4820) and the footer (5068);
       * the wave-and-cheese band lives in that gap, with only its tips riding under the
       * footer card. Without the margin the footer starts at 4821 and buries the band,
       * which is what made it read as oversized. lg-only, because below lg the band's
       * props are hidden and the gap would just be dead space.
       */
      className="relative bg-brand-red px-4 py-20 lg:mb-[247px] lg:bg-transparent lg:px-15 lg:py-[165.5px]"
    >
      <HomeDecor nodes={PRIZES_DECOR} className="z-0" />

      {/*
       * The red is not a section fill — it is a single 2213.6 x 1162.5 blob whose wavy
       * top and bottom edges are the band's edges, hanging 32 above the section and 106
       * below it. Only from `lg` up: narrower viewports make the section taller than the
       * blob, so there the flat `bg-brand-red` stands in for it.
       */}
      <img
        src={band}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[calc(50%+37.25px)] left-[calc(50%-0.18px)] hidden h-[1162.509px] w-[2213.647px] max-w-none -translate-x-1/2 -translate-y-1/2 lg:block"
      />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader
            light
            number="03"
            title="รางวัลของการแข่งขัน"
            description="ทีมที่ได้รับรางวัลที่ 1-3 ในการแข่งขันจะมีสิทธิได้รับการพิจารณาสอบสัมภาษณ์ในภาควิชาที่กำหนดของคณะวิศวกรรมศาสตร์"
          />
        </div>

        {/*
         * Figma sizes all four cards 320 wide on 40 gaps = 1400, but anchors the row inside
         * the 1200 content column, so the fourth card lands 80px past the 1440 frame and gets
         * clipped — the ชมเชย prize is unreadable in Figma's own render. Keeping the 320 cards
         * and centring the whole 1400 track in the frame instead (20 either side) is the
         * reading that loses no content; shrinking to 270 would reflow every description.
         */}
        <div
          ref={grid.ref}
          className={`grid gap-10 sm:grid-cols-2 lg:-mx-[100px] lg:flex lg:w-[1400px] lg:max-w-none lg:items-start ${grid.cls}`}
        >
          {PRIZES.map((prize, i) => (
            <article
              key={prize.title}
              className="flex flex-col gap-6 lg:w-[320px] lg:shrink-0 lg:gap-10"
            >
              <div className="aspect-square rounded-xl bg-white" />
              <div
                className={`flex flex-col gap-4 text-white ${CENTRED.includes(i) ? 'lg:items-center' : ''}`}
              >
                <h3 className="text-2xl leading-[1.4] font-medium lg:text-3xl">{prize.title}</h3>
                <p className="w-full text-lg leading-[1.5] font-light lg:text-2xl">{prize.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* the cheese pile is the last layer in Figma — over the band and into the footer */}
      <HomeDecor nodes={PRIZES_OVERLAY} className="z-20" />
    </section>
  )
}

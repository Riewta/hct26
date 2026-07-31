import SectionHeader from './SectionHeader'
import { PRIZES } from '../data'
import { useReveal } from '../hooks/useReveal'

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
      className="shell sec-prizes relative bg-brand-red lg:mb-[247px] lg:bg-transparent"
    >
      {/*
       * The red band is not a section fill — it is the 2213.6 x 1162.5 blob painted in the
       * page background frame (HomeBackground). Below `lg` those props are hidden and the
       * section grows taller than the blob, so there the flat `bg-brand-red` stands in.
       */}
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
        {/*
         * Two-up from the smallest width rather than from `sm`. Figma's prize plate is a
         * 320px square and the artwork for it does not exist yet, so at one column on a
         * phone each prize was a 358x358 sheet of blank white above two short lines — four
         * of them in a row, close to two full screens of nothing. Paired, the four read as
         * the 2x2 award grid they are and the section is one screen again.
         */}
        <div
          ref={grid.ref}
          className={`grid grid-cols-2 gap-x-[calc(16px_+_24*var(--fl))] gap-y-[calc(28px_+_12*var(--fl))] lg:-mx-[100px] lg:flex lg:w-[1400px] lg:max-w-none lg:items-start ${grid.cls}`}
        >
          {PRIZES.map((prize, i) => (
            <article
              key={prize.title}
              className="flex min-w-0 flex-col gap-[calc(12px_+_12*var(--fl))] lg:w-[320px] lg:shrink-0 lg:gap-10"
            >
              <div className="aspect-square rounded-xl bg-white" />
              <div
                className={`flex flex-col gap-4 text-white ${CENTRED.includes(i) ? 'lg:items-center' : ''}`}
              >
                <h3 className="fl-title leading-[1.4] font-medium">{prize.title}</h3>
                <p className="fl-lead w-full leading-[1.5] font-light">{prize.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

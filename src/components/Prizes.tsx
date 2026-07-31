import SectionHeader from './SectionHeader'
import { PRIZES } from '../data'
import { useReveal } from '../hooks/useReveal'

/** Figma centres these two titles in their column; the outer two sit flush left. */
const CENTRED = [1, 2]

/**
 * One prize, revealing itself.
 *
 * D5 — the four used to be children of one `reveal-group`. Correct at 1440, where they are a
 * single 1400-wide row and all four measured 0.50 of the viewport. At 390 they are a 2x2, and
 * the same trigger fired for the bottom pair at 1.32 of the viewport, below the fold. Each
 * card observes itself now; the 70ms ladder is carried inline as `--reveal-delay`, which is
 * spent only on the reveal's own opacity and transform (index.css).
 */
function PrizeCard({ prize, i }: { prize: (typeof PRIZES)[number]; i: number }) {
  const reveal = useReveal<HTMLElement>()

  return (
    <article
      ref={reveal.ref}
      style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
      className={`flex min-w-0 flex-col gap-[calc(12px_+_12*var(--fl))] lg:w-[320px] lg:shrink-0 lg:gap-10 ${reveal.cls}`}
    >
      <div className="aspect-square rounded-xl bg-white" />
      <div
        className={`flex flex-col gap-4 text-white ${CENTRED.includes(i) ? 'lg:items-center' : ''}`}
      >
        {/*
         * `min-h: 2.8em` is two lines of this element's own 1.4 leading, so it
         * tracks `fl-title` at every width without repeating the ramp. Released at
         * `lg`, where the design's one-line titles fit their 320 card and the extra
         * line would just be a hole.
         */}
        <h3 className="fl-title min-h-[2.8em] leading-[1.4] font-medium md:min-h-0">
          {prize.title}
        </h3>
        <p className="fl-lead w-full leading-[1.5] font-light">{prize.body}</p>
      </div>
    </article>
  )
}

export default function Prizes() {
  const head = useReveal()

  return (
    // Figma: 165.5 of red above the header and below the grid.
    <section
      id="prizes"
      /*
       * Figma leaves 248 of page between this section's end (4820) and the footer (5068);
       * the wave-and-cheese band lives in that gap, with only its tips riding under the
       * footer card. Without the margin the footer starts at 4821 and buries the band,
       * which is what made it read as oversized.
       *
       * The gap below `lg` is `pb-[17.5vw]` on the page wrapper (pages/Home.tsx), not a margin
       * here: a bottom margin sits OUTSIDE the wrapper's box, so the canvas — which stretches
       * to that box — stopped at this section's bottom edge and the gap came out plain white.
       *
       * No `bg-brand-red` here either. The phone red field is painted inside the canvas now
       * (HomeBackground), because as this section's own background it was opaque and covered
       * the cheese pile and the cream strands that belong on top of it.
       */
      className="shell sec-prizes relative lg:mb-[247px]"
    >
      {/*
       * The red band is not a section fill — it is the 2213.6 x 1162.5 blob painted in the
       * page background frame (HomeBackground), which also paints the flat stand-in this
       * section needs below `lg`, where it grows taller than the blob can cover.
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
         * Re-read live off Figma 708:271 "Prizes Grid" (2026-07-31). Settling the question a
         * previous round got wrong twice:
         *
         *   - The plate is `Light Background`, a plain `bg-white rounded-[12px]` square with
         *     no fill and no child. Figma really does reserve an empty box — there is no
         *     missing export to go and find. So it stays, per "ทำตาม Figma ไปเลย".
         *   - Every title is `whitespace-nowrap` at 30px in a 320 card, so in the design all
         *     four sit on ONE line and the four descriptions share a baseline. That is the
         *     part the render was losing: below `lg` the cards are ~150–190 wide, the two
         *     long titles wrap to two lines and the two short ones do not, so the four
         *     bodies stepped. Reserving two lines of title below `lg` restores the design's
         *     property — one shared body baseline — at a width the design never drew.
         *   - Cards 2 and 3 centre their text block (`items-center`), 1 and 4 do not. Their
         *     text is 315 of the 320, so it reads flush; it is kept because it is the spec.
         *
         * Two-up rather than one: at one column a 350-square empty plate over two short
         * lines, four times over, is most of two screens of nothing. Paired, the four read
         * as the 2x2 award grid they are — and at 768 a two-up card measures 314, which is
         * Figma's 320 almost exactly.
         */}
        <div className="grid grid-cols-2 gap-x-[calc(16px_+_24*var(--fl))] gap-y-[calc(28px_+_12*var(--fl))] lg:-mx-[100px] lg:flex lg:w-[1400px] lg:max-w-none lg:items-start">
          {PRIZES.map((prize, i) => (
            <PrizeCard key={prize.title} prize={prize} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

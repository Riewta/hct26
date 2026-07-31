import SectionHeader from './SectionHeader'
import { TIMELINE_HIGHLIGHTS, TIMELINE_STEPS } from '../data'
import { useReveal } from '../hooks/useReveal'

const spaghetti = '/assets/figma/ace844a0c921e340e3257f408b288273f191b3d8.png'
const addToCalendar = '/assets/figma/7aa7415392999a4ea5000911a14f8b9228b4344a.svg'

/**
 * The row splits 700 / 476 inside the 1200 content column — expressed as grid `fr`
 * columns, because flex ratios round the split a few px off at this size.
 * `bowl` is where the spaghetti photo starts inside each card: the same 834-wide
 * image, pushed right in the wide card and pulled far left in the narrow one, so both
 * cards show a different slice of the same bowl.
 */
/*
 * `bowl` is the photo's geometry, and it is a two-composition problem.
 *
 * At `lg` the row exists, so Figma's slice is reproducible: the 834-wide image is
 * re-expressed as a percentage of the card it sits in — 834.211/700 for the wide card,
 * 834.211/476 for the narrow one — with `left` as the same percentage of the card. That
 * scales the whole bowl with the column and shows the identical slice at any width from
 * 1024 up, where the hard 834px only showed the correct one at exactly 1440.
 *
 * Below `lg` the row collapses to one column and Figma's slice has no meaning: an 834px
 * plate anchored at x = -551 inside a 350px card put the bowl straight over the
 * "เพิ่มไปยังปฏิทิน" row, which is why that line was illegible on the yellow card at 390.
 * There the bowl is a corner garnish instead — two thirds of the card wide, hung off the
 * bottom-right so only the plate's upper-left arc is inside the card and the CTA in the
 * opposite corner stays clear of it.
 */
const TONE = {
  red: {
    card: 'from-red-grad-from to-red-grad-to',
    bowl: 'lg:left-[24.073%] lg:w-[119.173%]',
  },
  yellow: {
    card: 'from-yellow-grad-from to-yellow-grad-to',
    bowl: 'lg:left-[-115.86%] lg:w-[175.254%]',
  },
}

/** Shared by both tones: the garnish below lg, then Figma's own top offset from lg up. */
const BOWL_BOX =
  'absolute aspect-[834.211/441.197] w-[68%] -right-[14%] -bottom-[18%] ' +
  'lg:right-auto lg:bottom-auto lg:top-[12.16%]'

/**
 * One highlight card, revealing itself.
 *
 * Same reason as the scope cards and the prizes: from `md` up the pair is a row and shares a
 * trigger, but at 390 they stack into 500-odd px each and one trigger fired for the second
 * card at 1.06 of the viewport. The 70ms ladder is carried inline as `--reveal-delay`, which
 * is spent only on the reveal's own opacity and transform (index.css).
 */
function HighlightCard({ item, i }: { item: (typeof TIMELINE_HIGHLIGHTS)[number]; i: number }) {
  const reveal = useReveal<HTMLElement>()

  return (
    <article
      ref={reveal.ref}
      style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
      /* 500 is the Figma height. The old 360 floor was a desktop card's
         proportions on a phone — a big empty middle between two short text
         blocks; 208 is the height the phone card's own content asks for. */
      className={`relative flex min-h-[calc(208px_+_292*var(--fl))] min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-b p-[calc(20px_+_4*var(--fl))] text-white ${TONE[item.tone].card} ${reveal.cls}`}
    >
      <div className={`pointer-events-none overflow-hidden ${BOWL_BOX} ${TONE[item.tone].bowl}`}>
        <img
          src={spaghetti}
          alt=""
          aria-hidden
          className="absolute top-[-34.47%] left-[-0.01%] h-[134.47%] w-[100.01%] max-w-none"
        />
      </div>
      <div className="relative">
        <p className="fl-num-xl leading-[1.4] font-medium">{item.date}</p>
        <p className="fl-title-sm leading-[1.4] font-normal">{item.label}</p>
      </div>
      <p className="fl-lead relative flex items-center gap-3 leading-[1.5]">
        <img
          src={addToCalendar}
          alt=""
          aria-hidden
          className="size-[calc(28px_+_8*var(--fl))] shrink-0"
        />
        เพิ่มไปยังปฏิทิน
      </p>
    </article>
  )
}

/** One date card, revealing itself — same reasoning as `HighlightCard`. */
function StepDateCard({ item, i }: { item: (typeof TIMELINE_STEPS)[number]; i: number }) {
  const reveal = useReveal<HTMLElement>()

  return (
    <article
      ref={reveal.ref}
      style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
      className={`flex flex-col rounded-3xl bg-white p-[calc(20px_+_4*var(--fl))] shadow-soft ${reveal.cls}`}
    >
      <p className="fl-num-lg leading-[1.4] font-medium text-gray-2">{item.date}</p>
      <p className="fl-body leading-[1.4] font-light">
        {item.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </article>
  )
}

export default function Calendar() {
  const head = useReveal()

  return (
    // Figma: content sits 88.5 below the section top; the 451.5 tail is where the
    // garlic and fork decorations live before the next section starts.
    <section id="calendar" className="shell sec-calendar relative">
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader number="01" title="ปฏิทินการแข่งขัน" />
        </div>

        {/* highlight row + the three date cards are one 684-tall block, 24 apart */}
        <div className="flex flex-col gap-6">
          {/*
           * Two-up from `md`, not only from `lg`. Stacked at 768 these two became 712-wide
           * cards with a 316 floor — a date at the top, one line at the bottom and a third of
           * a screen of gradient between them, twice. Side by side at 768 each is 315x316, a
           * near-square that the bowl garnish fills. The 700/476 split is still Figma's, and
           * still only applies where Figma's row exists.
           */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[700fr_476fr]">
            {TIMELINE_HIGHLIGHTS.map((item, i) => (
              <HighlightCard key={item.date} item={item} i={i} />
            ))}
          </div>

          {/* three cards, so two columns leaves the third orphaned beside a half-empty row.
              One column until there is room for all three at `md`. */}
          <div className="grid gap-6 md:grid-cols-3">
            {TIMELINE_STEPS.map((item, i) => (
              <StepDateCard key={item.date} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

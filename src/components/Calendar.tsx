import SectionHeader from './SectionHeader'
import HomeDecor, { CALENDAR_DECOR } from './HomeDecor'
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
const TONE = {
  red: {
    card: 'from-red-grad-from to-red-grad-to',
    bowl: 'left-[168.51px]',
  },
  yellow: {
    card: 'from-yellow-grad-from to-yellow-grad-to',
    bowl: 'left-[-551.49px]',
  },
}

export default function Calendar() {
  const head = useReveal()
  const cards = useReveal({ group: true })
  const steps = useReveal({ group: true })

  return (
    // Figma: content sits 88.5 below the section top; the 451.5 tail is where the
    // garlic and fork decorations live before the next section starts.
    <section
      id="calendar"
      className="relative px-4 pt-20 pb-24 lg:px-15 lg:pt-[88.5px] lg:pb-[451.5px]"
    >
      {/* below every positioned layer, so the pasta and the cards both sit on top of the
          wash — the order Figma stacks them in */}
      <HomeDecor nodes={CALENDAR_DECOR} className="-z-10" />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader number="01" title="ปฏิทินการแข่งขัน" />
        </div>

        {/* highlight row + the three date cards are one 684-tall block, 24 apart */}
        <div className="flex flex-col gap-6">
          <div ref={cards.ref} className={`grid gap-6 lg:grid-cols-[700fr_476fr] ${cards.cls}`}>
            {TIMELINE_HIGHLIGHTS.map((item) => (
              <article
                key={item.date}
                className={`relative flex min-h-[360px] min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-b p-6 text-white lg:min-h-[500px] ${TONE[item.tone].card}`}
              >
                <div
                  className={`pointer-events-none absolute top-[60.8px] h-[441.197px] w-[834.211px] overflow-hidden ${TONE[item.tone].bowl}`}
                >
                  <img
                    src={spaghetti}
                    alt=""
                    aria-hidden
                    className="absolute top-[-34.47%] left-[-0.01%] h-[134.47%] w-[100.01%] max-w-none"
                  />
                </div>
                <div className="relative">
                  <p className="text-4xl leading-[1.4] font-medium lg:text-6xl">{item.date}</p>
                  <p className="text-xl leading-[1.4] font-normal lg:text-[28px]">{item.label}</p>
                </div>
                <p className="relative flex items-center gap-3 text-base leading-[1.5] lg:text-2xl">
                  <img src={addToCalendar} alt="" aria-hidden className="size-9 shrink-0" />
                  เพิ่มไปยังปฏิทิน
                </p>
              </article>
            ))}
          </div>

          <div ref={steps.ref} className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${steps.cls}`}>
            {TIMELINE_STEPS.map((item) => (
              <article
                key={item.date}
                className="flex flex-col rounded-3xl bg-white p-6 shadow-soft"
              >
                <p className="text-3xl leading-[1.4] font-medium text-gray-2 lg:text-[40px]">
                  {item.date}
                </p>
                <p className="text-lg leading-[1.4] font-light lg:text-xl">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import SectionHeader from './SectionHeader'
import { TIMELINE_HIGHLIGHTS, TIMELINE_STEPS } from '../data'
import { useReveal } from '../hooks/useReveal'

/**
 * Figma widths 700 / 476 inside the 1200 content column, kept as flex ratios.
 * `bowl` is the spaghetti illustration's left offset within each card.
 */
const TONE = {
  red: {
    card: 'from-red-grad-from to-red-grad-to lg:flex-[700]',
    bowl: 'left-[168px]',
  },
  yellow: {
    card: 'from-yellow-grad-from to-yellow-grad-to lg:flex-[476]',
    bowl: 'left-[-551px]',
  },
}

export default function Calendar() {
  const head = useReveal()
  const cards = useReveal({ group: true })
  const steps = useReveal({ group: true })

  return (
    <section id="calendar" className="relative px-4 py-20 lg:px-15 lg:py-30">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader number="01" title="ปฏิทินการแข่งขัน" />
        </div>

        <div ref={cards.ref} className={`flex flex-col gap-6 lg:flex-row ${cards.cls}`}>
          {TIMELINE_HIGHLIGHTS.map((item) => (
            <article
              key={item.date}
              className={`relative flex min-h-[360px] flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-b p-6 text-white lg:min-h-[500px] ${TONE[item.tone].card}`}
            >
              <img
                src="/assets/spaghetti.png"
                alt=""
                aria-hidden
                className={`pointer-events-none absolute top-[60px] w-[834px] max-w-none ${TONE[item.tone].bowl}`}
              />
              <div className="relative">
                <p className="text-4xl leading-[1.4] font-medium lg:text-6xl">{item.date}</p>
                <p className="text-xl leading-[1.4] font-normal lg:text-[28px]">{item.label}</p>
              </div>
              <p className="relative flex items-center gap-3 text-base leading-[1.5] lg:text-2xl">
                <img
                  src="/assets/icon-add-calendar.svg"
                  alt=""
                  aria-hidden
                  className="size-9 shrink-0"
                />
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
    </section>
  )
}

import SectionHeader from './SectionHeader'
import Decor from './Decor'
import { DOCUMENT_GROUPS, STEP_CARDS } from '../data'
import { useReveal } from '../hooks/useReveal'

/** Garlic cluster on the left, cutlery cluster on the right. */
const UTENSILS = [
  { src: '/assets/garlic.png', x: -2, y: 6, size: 300, rotate: 52 },
  { src: '/assets/garlic.png', x: 8, y: 8, size: 340, rotate: 15 },
  { src: '/assets/garlic.png', x: 14, y: 13, size: 200, rotate: 75 },
  { src: '/assets/garlic.png', x: 3, y: 16, size: 230, rotate: -16 },
  { src: '/assets/spoon.png', x: 91, y: 5, size: 185, rotate: 45 },
  { src: '/assets/spoon.png', x: 97, y: 12, size: 185, rotate: -135 },
  { src: '/assets/fork.png', x: 88, y: 10, size: 150, rotate: 0 },
  { src: '/assets/fork.png', x: 95, y: 18, size: 150, rotate: 180 },
]

export default function Steps() {
  const head = useReveal()
  const body = useReveal({ group: true })

  return (
    <section id="steps" className="relative overflow-hidden px-4 py-20 lg:px-15 lg:py-30">
      <Decor items={UTENSILS} />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader number="02" title="ขั้นตอนสมัครเข้าแข่งขัน" />
        </div>

        <div ref={body.ref} className={`flex flex-col gap-6 lg:flex-row lg:items-stretch ${body.cls}`}>
          <div className="flex flex-1 flex-col gap-6">
            {STEP_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-8 rounded-3xl bg-white p-6 shadow-soft lg:gap-15"
              >
                <img
                  src={card.image}
                  alt=""
                  aria-hidden
                  className="mx-auto h-[200px] w-auto object-contain"
                />
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-2xl leading-[1.4] font-semibold lg:text-3xl">{card.title}</h3>
                  <p className="text-lg leading-[1.5] font-light lg:text-xl">{card.body}</p>
                </div>
              </article>
            ))}
          </div>

          <article className="flex flex-1 flex-col justify-between gap-8 rounded-3xl bg-white p-6 shadow-soft lg:gap-15">
            <img
              src="/assets/step-docs.png"
              alt=""
              aria-hidden
              className="mx-auto h-[259px] w-auto object-contain"
            />
            <div className="flex flex-col gap-6">
              <h3 className="text-center text-2xl leading-[1.4] font-semibold lg:text-3xl">
                การเตรียมเอกสาร
              </h3>
              {DOCUMENT_GROUPS.map((group) => (
                <div key={group.heading} className="flex flex-col gap-4">
                  <h4 className="text-center text-xl leading-[1.5] font-medium lg:text-[22px]">
                    {group.heading}
                  </h4>
                  <ul className="ms-[30px] flex list-disc flex-col text-lg leading-[1.5] font-light lg:text-xl">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

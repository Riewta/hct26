import Decor from '../components/Decor'
import PastEventCard from '../components/PastEventCard'
import { PAST_EVENTS, PAST_INTRO } from '../pastEventsData'
import { useReveal } from '../hooks/useReveal'

/**
 * Pans cluster at the right edge and bleed off-canvas, as in Figma (x >= 1021 of 1440),
 * so they stay clear of the 1200px content column.
 */
const PANS = [
  { src: '/assets/pan.png', x: 103, y: 14, size: 400 },
  { src: '/assets/pan.png', x: 114, y: 6, size: 300, rotate: -18 },
  { src: '/assets/pan.png', x: 112, y: 30, size: 380, rotate: 24 },
  { src: '/assets/pan.png', x: 104, y: 52, size: 400, rotate: -8 },
  { src: '/assets/pan.png', x: 115, y: 68, size: 280, rotate: 32 },
  { src: '/assets/pan.png', x: 100, y: 40, size: 340, rotate: 12 },
]

export default function PastEvents() {
  const intro = useReveal({ threshold: 0 })
  const title = useReveal()
  const cards = useReveal({ group: true })

  return (
    <>
      <section id="hall-of-fame" className="relative overflow-hidden px-4 pt-40 pb-20 lg:px-15 lg:pt-45 lg:pb-30">
        <Decor items={PANS} className="hidden lg:block" />

        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="flex w-full max-w-[727px] flex-col items-start gap-2">
            <img
              src="/assets/logo-bangmod.svg"
              alt="BangMod"
              className="w-full max-w-[560px] md:max-w-none"
            />
            <img
              src="/assets/logo-hackathon.svg"
              alt="Hackathon"
              className="w-[96%] max-w-[540px] md:max-w-none"
            />
          </div>

          <div ref={intro.ref} className={`flex flex-col gap-6 ${intro.cls}`}>
            <h1 className="text-2xl leading-[1.4] font-medium lg:text-3xl">{PAST_INTRO.title}</h1>
            {PAST_INTRO.paragraphs.map((p) => (
              <p key={p} className="text-base leading-[1.5] font-light lg:text-2xl">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="relative overflow-hidden px-4 pb-20 lg:px-15 lg:pb-30">
        <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10">
          <h2 ref={title.ref} className={`text-3xl leading-[1.4] font-semibold lg:text-5xl ${title.cls}`}>
            หอเกียรติยศ
          </h2>
          <div ref={cards.ref} className={`flex flex-col gap-10 ${cards.cls}`}>
            {PAST_EVENTS.map((event) => (
              <PastEventCard key={event.title} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* mascot sits between the timeline and the footer */}
      <div aria-hidden className="pointer-events-none flex justify-center overflow-hidden">
        <img src="/assets/mascot.png" alt="" className="w-[420px] max-w-full lg:w-[700px]" />
      </div>
    </>
  )
}

import PastEventCard from '../components/PastEventCard'
import { HallOfFameHeroDecor, HallOfFameWaveBand } from '../components/HallOfFameDecor'
import { PAST_EVENTS, PAST_INTRO } from '../pastEventsData'
import { useReveal } from '../hooks/useReveal'

const BANGMOD = '/assets/figma/9813e3e647c50b42236b9552d81e1c94b33bbd46.svg'
const HACKATHON = '/assets/figma/628b94789720739e321ffa2f1ddb012f10b9f1ee.svg'

export default function PastEvents() {
  const intro = useReveal({ threshold: 0 })
  const title = useReveal()
  const cards = useReveal({ group: true })

  return (
    <>
      {/*
       * No `overflow-hidden` here on purpose: the warm circle behind the hero is a 400px
       * blur that reaches well past the section, and clipping it shows the fade as a seam.
       * Sideways bleed is already clipped on <html>.
       */}
      <section
        id="hall-of-fame"
        className="relative px-4 pt-40 pb-20 lg:px-15 lg:pt-[286.6px] lg:pb-[149.6px]"
      >
        <HallOfFameHeroDecor />

        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10 lg:gap-20">
          {/*
           * Figma stacks the two wordmarks inside a 727.492x306.895 box: "Hackathon" is
           * 96.484% as wide, indented 1.836%, and rides up into "BangMod"'s descenders.
           */}
          <div className="relative aspect-[727.492/306.895] w-full max-w-[727.492px]">
            <img
              src={BANGMOD}
              alt="BangMod"
              className="absolute top-0 left-0 h-[65.499%] w-full max-w-none"
            />
            <img
              src={HACKATHON}
              alt="Hackathon"
              className="absolute top-[53.263%] left-[1.836%] h-[46.737%] w-[96.484%] max-w-none"
            />
          </div>

          <div ref={intro.ref} className={`flex flex-col gap-6 ${intro.cls}`}>
            <h1 className="text-2xl leading-[1.4] font-medium lg:text-3xl">{PAST_INTRO.title}</h1>
            {PAST_INTRO.paragraphs.map((p) => (
              <p
                key={p}
                className="text-base leading-[1.5] font-light whitespace-pre-wrap lg:text-2xl"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Figma: 40 between the title and each 1200x800 card, then straight into the waves */}
      <section id="timeline" className="relative px-4 pb-16 lg:px-15 lg:pb-0">
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <h2
            ref={title.ref}
            className={`text-3xl leading-[1.4] font-semibold lg:text-5xl ${title.cls}`}
          >
            หอเกียรติยศ
          </h2>
          <div ref={cards.ref} className={`flex flex-col gap-10 ${cards.cls}`}>
            {PAST_EVENTS.map((event) => (
              <PastEventCard key={event.title} event={event} />
            ))}
          </div>
        </div>
      </section>

      <HallOfFameWaveBand />
    </>
  )
}

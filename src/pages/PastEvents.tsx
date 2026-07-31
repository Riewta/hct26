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
      <section id="hall-of-fame" className="shell sec-hall-hero relative">
        <HallOfFameHeroDecor />

        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-[calc(40px_+_40*var(--fl))]">
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
            {/* the page's own h1 — it was set a rank BELOW the "หอเกียรติยศ" h2 below it,
                so the hierarchy read upside down at every width */}
            <h1 className="fl-display leading-[1.4] font-medium">{PAST_INTRO.title}</h1>
            {PAST_INTRO.paragraphs.map((p) => (
              <p key={p} className="fl-lead leading-[1.5] font-light whitespace-pre-wrap">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Figma: 40 between the title and each 1200x800 card, then straight into the waves */}
      <section id="timeline" className="shell sec-hall-timeline relative">
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-[calc(24px_+_16*var(--fl))]">
          <h2 ref={title.ref} className={`fl-section leading-[1.4] font-semibold ${title.cls}`}>
            หอเกียรติยศ
          </h2>
          <div
            ref={cards.ref}
            className={`flex flex-col gap-[calc(24px_+_16*var(--fl))] ${cards.cls}`}
          >
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

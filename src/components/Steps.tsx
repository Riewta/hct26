import SectionHeader from './SectionHeader'
import HomeDecor, { STEPS_DECOR, STEPS_OVERLAY } from './HomeDecor'
import { DOCUMENT_GROUPS, STEP_CARDS } from '../data'
import { useReveal } from '../hooks/useReveal'

const teamPhoto = '/assets/figma/522303cab6b008daf26c3f0e8e3f2ec214a0c0cf.png'
const advisorPhoto = '/assets/figma/2a36441d02ccfe195207a9ad27345494771cc3b6.png'
const documentsPhoto = '/assets/figma/09f5ceefe923ad7cfc2733544959a0be9389fc6d.png'

/**
 * Each card's illustration is a fixed 540-wide plate with its photos pinned in px.
 * Keeping the plate's aspect ratio and pinning in percentages means the arrangement
 * scales as one below 1440 instead of the photos sliding out of the card.
 */
function pinner(cw: number, ch: number) {
  return (x: number, y: number, w: number, h: number) => ({
    left: `${(x / cw) * 100}%`,
    top: `${(y / ch) * 100}%`,
    width: `${(w / cw) * 100}%`,
    height: `${(h / ch) * 100}%`,
  })
}

const pinIllustration = pinner(540, 200)

/**
 * Three student photos fanned out. Figma paints the upright centre one first, so the two
 * tilted ones overlap it rather than the other way round.
 */
const TEAM_PHOTOS = [
  { box: pinIllustration(158, 0, 224, 196), rotate: 0 },
  { box: pinIllustration(80, 60, 156, 136), rotate: -27.38 },
  { box: pinIllustration(304, 60, 156, 136), rotate: 26.89 },
]

const ADVISOR_PHOTO = pinIllustration(172, 4, 196, 196)
const DOCUMENTS_PHOTO = pinner(540, 290)(140, 31, 259, 259)

/** One illustration plate per step card, in the order Figma stacks them. */
const ILLUSTRATIONS = [
  <div className="relative mx-auto aspect-[540/200] w-full max-w-[540px]">
    {TEAM_PHOTOS.map((photo, i) => (
      <img
        key={i}
        src={teamPhoto}
        alt=""
        aria-hidden
        className="absolute object-cover"
        style={{ ...photo.box, transform: `rotate(${photo.rotate}deg)` }}
      />
    ))}
  </div>,
  <div className="relative mx-auto aspect-[540/200] w-full max-w-[540px]">
    <img
      src={advisorPhoto}
      alt=""
      aria-hidden
      className="absolute object-cover"
      style={ADVISOR_PHOTO}
    />
  </div>,
]

/** Figma gives these cards a 20px shadow — softer than the 40px `shadow-soft` elsewhere. */
const CARD = 'rounded-3xl bg-white p-6 shadow-soft'

const [ENTRANT_DOCS, ADVISOR_DOCS] = DOCUMENT_GROUPS

function DocGroup({ heading, items }: (typeof DOCUMENT_GROUPS)[number]) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-center text-xl leading-[1.5] font-medium lg:text-[22px]">{heading}</h4>
      <ul className="ms-[30px] flex list-disc flex-col text-lg leading-[1.5] font-light lg:text-xl">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Steps() {
  const head = useReveal()
  const body = useReveal({ group: true })

  return (
    // Figma: the header sits flush at the section top — the run-up above it belongs to
    // the calendar's tail. 109 of tail here carries the row into the red prize band.
    <section id="steps" className="relative px-4 pt-20 pb-24 lg:px-15 lg:pt-0 lg:pb-[109px]">
      {/* the wash belongs under every other layer — see Calendar */}
      <HomeDecor nodes={STEPS_DECOR} variant="wash" className="-z-10" />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader number="02" title="ขั้นตอนสมัครเข้าแข่งขัน" />
        </div>

        {/* Figma splits the row 588 / 588 inside the 1200 column, 936 tall */}
        <div
          ref={body.ref}
          className={`grid items-stretch gap-6 md:grid-cols-2 lg:min-h-[936px] ${body.cls}`}
        >
          <div className="flex min-w-0 flex-col justify-center gap-6">
            {STEP_CARDS.map((card, i) => (
              <article key={card.title} className={`flex flex-col gap-8 lg:gap-15 ${CARD}`}>
                {ILLUSTRATIONS[i]}
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-2xl leading-[1.4] font-semibold lg:text-3xl">{card.title}</h3>
                  <p className="text-lg leading-[1.5] font-light lg:text-xl">{card.body}</p>
                </div>
              </article>
            ))}
          </div>

          <article className={`flex min-w-0 flex-col justify-between gap-8 lg:gap-15 ${CARD}`}>
            <div className="relative mx-auto aspect-[540/290] w-full max-w-[540px]">
              <img
                src={documentsPhoto}
                alt=""
                aria-hidden
                className="absolute object-cover"
                style={DOCUMENTS_PHOTO}
              />
            </div>
            {/* the entrant list belongs to the heading — only the advisor block is 24 away */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-center text-2xl leading-[1.4] font-semibold lg:text-3xl">
                  การเตรียมเอกสาร
                </h3>
                <DocGroup {...ENTRANT_DOCS} />
              </div>
              <DocGroup {...ADVISOR_DOCS} />
            </div>
          </article>
        </div>
      </div>

      {/* Figma stacks these over the cards, not behind them */}
      <HomeDecor nodes={STEPS_OVERLAY} className="z-20" />
    </section>
  )
}

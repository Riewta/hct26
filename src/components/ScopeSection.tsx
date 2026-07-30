import ScopeCardArt from './ScopeCardArt'
import { SCOPE_CARDS, SCOPE_INTRO } from '../aboutData'
import { useReveal } from '../hooks/useReveal'

/**
 * Figma node 708:478 "Section / Coding Platform" — page y 139, 1024 tall, 120 side
 * padding, content inset 80 from the section top. The pads below resolve to the page
 * offsets Figma gives the next section: 139 + 80 in, 197 out.
 */
export default function ScopeSection() {
  const head = useReveal()
  const cards = useReveal({ group: true })

  return (
    <section
      id="scope"
      className="relative px-4 pt-40 pb-20 lg:px-[120px] lg:pt-[219px] lg:pb-[197px]"
    >
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={`flex flex-col gap-3 lg:gap-5 ${head.cls}`}>
          <p className="text-lg leading-[1.5] font-medium text-brand-yellow lg:text-2xl">01</p>
          {/* the pill is centred against the title + intro pair, not against the row's top */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
            <div className="flex flex-col gap-2 lg:flex-1 lg:gap-1">
              <h2 className="text-3xl leading-[1.4] font-semibold lg:text-5xl">ขอบเขตเนื้อหา</h2>
              <p className="text-base leading-[1.5] font-light lg:text-2xl">{SCOPE_INTRO}</p>
            </div>
            <a
              href="#"
              className="mm-press flex shrink-0 items-center gap-5 self-start rounded-[100px] bg-brand-red py-4 pr-9 pl-6 text-white transition-opacity hover:opacity-90 lg:self-auto"
            >
              {/* a download arrow leans the way it points on hover */}
              <span className="mm-arrow-down relative block size-[34px] shrink-0">
                <img
                  src="/assets/figma/115b31f82f018f10c7430912ba6f548f7d8eab15.svg"
                  alt=""
                  aria-hidden
                  className="absolute inset-[12.54%_22.35%_14.08%_22.33%] max-w-none"
                />
              </span>
              <span className="text-lg leading-[1.4] font-bold whitespace-nowrap lg:text-2xl">
                ดาวน์โหลดฉบับเต็ม (PDF)
              </span>
            </a>
          </div>
        </div>

        <div ref={cards.ref} className={`grid gap-10 md:grid-cols-2 lg:grid-cols-3 ${cards.cls}`}>
          {SCOPE_CARDS.map((card) => (
            <article
              key={card.title}
              /* these carry a "go" arrow in their footer, so they read as reachable —
                 the lift is what confirms it before anything is wired up */
              className="mm-lift relative overflow-hidden rounded-2xl bg-white shadow-soft lg:h-[451px]"
            >
              <ScopeCardArt items={card.art} outlines={card.outlines} />
              {/* Figma reserves 201 above the folder for the topic's doodle band */}
              <div aria-hidden className="h-[201px]" />
              <div
                className="relative flex flex-col justify-between gap-6 p-5 text-white"
                style={{ minHeight: card.folderHeight }}
              >
                {/* the folder silhouette carries the card's colour; stretched so the panel
                    can still grow past 250 when the copy wraps on a narrow screen */}
                <img
                  src={card.folder}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 size-full max-w-none"
                />
                <div className="relative flex flex-col gap-1">
                  <h3 className="text-2xl leading-[1.4] font-medium lg:text-[28px]">
                    {card.title}
                  </h3>
                  <p className="text-lg leading-[1.4] font-light lg:text-xl">{card.body}</p>
                </div>
                <p className="relative flex items-center gap-3">
                  <span className="text-2xl leading-[1.4] lg:text-3xl">{card.count}</span>
                  <span className="flex-1 text-lg leading-[1.4] lg:text-xl">หัวข้อ</span>
                  <img
                    src="/assets/figma/7a9a840bc86f022af7d9842b56f91f168bd06a03.svg"
                    alt=""
                    aria-hidden
                    className="size-6"
                  />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

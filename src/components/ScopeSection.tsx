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
    <section id="scope" className="shell sec-scope relative">
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={`flex flex-col gap-[calc(12px_+_8*var(--fl))] ${head.cls}`}>
          <p className="fl-eyebrow leading-[1.5] font-medium text-brand-yellow">01</p>
          {/* the pill is centred against the title + intro pair, not against the row's top */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
            <div className="flex flex-col gap-[calc(8px_-_4*var(--fl))] lg:flex-1">
              <h2 className="fl-section leading-[1.4] font-semibold">ขอบเขตเนื้อหา</h2>
              <p className="fl-lead leading-[1.5] font-light">{SCOPE_INTRO}</p>
            </div>
            <a
              href="#"
              className="mm-press flex shrink-0 items-center gap-[calc(12px_+_8*var(--fl))] self-start rounded-[100px] bg-brand-red py-[calc(12px_+_4*var(--fl))] pr-[calc(24px_+_12*var(--fl))] pl-[calc(16px_+_8*var(--fl))] text-white transition-opacity hover:opacity-90 lg:self-auto"
            >
              {/* a download arrow leans the way it points on hover */}
              <span className="mm-arrow-down relative block size-[calc(26px_+_8*var(--fl))] shrink-0">
                <img
                  src="/assets/figma/115b31f82f018f10c7430912ba6f548f7d8eab15.svg"
                  alt=""
                  aria-hidden
                  className="absolute inset-[12.54%_22.35%_14.08%_22.33%] max-w-none"
                />
              </span>
              <span className="fl-body leading-[1.4] font-bold whitespace-nowrap">
                ดาวน์โหลดฉบับเต็ม (PDF)
              </span>
            </a>
          </div>
        </div>

        <div
          ref={cards.ref}
          className={`grid gap-[calc(24px_+_16*var(--fl))] md:grid-cols-2 lg:grid-cols-3 ${cards.cls}`}
        >
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
                  <h3 className="fl-title-sm leading-[1.4] font-medium">{card.title}</h3>
                  <p className="fl-body leading-[1.4] font-light">{card.body}</p>
                </div>
                <p className="relative flex items-center gap-3">
                  <span className="fl-title leading-[1.4]">{card.count}</span>
                  <span className="fl-caption flex-1 leading-[1.4]">หัวข้อ</span>
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

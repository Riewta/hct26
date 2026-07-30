import SectionHeader from './SectionHeader'
import { SCOPE_CARDS, SCOPE_INTRO } from '../aboutData'
import { useReveal } from '../hooks/useReveal'

export default function ScopeSection() {
  const head = useReveal()
  const cards = useReveal({ group: true })

  return (
    <section id="scope" className="relative px-4 pt-40 pb-20 lg:px-15 lg:pt-45 lg:pb-30">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${head.cls}`}>
          <div className="lg:max-w-[826px]">
            <SectionHeader number="01" title="ขอบเขตเนื้อหา" description={SCOPE_INTRO} />
          </div>
          <a
            href="#"
            className="flex shrink-0 items-center gap-5 self-start rounded-[100px] border border-ink px-6 py-4 text-lg leading-[1.4] font-medium transition-colors hover:bg-ink hover:text-white lg:self-end"
          >
            <img src="/assets/icon-arrow-down.svg" alt="" aria-hidden className="size-[34px]" />
            ดาวน์โหลดฉบับเต็ม (PDF)
          </a>
        </div>

        <div ref={cards.ref} className={`grid gap-10 md:grid-cols-2 lg:grid-cols-3 ${cards.cls}`}>
          {SCOPE_CARDS.map((card) => (
            <article
              key={card.title}
              /* the folder silhouette carries the card's fill colour; stretched as a
                 background so the card grows with the copy instead of clipping it */
              className="flex min-h-[250px] flex-col justify-between gap-6 bg-[length:100%_100%] bg-no-repeat p-5 text-white"
              style={{ backgroundImage: `url(${card.folder})` }}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl leading-[1.4] font-medium lg:text-[28px]">{card.title}</h3>
                <p className="text-lg leading-[1.4] font-light lg:text-xl">{card.body}</p>
              </div>
              <p className="flex items-center gap-3">
                <span className="text-2xl leading-[1.4] lg:text-3xl">{card.count}</span>
                <span className="flex-1 text-lg leading-[1.4] lg:text-xl">หัวข้อ</span>
                <img src="/assets/icon-arrow-right.svg" alt="" aria-hidden className="size-6" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

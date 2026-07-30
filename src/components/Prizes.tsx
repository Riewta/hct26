import SectionHeader from './SectionHeader'
import Decor from './Decor'
import { PRIZES } from '../data'
import { useReveal } from '../hooks/useReveal'

const CHEESE = [
  { src: '/assets/cheese-b.png', x: 86, y: 86, size: 420 },
  { src: '/assets/cheese-b.png', x: 74, y: 94, size: 340 },
  { src: '/assets/cheese-a.png', x: 96, y: 78, size: 360, rotate: 27 },
  { src: '/assets/cheese-b.png', x: 92, y: 98, size: 260, rotate: 27 },
]

export default function Prizes() {
  const head = useReveal()
  const grid = useReveal({ group: true })

  return (
    <section id="prizes" className="relative overflow-hidden bg-brand-red px-4 py-20 lg:px-15 lg:py-30">
      {/* "Vector Shape": the wave that caps the red band */}
      <img
        src="/assets/prize-wave.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-px left-1/2 w-[2214px] max-w-none -translate-x-1/2"
      />

      <Decor items={CHEESE} />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={head.cls}>
        <SectionHeader
          light
          number="03"
          title="รางวัลของการแข่งขัน"
          description="ทีมที่ได้รับรางวัลที่ 1-3 ในการแข่งขันจะมีสิทธิได้รับการพิจารณาสอบสัมภาษณ์ในภาควิชาที่กำหนดของคณะวิศวกรรมศาสตร์"
        />
        </div>

        <div ref={grid.ref} className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-4 ${grid.cls}`}>
          {PRIZES.map((prize) => (
            <article key={prize.title} className="flex flex-col gap-6 lg:gap-10">
              <div className="aspect-square rounded-xl bg-white" />
              <div className="flex flex-col gap-4 text-white">
                <h3 className="text-2xl leading-[1.4] font-medium lg:text-3xl">{prize.title}</h3>
                <p className="text-lg leading-[1.5] font-light lg:text-2xl">{prize.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

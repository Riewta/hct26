import Decor from './Decor'
import { CONTACT } from '../aboutData'
import { useReveal } from '../hooks/useReveal'

const FOOD = [
  { src: '/assets/about-tomato.png', x: 8, y: 88, size: 420, rotate: -8 },
  { src: '/assets/about-tomato.png', x: 30, y: 96, size: 300, rotate: 14 },
  { src: '/assets/about-pot.png', x: 88, y: 90, size: 430, rotate: 0 },
  { src: '/assets/about-garlic.png', x: 96, y: 78, size: 300, rotate: 12 },
]

export default function ContactSection() {
  const head = useReveal()
  const channels = useReveal({ group: true })
  const map = useReveal()

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 lg:px-15 lg:py-30">
      <Decor items={FOOD} />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
        <div ref={head.ref} className={`flex flex-col gap-5 ${head.cls}`}>
          <p className="text-lg leading-[1.5] font-medium text-brand-yellow lg:text-2xl">04</p>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl leading-[1.4] font-semibold lg:text-5xl">{CONTACT.title}</h2>
            <p className="text-base leading-[1.5] font-light lg:text-2xl">
              {CONTACT.description}
            </p>
          </div>
        </div>

        <div ref={channels.ref} className={`grid gap-10 md:grid-cols-2 ${channels.cls}`}>
          {CONTACT.channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              <img src={channel.icon} alt="" aria-hidden className="size-13 shrink-0" />
              <span className="text-2xl leading-[1.4] font-medium lg:text-3xl">
                {channel.label}
              </span>
            </a>
          ))}
        </div>

        <div ref={map.ref} className={`overflow-hidden rounded-3xl bg-white shadow-soft ${map.cls}`}>
          <img
            src="/assets/about-map.jpg"
            alt="แผนที่ที่ตั้งภาควิชาวิศวกรรมคอมพิวเตอร์ มจธ."
            className="aspect-[2/1] w-full object-cover"
          />
          <div className="flex items-center gap-4 p-6 lg:gap-9 lg:p-10">
            <img
              src="/assets/icon-location.svg"
              alt=""
              aria-hidden
              className="size-14 shrink-0"
            />
            <div className="flex flex-col gap-2">
              <p className="text-2xl leading-[1.4] font-medium lg:text-3xl">{CONTACT.place}</p>
              <p className="text-base leading-[1.5] font-light lg:text-2xl">{CONTACT.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

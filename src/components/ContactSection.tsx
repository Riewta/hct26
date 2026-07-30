import ScrollEdgeEffect from './ScrollEdgeEffect'
import SectionHeader from './SectionHeader'
import { CONTACT } from '../aboutData'
import { useReveal } from '../hooks/useReveal'

const A = '/assets/figma/'

/**
 * Both social glyphs are multi-layer Figma components, so each layer keeps the inset
 * Figma gives it inside a fixed box rather than being flattened into one file.
 */
const CHANNELS = [
  {
    label: 'BangMod Hackathon',
    href: '#',
    /** the badge fills its 80 box down to the 14 padding */
    size: 52,
    layers: [
      { src: `${A}511e988ab2a468e6fa802c0f8d0d9143f652e6d9.svg`, inset: '0 0 0.37% 0' },
      { src: `${A}e093d005737ba6080ea1ab54fad5a8e3e034d839.svg`, inset: '18.51% 26.8% 0 27.61%' },
    ],
  },
  {
    label: 'bangmodhack.kmutt',
    href: '#',
    size: 48,
    layers: [
      { src: `${A}02ba547447d5d88ca1fc4cd6046c9cad48297c45.svg`, inset: '0 0.06% 0.02% 0' },
      { src: `${A}bc01640f62f5ba96f4759e7650ca010ce85028e6.svg`, inset: '24.32%' },
      {
        src: `${A}f69c5d76e20f72bb57c5d611c23783503d4540b4.svg`,
        inset: '17.3% 17.3% 70.7% 70.7%',
      },
    ],
  },
]

/**
 * Figma node 708:444 "Section / Hero Banner" — page y 3539, 1024 tall, 120 side padding,
 * its 923-tall content vertically centred (hence 50.5 top). The trailing pad is that
 * 50.5 plus the 325 Figma leaves before the footer at page y 4888.
 */
export default function ContactSection() {
  const head = useReveal()
  const channels = useReveal({ group: true })
  const map = useReveal()

  return (
    <section
      id="contact"
      className="relative px-4 py-20 lg:px-[120px] lg:pt-[203.5px] lg:pb-[375.5px]"
    >
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10 overflow-hidden rounded-3xl">
        <div ref={head.ref} className={head.cls}>
          <SectionHeader number="04" title={CONTACT.title} description={CONTACT.description} />
        </div>

        <div ref={channels.ref} className={`grid gap-10 md:grid-cols-2 ${channels.cls}`}>
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              {/* Figma pads each glyph inside an 80 box, so the label always lands at 96 */}
              <span className="flex size-16 shrink-0 items-center justify-center rounded-xl lg:size-20">
                <span
                  className="relative block shrink-0"
                  style={{ width: channel.size, height: channel.size }}
                >
                  {channel.layers.map((layer) => (
                    <img
                      key={layer.src}
                      src={layer.src}
                      alt=""
                      aria-hidden
                      className="absolute max-w-none"
                      style={{ inset: layer.inset }}
                    />
                  ))}
                </span>
              </span>
              <span className="text-2xl leading-[1.4] font-medium lg:text-3xl">
                {channel.label}
              </span>
            </a>
          ))}
        </div>

        {/*
         * Figma lays the address over the bottom of the map rather than under it, on a
         * 344-tall dark progressive blur — which is why the copy there is white. Below lg
         * the overlay would crowd the map, so there it stacks underneath on the ink plate.
         */}
        <div ref={map.ref} className={`relative ${map.cls}`}>
          <div className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[420px] lg:h-[600px]">
            <img
              src={`${A}86eccf9a63e4eae8dfc182a99fd6df1e5dd1304b.png`}
              alt="แผนที่ที่ตั้งภาควิชาวิศวกรรมคอมพิวเตอร์ มจธ."
              className="absolute top-[-30.29%] left-[-14.86%] h-[168.63%] w-[129.72%] max-w-none"
            />
            <ScrollEdgeEffect
              tone="dark"
              flip
              maskAlpha={0.9}
              className="absolute inset-x-0 bottom-0 h-[344px] rounded-b-3xl"
            />
          </div>

          <div className="flex items-center gap-4 bg-ink/90 p-6 text-white lg:absolute lg:inset-x-0 lg:-bottom-[0.5px] lg:bg-transparent lg:p-10">
            {/* Figma pads the pin to 56 inside an 80 box, then insets the vector again */}
            <span className="flex size-16 shrink-0 items-center justify-center rounded-xl lg:size-20">
              <span className="relative block size-14">
                <img
                  src={`${A}1729b3bffbd91e5facf50704cb0d869d52659e47.svg`}
                  alt=""
                  aria-hidden
                  className="absolute inset-[8.39%_12.59%_7.69%_12.6%] max-w-none"
                />
              </span>
            </span>
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="text-2xl leading-[1.4] font-medium lg:text-3xl">{CONTACT.place}</p>
              <p className="text-base leading-[1.5] font-light lg:text-2xl">{CONTACT.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

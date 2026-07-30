import { Link } from 'react-router-dom'
import Decor from './Decor'
import { HERO_LINES } from '../data'
import { useReveal } from '../hooks/useReveal'

/**
 * Farfalle and loose spaghetti strands crowd the top corners; rigatoni scatter at
 * the bottom left and pile up bottom right. Sizes are px on Figma's 1440 canvas —
 * `Decor` scales them with the viewport.
 */
const PASTA = [
  // top left cluster — overlapping, bleeding off both edges
  { src: '/assets/hero-farfalle.png', x: -1, y: 2, size: 215, rotate: -14 },
  { src: '/assets/hero-farfalle.png', x: 8, y: 6, size: 180, rotate: 34 },
  { src: '/assets/hero-farfalle.png', x: 2, y: 12, size: 190, rotate: -46 },
  { src: '/assets/hero-farfalle.png', x: 12, y: 13, size: 145, rotate: 62 },
  { src: '/assets/hero-spaghetti.png', x: 9, y: 2, size: 230, rotate: 16 },
  { src: '/assets/hero-spaghetti.png', x: 3, y: 9, size: 195, rotate: -28 },

  // top right cluster
  { src: '/assets/hero-farfalle.png', x: 101, y: 2, size: 215, rotate: 18 },
  { src: '/assets/hero-farfalle.png', x: 92, y: 6, size: 180, rotate: -34 },
  { src: '/assets/hero-farfalle.png', x: 98, y: 12, size: 190, rotate: 48 },
  { src: '/assets/hero-farfalle.png', x: 88, y: 13, size: 145, rotate: -62 },
  { src: '/assets/hero-spaghetti.png', x: 91, y: 2, size: 230, rotate: -16 },
  { src: '/assets/hero-spaghetti.png', x: 97, y: 9, size: 195, rotate: 28 },

  // bottom left scatter
  { src: '/assets/hero-pasta.png', x: 2, y: 87, size: 140, rotate: 18 },
  { src: '/assets/hero-pasta.png', x: 10, y: 92, size: 128, rotate: -34 },
  { src: '/assets/hero-pasta.png', x: 6, y: 98, size: 135, rotate: 62 },
  { src: '/assets/hero-pasta.png', x: 15, y: 97, size: 112, rotate: 6 },

  // bottom right heap — one stray tube, then a dense overlapping pile in the corner
  { src: '/assets/hero-pasta.png', x: 45, y: 97, size: 112, rotate: 22 },
  { src: '/assets/hero-pasta.png', x: 77, y: 93, size: 148, rotate: -18 },
  { src: '/assets/hero-pasta.png', x: 83, y: 100, size: 156, rotate: 44 },
  { src: '/assets/hero-pasta.png', x: 88, y: 90, size: 140, rotate: -8 },
  { src: '/assets/hero-pasta.png', x: 93, y: 98, size: 168, rotate: 30 },
  { src: '/assets/hero-pasta.png', x: 97, y: 89, size: 152, rotate: -40 },
  { src: '/assets/hero-pasta.png', x: 102, y: 97, size: 172, rotate: 12 },
  { src: '/assets/hero-pasta.png', x: 99, y: 82, size: 128, rotate: 68 },
  { src: '/assets/hero-pasta.png', x: 105, y: 88, size: 148, rotate: -26 },
]

/**
 * "2026" — the two digits and the six are painted shapes, the zero is the tomato
 * mascot. Percentages come from the Figma group (789x331 at x325,y273 of 1440).
 */
const DIGITS = [
  { src: '/assets/hero-shape-1.png', left: 0, top: 10.57, width: 29.66, alt: '2' },
  { src: '/assets/hero-shape-1.png', left: 45.88, top: 10.88, width: 30.93, alt: '2' },
  { src: '/assets/hero-shape-2.png', left: 66.29, top: 10.57, width: 33.71, alt: '6' },
]

export default function Hero() {
  const content = useReveal({ group: true, threshold: 0 })

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pt-36 pb-44 lg:px-15 lg:pt-44 lg:pb-56"
    >
      <Decor items={PASTA} />

      <div
        ref={content.ref}
        className={`relative z-10 mx-auto flex max-w-[812px] flex-col items-center gap-8 text-center ${content.cls}`}
      >
        <img
          src="/assets/hero-logo.svg"
          alt="BangMod Hackathon"
          className="w-full max-w-[812px]"
        />

        {/* the numeral group is a touch narrower than the wordmark, as in the design */}
        <div className="relative w-[88%] pb-[37.9%]" aria-label="2026" role="img">
          {DIGITS.map((digit, i) => (
            <img
              key={i}
              src={digit.src}
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: `${digit.left}%`, top: `${digit.top}%`, width: `${digit.width}%` }}
            />
          ))}
          {/* the mascot is the zero, and sits above the painted digits */}
          <img
            src="/assets/hero-tomato.svg"
            alt=""
            aria-hidden
            className="absolute top-0 left-[18%] w-[38.15%]"
          />
        </div>

        <p className="max-w-[954px] text-base leading-[1.5] font-light lg:text-2xl">
          {HERO_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <Link
          to="/signin"
          className="group flex items-center gap-5 rounded-[100px] bg-brand-red py-4 pr-6 pl-10 text-lg leading-[1.4] font-bold text-white transition-opacity hover:opacity-90 lg:text-2xl"
        >
          ลงทะเบียนเข้าร่วมการแข่งขัน
          <img
            src="/assets/icon-arrow-up-right.svg"
            alt=""
            aria-hidden
            className="size-[34px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </section>
  )
}

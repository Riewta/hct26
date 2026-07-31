import { HeroMobileDecor } from './HomeBackground'
import LiquidButton from './LiquidButton'
import { HERO_LINES } from '../data'
import { useReveal } from '../hooks/useReveal'

/** Two sprite sheets carry the painted numerals; the crop is the window onto one glyph. */
const numeralSheetA = '/assets/figma/1a10c1c22ef3d1ad003f314d85371c4e760a81c0.png'
const numeralSheetB = '/assets/figma/b80b22794b5b6c70a2680115baf73c7fb562b5a7.png'
const tomatoBack = '/assets/figma/c7b7aa1d816dda642ee7de69ea23e875ee541092.svg'
const tomatoFront = '/assets/figma/81a21a35c9efb8c6f5073ba1753e4d8cf1cf97c7.svg'
const bangmodWordmark = '/assets/figma/90da592b9af22f24d0b18b96a32980229697e1d4.svg'
const hackathonWordmark = '/assets/figma/6c759fcf4fc64ea0cc744ae5ae9561fb696786b3.svg'
const arrowUpRight = '/assets/figma/36e6beb58fc37672896d6a8fe3655bddf9e50622.svg'

/* Figma's hero group is one 810.508 x 421 box with every piece pinned in px inside it.
 * Re-expressing those px as percentages of the box is what lets the whole masthead —
 * wordmark, numerals and tomatoes together — scale as a single unit on narrow screens. */
const GROUP_W = 810.508
const GROUP_H = 421

function pin(x: number, y: number, w: number, h: number) {
  return {
    left: `${(x / GROUP_W) * 100}%`,
    top: `${(y / GROUP_H) * 100}%`,
    width: `${(w / GROUP_W) * 100}%`,
    height: `${(h / GROUP_H) * 100}%`,
  }
}

/** "2 0 2 6" — the 2s share one sprite window, the 6 comes off the second sheet. */
const NUMERALS = [
  { box: pin(7, 125, 234, 283), src: numeralSheetA, crop: '323.4% 150.87% 0% -27.75%' },
  { box: pin(369, 126, 244, 295), src: numeralSheetA, crop: '323.4% 150.87% 0% -27.75%' },
  { box: pin(530, 125, 266, 296), src: numeralSheetB, crop: '297.12% 150.51% -197.12% -30.11%' },
]

/**
 * The zero is the tomato mascot, drawn twice in Figma — a slightly larger copy behind a
 * slightly smaller one. Both are flipped (rotate 180 then mirrored) and inset inside
 * their clip box, so the leaves crop against the wordmark above.
 */
const TOMATOES = [
  { box: pin(152, 93, 295, 313), src: tomatoBack },
  { box: pin(149, 90, 301, 320), src: tomatoFront },
]

function Numeral({ box, src, crop }: (typeof NUMERALS)[number]) {
  const [width, height, left, top] = crop.split(' ')

  return (
    <div className="absolute overflow-hidden" style={box}>
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute max-w-none"
        style={{ width, height, left, top }}
      />
    </div>
  )
}

export default function Hero() {
  const content = useReveal({ group: true, threshold: 0 })

  return (
    // Figma runs the pasta past every edge of the masthead, so this section must not clip;
    // the 379 tail below the CTA is the run-up to the calendar section.
    // The two-step lg: sizes are gone: `hero-*` in styles/liquid.css interpolates the
    // padding, type and CTA between a 375 floor and the exact Figma values at 1440.
    <section id="hero" className="hero-pad relative">
      {/* Narrow viewports only — the 1440 canvas is hidden there. See HomeBackground. */}
      <HeroMobileDecor />

      <div
        ref={content.ref}
        className={`relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center ${content.cls}`}
      >
        <div className="relative aspect-[810.508/421] w-full max-w-[810.508px]">
          {NUMERALS.map((numeral, i) => (
            <Numeral key={i} {...numeral} />
          ))}

          {TOMATOES.map((tomato, i) => (
            <div key={i} className="absolute overflow-hidden" style={tomato.box}>
              <div className="absolute inset-[3.85%_2.61%_3.86%_2.6%] -scale-y-100">
                <img src={tomato.src} alt="" aria-hidden className="size-full" />
              </div>
            </div>
          ))}

          {/* the wordmark paints over the numerals — the tomato stalk crops against it */}
          <div className="absolute top-0 left-0 flex w-full items-center gap-[2.8378%]">
            <img src={bangmodWordmark} alt="BangMod" className="w-[44.1352%]" />
            <img src={hackathonWordmark} alt="Hackathon" className="w-[53.0273%]" />
          </div>
        </div>

        <p className="hero-lead w-full max-w-[954px] font-light">
          {HERO_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        {/* The one control carrying the liquid behaviour so far: it deforms under the
            pointer, can be dragged and springs home. See LiquidButton for the model.
            `mm-press` is deliberately absent — the press feedback is the spring's now. */}
        <LiquidButton
          to="/signin"
          className="hero-cta font-bold text-white"
          fillClassName="bg-brand-red"
        >
          ลงทะเบียนเข้าร่วมการแข่งขัน
          {/* the glyph sits inside a 34px cell at 1440 — Figma insets it rather than
              scaling it, so the inset stays a percentage of whatever the cell becomes. The
              lean on hover is gated on a fine pointer, since touch fires :hover on tap. */}
          <span className="hero-cta-icon mm-arrow-shift relative block shrink-0 overflow-hidden">
            <img
              src={arrowUpRight}
              alt=""
              aria-hidden
              className="absolute inset-[20.81%_20.8%_22.32%_22.32%] max-w-none"
            />
          </span>
        </LiquidButton>
      </div>
    </section>
  )
}

import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { FAQS } from '../aboutData'
import { useReveal } from '../hooks/useReveal'

/**
 * The exported Figma icon is the expanded (minus) state only, so the collapsed
 * plus is composed from two copies of that same asset rather than hand-drawn.
 */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="mm-press-child relative block size-8 shrink-0">
      <img
        src="/assets/figma/0e681a2a1d4944287c14f80f1e46ef1bd044ab87.svg"
        alt=""
        className="absolute inset-0 size-full"
      />
      <img
        src="/assets/figma/0e681a2a1d4944287c14f80f1e46ef1bd044ab87.svg"
        alt=""
        data-open={open}
        className="mm-toggle-bar absolute inset-0 size-full"
      />
    </span>
  )
}

/**
 * Figma node 708:702 "Section / Features" — page y 2362, 1024 tall, 120 side padding,
 * a 500 title column and the questions sharing a 60 gap, both vertically centred. The
 * 124.705 pads are what centring a 774.59 row inside 1024 comes to.
 */
export default function FaqSection() {
  // Figma shows every question expanded — each toggle is drawn in its minus state — so
  // these open independently rather than as a one-at-a-time accordion.
  const [closed, setClosed] = useState<ReadonlySet<number>>(() => new Set())
  const head = useReveal()
  const list = useReveal<HTMLDListElement>({ group: true })

  return (
    <section id="faq" className="relative px-4 py-20 lg:px-[120px] lg:py-[124.705px]">
      {/* Decoration: a #FFEAB4 blob far wider than the page, flipped and centred on the
          section — it is what tints this whole band cream. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/assets/figma/5b4f0c1a6c5aa6f21d4a8c19dce31ff99afb3877.svg"
          alt=""
          className="absolute left-[calc(50%+0.5px)] top-[calc(50%+39.5px)] h-[1163px] w-[3023px] max-w-none -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-[60px]">
        <div
          ref={head.ref}
          className={`flex flex-col gap-[60px] lg:w-[500px] lg:shrink-0 lg:self-stretch lg:justify-center ${head.cls}`}
        >
          <SectionHeader number="03" title="คำถามที่พบบ่อย" />
          {/* Figma reserves the mascot's footprint in this column with a hidden copy of
              it, which is what pushes the heading up off the section's centre line. */}
          <div aria-hidden className="hidden aspect-[1736/2054] w-full lg:block" />
        </div>

        <dl ref={list.ref} className={`flex flex-1 flex-col gap-10 ${list.cls}`}>
          {FAQS.map((faq, i) => {
            const open = !closed.has(i)
            return (
              <div key={faq.q} className="contents">
                {i > 0 && (
                  <div role="presentation" className="h-0 border-t-[0.5px] border-brand-yellow" />
                )}
                <div className="flex flex-col">
                  <dt>
                    <button
                      type="button"
                      onClick={() =>
                        setClosed((prev) => {
                          const next = new Set(prev)
                          if (!next.delete(i)) next.add(i)
                          return next
                        })
                      }
                      aria-expanded={open}
                      className="flex w-full items-center gap-6 text-left text-xl leading-[1.4] font-medium lg:text-[28px]"
                    >
                      <span className="flex-1">{faq.q}</span>
                      <ToggleIcon open={open} />
                    </button>
                  </dt>
                  {/*
                   * The answer stays mounted and its grid row collapses to 0fr, so closing
                   * animates as well as opening. The 16 gap Figma puts between question and
                   * answer lives inside the clipped row as padding — as a flex gap it would
                   * survive the collapse and leave a hole under a closed question.
                   */}
                  <dd className={`mm-collapse ${open ? 'is-open' : ''}`}>
                    <div className="pt-4 text-lg leading-[1.5] lg:text-2xl">{faq.a}</div>
                  </dd>
                </div>
              </div>
            )
          })}
        </dl>
      </div>

      {/* Decoration / Star — Figma draws the mascot over the section, cropped by its box */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[263px] left-[-72px] z-20 hidden h-[693px] w-[853px] overflow-hidden lg:block"
      >
        <img
          src="/assets/figma/15683452949f0984de16e5631de71122be94c4ff.png"
          alt=""
          className="absolute top-0 left-[-33.11%] h-[166.84%] w-[194.88%] max-w-none"
        />
      </div>
    </section>
  )
}

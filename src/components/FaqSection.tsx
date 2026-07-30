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
    <span aria-hidden className="relative block size-8 shrink-0">
      <img src="/assets/icon-minimize.svg" alt="" className="absolute inset-0 size-full" />
      <img
        src="/assets/icon-minimize.svg"
        alt=""
        className={`absolute inset-0 size-full rotate-90 transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}
      />
    </span>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const head = useReveal()
  const list = useReveal<HTMLDListElement>({ group: true })

  return (
    <section id="faq" className="relative overflow-hidden px-4 py-20 lg:px-15 lg:py-30">
      <img
        src="/assets/features-wave.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 w-[3023px] max-w-none -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
      />
      <img
        src="/assets/star.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[263px] -left-18 w-[853px] max-w-none"
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:gap-15">
        <div ref={head.ref} className={`lg:w-[500px] lg:shrink-0 lg:self-center ${head.cls}`}>
          <SectionHeader number="03" title="คำถามที่พบบ่อย" />
        </div>

        <dl ref={list.ref} className={`flex flex-1 flex-col gap-10 ${list.cls}`}>
          {FAQS.map((faq, i) => {
            const open = openIndex === i
            return (
              <div key={faq.q} className="flex flex-col gap-10">
                {i > 0 && <hr className="border-ink/15" />}
                <div className="flex flex-col gap-4">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-6 text-left text-xl leading-[1.4] font-medium lg:text-[28px]"
                    >
                      <span className="flex-1">{faq.q}</span>
                      <ToggleIcon open={open} />
                    </button>
                  </dt>
                  {open && (
                    <dd className="text-lg leading-[1.5] lg:text-2xl">{faq.a}</dd>
                  )}
                </div>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}

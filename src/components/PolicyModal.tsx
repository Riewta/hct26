import { useEffect, useRef } from 'react'
import type { PolicyBlock, PolicyDocument } from '../privacyPolicy'

const ARROW_DOWN = '/assets/figma/b5fa6d1d1c4352d0d01420816b8777fe81ff5920.svg'

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === 'string') {
    return <p className="w-full text-[16px] leading-[1.6] font-light">{block}</p>
  }

  // list of bullets that each carry their own sub-bullets
  if (typeof block[0] === 'object') {
    return (
      <ul className="w-full list-disc ps-[24px] text-[16px] leading-[1.6] font-light">
        {(block as { bullet: string; sub: string[] }[]).map((item) => (
          <li key={item.bullet}>
            {item.bullet}
            <ul className="list-disc ps-[24px]">
              {item.sub.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="w-full list-disc ps-[24px] text-[16px] leading-[1.6] font-light">
      {(block as string[]).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function PolicyModal({
  document: doc,
  onAccept,
  onDecline,
}: {
  /** `null` closes the modal. */
  document: PolicyDocument | null
  onAccept: () => void
  onDecline: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)

  // close on Escape and lock background scroll while open
  useEffect(() => {
    if (!doc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDecline()
    }
    window.document.addEventListener('keydown', onKey)
    const prev = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    bodyRef.current?.scrollTo({ top: 0 })
    return () => {
      window.document.removeEventListener('keydown', onKey)
      window.document.body.style.overflow = prev
    }
  }, [doc, onDecline])

  if (!doc) return null

  return (
    /* Figma overlays every dialog on a light grey scrim that blurs the page behind it */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(194,194,194,0.3)] p-4 backdrop-blur-[5px] lg:p-25"
      onClick={onDecline}
    >
      {/* Figma 708:2239 — a 1000x823 sheet, 24 of padding, 32 between header, body and footer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={doc.title}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-[1000px] flex-col gap-8 rounded-[32px] border border-[#dcdcdc] bg-white p-6 lg:h-[823px]"
      >
        <header className="flex w-full shrink-0 items-center gap-4">
          <img src={doc.icon} alt="" aria-hidden className="size-[40px] shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
            <p className="text-[28px] leading-[1.4] font-medium">{doc.title}</p>
            <p className="text-[18px] leading-normal text-gray-1">{doc.subtitle}</p>
          </div>
        </header>

        <div
          ref={bodyRef}
          className="flex min-h-0 w-full flex-1 flex-col items-start gap-6 overflow-y-auto pr-2"
        >
          {doc.effective && <p className="w-full text-[20px] leading-[1.4]">{doc.effective}</p>}
          {doc.sections.map((section) => (
            <section key={section.title} className="flex w-full flex-col items-start gap-4">
              <h3 className="w-full text-[24px] leading-[1.4]">{section.title}</h3>
              {section.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>

        <footer className="flex w-full shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {doc.downloadable ? (
            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-[12px] rounded-[12px] bg-[#efefef] py-3 pr-6 pl-4 text-[20px] leading-[1.4] transition-colors hover:bg-[#e2e2e2]"
            >
              <span className="relative block size-[24px] shrink-0 overflow-clip">
                <img
                  src={ARROW_DOWN}
                  alt=""
                  aria-hidden
                  className="absolute inset-[12.54%_22.35%_14.08%_22.33%] block"
                />
              </span>
              ดาวน์โหลด
            </button>
          ) : (
            /* the privacy sheet right-aligns its two buttons with nothing beside them */
            <span className="hidden sm:block" />
          )}

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={onDecline}
              className="rounded-[12px] bg-[#efefef] px-6 py-3 text-[20px] leading-[1.4] transition-colors hover:bg-[#e2e2e2]"
            >
              ไม่ยอมรับ
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="rounded-[12px] bg-brand-red px-6 py-3 text-[20px] leading-[1.4] text-white transition-opacity hover:opacity-90"
            >
              ยอมรับ
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

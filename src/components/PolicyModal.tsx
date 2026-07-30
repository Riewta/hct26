import { useEffect, useRef } from 'react'
import type { PolicyBlock, PolicyDocument } from '../privacyPolicy'

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === 'string') {
    return <p className="text-sm leading-[1.6] font-light lg:text-base">{block}</p>
  }

  // list of bullets that each carry their own sub-bullets
  if (typeof block[0] === 'object') {
    return (
      <ul className="ms-6 list-disc text-sm leading-[1.6] font-light lg:text-base">
        {(block as { bullet: string; sub: string[] }[]).map((item) => (
          <li key={item.bullet}>
            {item.bullet}
            <ul className="ms-6 list-disc">
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
    <ul className="ms-6 list-disc text-sm leading-[1.6] font-light lg:text-base">
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 lg:p-10"
      onClick={onDecline}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={doc.title}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-[1000px] flex-col gap-8 rounded-[32px] border border-[#dcdcdc] bg-white p-6 shadow-soft"
      >
        <header className="flex shrink-0 items-center gap-4">
          <img src={doc.icon} alt="" aria-hidden className="size-10 shrink-0" />
          <div className="flex flex-col">
            <p className="text-2xl leading-[1.4] font-medium lg:text-[28px]">{doc.title}</p>
            <p className="text-lg text-gray-1">{doc.subtitle}</p>
          </div>
        </header>

        <div ref={bodyRef} className="flex flex-1 flex-col gap-6 overflow-y-auto pr-2">
          {doc.effective && <p className="text-lg leading-[1.4] lg:text-xl">{doc.effective}</p>}
          {doc.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xl leading-[1.4] lg:text-2xl">{section.title}</h3>
              {section.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>

        <footer className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {doc.downloadable ? (
            <button
              type="button"
              className="flex shrink-0 items-center gap-3 rounded-xl bg-[#efefef] py-3 pr-6 pl-4 text-lg transition-colors lg:text-xl hover:bg-[#e2e2e2]"
            >
              <img
                src="/assets/icon-arrow-down-28.svg"
                alt=""
                aria-hidden
                className="size-7"
              />
              ดาวน์โหลด
            </button>
          ) : (
            <p className="text-lg lg:text-xl">{doc.acknowledgement}</p>
          )}

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={onDecline}
              className="rounded-xl bg-[#efefef] px-6 py-3 text-lg transition-colors hover:bg-[#e2e2e2] lg:text-xl"
            >
              ไม่ยอมรับ
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="rounded-xl bg-brand-red px-6 py-3 text-lg text-white lg:text-xl transition-opacity hover:opacity-90"
            >
              ยอมรับ
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

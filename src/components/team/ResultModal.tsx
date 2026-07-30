import { useEffect } from 'react'

/** Outcome dialog shown over the dashboard once selection results are out. */
export default function ResultModal({
  open,
  image,
  title,
  titleClassName = '',
  lines,
  actions,
  onClose,
}: {
  open: boolean
  image: string
  title: string
  titleClassName?: string
  lines: string[]
  actions?: React.ReactNode
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[700px] flex-col items-center gap-6 rounded-[32px] bg-white px-6 pt-14 pb-8 lg:px-15"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิด"
          className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-full text-2xl leading-none text-gray-2 transition-colors hover:bg-[#efefef] hover:text-ink"
        >
          ✕
        </button>

        <img src={image} alt="" aria-hidden className="w-[200px] object-contain lg:w-[260px]" />

        <div className="flex flex-col items-center gap-4">
          <h2
            className={`text-center text-2xl leading-[1.4] font-semibold lg:text-[32px] ${titleClassName}`}
          >
            {title}
          </h2>
          <p className="text-center text-base text-gray-1 lg:text-lg">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        {actions && <div className="flex w-full flex-col gap-3">{actions}</div>}
      </div>
    </div>
  )
}

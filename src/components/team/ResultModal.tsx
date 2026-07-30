import { useEffect } from 'react'

const CLOSE = '/assets/figma/4bd7505c0eec086659f8bce6f796799c7aa38350.svg'

/**
 * Outcome dialog shown over the dashboard once selection results are out.
 *
 * Figma 708:3166 — an 800x823 sheet at y=100, 40 of padding, 32 between the mascot, the
 * message block and the button stack, over a light grey scrim that blurs the page behind it.
 */
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
      className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(194,194,194,0.3)] backdrop-blur-[5px]"
      onClick={onClose}
    >
      <div className="flex min-h-full flex-col items-center justify-center px-4 py-6 lg:block lg:p-0">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-[800px] flex-col items-center justify-center gap-6 rounded-[32px] border border-[#dcdcdc] bg-white p-6 lg:mx-auto lg:mt-[100px] lg:mb-[101px] lg:h-[823px] lg:w-[800px] lg:gap-8 lg:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิด"
            className="absolute top-[16px] right-[16px] size-[32px] overflow-clip transition-opacity hover:opacity-70 lg:top-[31px] lg:right-[31px]"
          >
            <img src={CLOSE} alt="" aria-hidden className="absolute inset-0 block size-full" />
          </button>

          <img
            src={image}
            alt=""
            aria-hidden
            className="size-[200px] shrink-0 object-cover sm:size-[302px]"
          />

          <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
            <h2
              className={`text-center text-[24px] leading-[1.4] font-semibold lg:text-[40px] ${titleClassName}`}
            >
              {title}
            </h2>
            <p className="w-full text-center text-[16px] leading-[1.6] text-gray-2 lg:text-[24px]">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {actions && (
            <div className="flex w-full flex-col items-start justify-center gap-4 lg:gap-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

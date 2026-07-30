import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ColourBlockBackdrop } from './AuthBackdrop'
import GoogleLogo from './GoogleLogo'

/**
 * Figma 708:1174 / 708:2022 / 708:2260 — the colour-block page shared by the
 * registration gate and the success/error results. Unlike sign-in these frames carry
 * no food decoration at all, just the three page-filling blocks.
 *
 * The 900 column is Figma's `left-[270px] right-[270px]` inset of the 1440 frame, and
 * its top row sits at 60. Cards are bottom-open (`rounded-t-[32px]`) and run to the
 * fold, so they stretch rather than carrying a fixed 850 height.
 */
export default function AuthPageShell({
  muted = false,
  children,
}: {
  /** The error screen swaps the brand blocks for grey ones. */
  muted?: boolean
  children: ReactNode
}) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-white">
      <ColourBlockBackdrop muted={muted} />

      <div className="relative mx-auto flex w-full max-w-[900px] flex-1 flex-col px-4 pt-8 lg:px-0 lg:pt-15">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex flex-1 items-center gap-3 text-xl leading-[1.4] text-white transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/figma/41418d29fd1f773c0f14bc317b19bd65b6f49ee8.svg"
              alt=""
              aria-hidden
              className="size-6"
            />
            หน้าหลัก
          </Link>

          <button
            type="button"
            className="flex shrink-0 items-center justify-center gap-4 rounded-[12px] bg-white py-3 pr-4 pl-5 text-xl leading-[1.4] transition-opacity hover:opacity-90"
          >
            <GoogleLogo />
            <span className="hidden sm:inline">ชื่อบัญชีผู้ใช้</span>
            <img
              src="/assets/figma/da1c84a7a51ab6256b69963fbe9c03c1607713d3.svg"
              alt=""
              aria-hidden
              className="size-6"
            />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

/** Shared geometry of the red pill that closes both result cards. */
export const RESULT_ACTION =
  'flex h-15 w-full items-center justify-center gap-5 rounded-[20px] bg-brand-red px-6 py-4 font-display text-lg leading-[normal] font-semibold text-white transition-opacity hover:opacity-90 lg:text-xl'

/**
 * The success/error card: a 302 illustration, a centred message and one full-width
 * action, all centred in the 850-tall card.
 */
export function ResultCard({
  image,
  title,
  titleClassName = '',
  lines,
  action,
}: {
  image: string
  title: string
  titleClassName?: string
  lines: string[]
  action: ReactNode
}) {
  return (
    <div className="mt-8 flex min-h-[850px] flex-1 flex-col items-center justify-center gap-10 rounded-t-[32px] bg-white p-6 shadow-soft lg:mt-[70px] lg:p-10">
      <img
        src={image}
        alt=""
        aria-hidden
        className="w-[220px] shrink-0 object-cover lg:size-[302px]"
      />

      <div className="flex w-full flex-col items-center gap-6">
        <h1
          className={`text-center text-3xl leading-[1.4] font-semibold lg:text-[40px] ${titleClassName}`}
        >
          {title}
        </h1>
        <p className="text-center text-lg leading-[1.6] lg:text-xl">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {action}
    </div>
  )
}

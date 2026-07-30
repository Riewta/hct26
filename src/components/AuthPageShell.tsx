import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AuthBackdrop from './AuthBackdrop'
import GoogleLogo from './GoogleLogo'

/**
 * The colour-block page with a back link, account chip and a bottom-anchored
 * white card. Shared by the registration gate and the success/error results.
 */
export default function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <AuthBackdrop />

      <div className="relative mx-auto flex min-h-dvh max-w-[900px] flex-col gap-8 px-4 pt-15 lg:px-0">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl leading-[1.4] text-white transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/icon-chevron-left.svg"
              alt=""
              aria-hidden
              className="size-6 brightness-0 invert"
            />
            หน้าหลัก
          </Link>

          <button
            type="button"
            className="flex items-center gap-4 rounded-xl bg-white py-3 pr-4 pl-5 text-xl leading-[1.4] transition-opacity hover:opacity-90"
          >
            <GoogleLogo />
            <span className="hidden sm:inline">ชื่อบัญชีผู้ใช้</span>
            <img src="/assets/icon-chevron-down.svg" alt="" aria-hidden className="size-6" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

/** Centred result card: illustration, message, single full-width action. */
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
    <div className="flex flex-1 flex-col items-center justify-center gap-10 rounded-t-[32px] bg-white p-6 shadow-soft lg:p-10">
      <img
        src={image}
        alt=""
        aria-hidden
        className="w-[220px] shrink-0 object-contain lg:w-[302px]"
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

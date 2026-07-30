import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import GoogleLogo from '../GoogleLogo'
import Decor from '../Decor'

export const TOTAL_STEPS = 5

const CRUMBS = ['ข้อมูลทีม', 'อาจารย์', 'ผู้เข้าแข่งขัน', 'เงื่อนไข']

/** Which breadcrumb is active for each 1-based step. Steps 3 and 4 share a crumb. */
const CRUMB_FOR_STEP = [0, 1, 2, 2, 3]

const PASTA = [
  { src: '/assets/pasta-a.png', x: 100, y: 4, size: 320, rotate: 12 },
  { src: '/assets/pasta-a.png', x: 88, y: 1, size: 260, rotate: -40 },
  { src: '/assets/pasta-a.png', x: 108, y: 14, size: 220, rotate: 60 },
  { src: '/assets/pasta-b.png', x: 97, y: 20, size: 200, rotate: -15 },
]

export default function WizardShell({
  step,
  children,
  actions,
}: {
  step: number
  children: ReactNode
  actions: ReactNode
}) {
  const activeCrumb = CRUMB_FOR_STEP[step - 1]

  return (
    <div className="relative min-h-dvh overflow-hidden bg-white">
      <Decor items={PASTA} className="hidden lg:block" />

      <div className="relative z-10 mx-auto flex max-w-[1040px] flex-col gap-4 px-4 py-8 lg:py-15">
        <header className="flex items-center justify-between gap-4 rounded-3xl px-2 lg:px-5">
          <Link to="/">
            <img
              src="/assets/logo-nav.png"
              alt="BangMod Hackathon 2026"
              className="h-10 w-auto lg:h-[50px]"
            />
          </Link>
          <button
            type="button"
            className="flex items-center gap-4 rounded-xl border border-[#dcdcdc] bg-white py-3 pr-4 pl-5 text-lg transition-colors hover:border-brand-red lg:text-xl"
          >
            <GoogleLogo />
            <span className="hidden sm:inline">ชื่อบัญชีผู้ใช้</span>
            <img src="/assets/icon-chevron-down.svg" alt="" aria-hidden className="size-6" />
          </button>
        </header>

        <div className="flex flex-col gap-10 rounded-3xl bg-white p-6 shadow-soft lg:p-10">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl leading-[1.4] font-semibold lg:text-[32px]">
                ลงทะเบียนเข้าแข่งขัน
              </h1>
              <nav aria-label="ขั้นตอน" className="flex flex-wrap gap-2 text-base lg:text-lg">
                {CRUMBS.map((crumb, i) => (
                  <span key={crumb} className="flex gap-2">
                    <span className={i === activeCrumb ? 'text-ink' : 'text-gray-2'}>{crumb}</span>
                    {i < CRUMBS.length - 1 && <span className="text-gray-2">&gt;</span>}
                  </span>
                ))}
              </nav>
            </div>

            <div
              className="flex h-2 gap-1 overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
              aria-label={`ขั้นตอนที่ ${step} จาก ${TOTAL_STEPS}`}
            >
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <span
                  key={i}
                  className={`h-full flex-1 rounded-full ${i < step ? 'bg-brand-red' : 'bg-[#e6e6e6]'}`}
                />
              ))}
            </div>
          </div>

          {children}
        </div>

        <div className="flex items-center justify-between gap-4 px-2 lg:px-5">{actions}</div>
      </div>
    </div>
  )
}

export function BackButton({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="flex h-15 items-center gap-3 rounded-[20px] bg-brand-red px-4 text-lg font-medium text-white transition-opacity hover:opacity-90 lg:text-xl"
    >
      <img
        src="/assets/icon-chevron-left.svg"
        alt=""
        aria-hidden
        className="size-6 brightness-0 invert"
      />
      ย้อนกลับ
    </Link>
  )
}

export function NextButton({ to, label = 'ถัดไป' }: { to: string; label?: string }) {
  return (
    <Link
      to={to}
      className="ml-auto flex h-15 items-center gap-3 rounded-[20px] bg-brand-red px-6 text-lg font-medium text-white transition-opacity hover:opacity-90 lg:text-xl"
    >
      {label}
      <img
        src="/assets/icon-chevron-left.svg"
        alt=""
        aria-hidden
        className="size-6 rotate-180 brightness-0 invert"
      />
    </Link>
  )
}

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import GoogleLogo from '../GoogleLogo'
import { WizardBackdrop } from '../AuthBackdrop'
import ScrollEdgeEffect from '../ScrollEdgeEffect'

export const TOTAL_STEPS = 5

const CRUMBS = ['ข้อมูลทีม', 'อาจารย์', 'ผู้เข้าแข่งขัน', 'เงื่อนไข']

/** Which breadcrumb is active for each 1-based step. Steps 3 and 4 share a crumb. */
const CRUMB_FOR_STEP = [0, 1, 2, 2, 3]

/**
 * Figma 708:1255 and friends. The wizard sits on #fefdfc inside a 1440 frame with 200
 * of side padding, which gives the 1040 column; the top bar and the form card are two
 * rounded-24 white plates 40 apart.
 *
 * `withTomatoes` is false only on the terms step, which drops the tomato cluster.
 */
export default function WizardShell({
  step,
  children,
  actions,
  withTomatoes = true,
  blurBehindContent = false,
}: {
  step: number
  children: ReactNode
  actions: ReactNode
  /** The terms step drops the tomato cluster. */
  withTomatoes?: boolean
  /**
   * Figma stacks the scroll-edge blur above the whole page on the first four steps —
   * the top bar really is softened there — but re-orders it behind the content on the
   * terms step, so the layer is switchable.
   */
  blurBehindContent?: boolean
}) {
  const activeCrumb = CRUMB_FOR_STEP[step - 1]

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#fefdfc]">
      <WizardBackdrop withTomatoes={withTomatoes} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1040px] flex-1 flex-col gap-4 px-4 py-8 lg:gap-10 lg:px-0 lg:pt-15 lg:pb-0">
        <header className="flex items-center justify-between gap-4 rounded-[24px] bg-white p-4 shadow-soft lg:p-5">
          <Link to="/">
            <img
              src="/assets/figma/95f39e217dc710a779c3c0b6cf30b3a377d857f5.png"
              alt="BangMod Hackathon 2026"
              className="h-10 w-auto object-cover lg:h-[50px] lg:w-[222px]"
            />
          </Link>
          <button
            type="button"
            className="flex items-center justify-center gap-4 rounded-[12px] border border-[#dcdcdc] bg-white py-3 pr-4 pl-5 text-lg leading-[1.4] transition-colors hover:border-brand-red lg:text-xl"
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
        </header>

        {/*
         * The card's bottom padding is 0 because the action bar supplies it: Figma pins
         * that bar to the card's bottom edge on its own 20 inset, so it cancels the
         * card's 40 side padding and stays 20 below the content.
         */}
        <div className="flex flex-1 flex-col rounded-[24px] bg-white p-6 pb-0 shadow-soft lg:min-h-[832px] lg:p-10 lg:pb-0">
          <div className="flex flex-1 flex-col gap-6 lg:gap-10">
            {/* title and crumbs sit flush in Figma — no gap between them */}
            <div className="flex flex-col items-start">
              <h1 className="text-2xl leading-[1.4] font-semibold lg:text-[32px]">
                ลงทะเบียนเข้าแข่งขัน
              </h1>
              <nav
                aria-label="ขั้นตอน"
                className="flex flex-wrap items-start gap-2 text-base leading-[normal] lg:text-lg"
              >
                {CRUMBS.map((crumb, i) => (
                  <span key={crumb} className="flex gap-2">
                    <span className={i <= activeCrumb ? 'text-ink' : 'text-gray-2'}>{crumb}</span>
                    {i < CRUMBS.length - 1 && <span className="text-gray-2">&gt;</span>}
                  </span>
                ))}
              </nav>
            </div>

            <div
              className="flex h-2 gap-1 overflow-hidden rounded-[100px]"
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

            {children}
          </div>

          <div className="mt-5 -mx-6 flex items-center justify-between gap-4 rounded-b-[24px] bg-white p-4 lg:-mx-10 lg:p-5">
            {actions}
          </div>
        </div>
      </div>

      <ScrollEdgeEffect
        className={`fixed inset-x-0 top-0 h-[160px] ${blurBehindContent ? 'z-0' : 'z-30'}`}
      />
    </div>
  )
}

/** Figma's step buttons: rounded-12, a 12 gap and asymmetric padding around the icon. */
const STEP_BUTTON =
  'flex items-center justify-center gap-3 rounded-[12px] bg-brand-red py-4 text-lg leading-[1.4] font-medium text-white transition-opacity hover:opacity-90 lg:text-xl'

export function BackButton({ to }: { to: string }) {
  return (
    <Link to={to} className={`${STEP_BUTTON} pr-6 pl-4`}>
      <img
        src="/assets/figma/41418d29fd1f773c0f14bc317b19bd65b6f49ee8.svg"
        alt=""
        aria-hidden
        className="size-6"
      />
      ย้อนกลับ
    </Link>
  )
}

export function NextButton({ to, label = 'ถัดไป' }: { to: string; label?: string }) {
  return (
    <Link to={to} className={`${STEP_BUTTON} ml-auto pr-4 pl-6`}>
      {label}
      <img
        src="/assets/figma/a275512325b630305418a611fed5319ba90acfc8.svg"
        alt=""
        aria-hidden
        className="size-6"
      />
    </Link>
  )
}

/** The terms step's submit: same pill, no icon, so the padding is symmetric. */
export function SubmitButton({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className={`${STEP_BUTTON} ml-auto px-6`}>
      {label}
    </Link>
  )
}

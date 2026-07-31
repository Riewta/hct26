import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthBackdrop from '../components/AuthBackdrop'
import GoogleLogo from '../components/GoogleLogo'
import { markAuthNav, supportsViewTransitions } from '../components/form/wizardNav'

/**
 * Whether this mount should play the arrival entrance.
 *
 * Sign-in is reachable two ways, and only one of them wants it. A visitor who lands on
 * /signin sees the collage assemble; a visitor who comes back from the registration gate
 * arrives inside a view transition that has just animated those exact colour blocks, and
 * replaying the entrance on top of it would animate everything twice.
 *
 * `:active-view-transition` matches on the root element for as long as a transition is
 * running, and react-router flushes the new route's render synchronously inside
 * `startViewTransition`'s update callback — so reading it while this component first
 * renders answers exactly the right question, without reaching into router internals.
 * The `CSS.supports` guard is not optional: `matches()` throws on a selector the engine
 * does not know, and an engine that lacks the pseudo-class has no morph to double up
 * with anyway.
 */
function useArrivalEntrance() {
  const [play] = useState(() => {
    if (typeof document === 'undefined') return true
    if (!CSS.supports('selector(:active-view-transition)')) return true
    return !document.documentElement.matches(':active-view-transition')
  })
  return play
}

/**
 * Figma 708:1205. A 1440x1024 row: 20 of padding, an 80 gap, and a 694x984 decorative
 * panel on the right, which leaves the form column 626 wide with an 80 left indent.
 * Figma's `leading-[normal]` is CSS `line-height: normal`, not Tailwind's 1.5, so the
 * headings and the button label spell it out.
 */
export default function SignIn() {
  const navigate = useNavigate()
  const entrance = useArrivalEntrance()

  return (
    /*
     * `data-auth-entrance` is what arms every `.auth-rise` on this screen, the collage's
     * included (styles/auth-motion.css). Without the attribute each element renders in
     * its final state — there is no half-applied case.
     */
    <div
      data-auth-entrance={entrance || undefined}
      className="relative min-h-dvh overflow-hidden bg-white"
    >
      <div className="flex min-h-dvh flex-col items-center gap-10 p-5 lg:flex-row lg:gap-20">
        <div className="flex w-full flex-1 flex-col items-start gap-10 lg:gap-15 lg:pl-20">
          <Link
            to="/"
            data-rise={0}
            className="auth-rise auth-rise-sm flex w-full items-center gap-2.5 text-xl leading-[1.4] transition-opacity hover:opacity-70"
          >
            <img
              src="/assets/figma/ea51a69c788a5d0d5d7479c1fff987eee5a19fe5.svg"
              alt=""
              aria-hidden
              className="size-6"
            />
            หน้าหลัก
          </Link>

          <div className="flex w-full flex-col gap-8">
            <img
              src="/assets/figma/95f39e217dc710a779c3c0b6cf30b3a377d857f5.png"
              alt="BangMod Hackathon 2026"
              data-rise={1}
              className="auth-rise auth-rise-sm h-16 w-auto max-w-full object-contain lg:h-20 lg:w-[356px] lg:object-cover"
            />

            <div data-rise={2} className="auth-rise auth-rise-sm flex w-full flex-col gap-3">
              <h1 className="w-full text-[28px] leading-[normal] font-bold tracking-[0.374px] lg:text-[32px]">
                ลงทะเบียนเข้าแข่งขัน
              </h1>
              <p className="w-full text-lg leading-[normal] text-gray-2 lg:text-xl">
                กรุณาใช้บัญชี Google ในการลงทะเบียนเข้าแข่งขัน
              </p>
            </div>

            {/*
             * Figma sets this one label in Sukhumvit Set, not Noto — hence font-display.
             *
             * The navigation is the trigger for the whole auth morph: `viewTransition`
             * hands react-router the go-ahead to wrap it in `document.startViewTransition`,
             * and the `auth-block-*` names shared by AuthBackdrop and ColourBlockBackdrop
             * are what turn the sign-in panel's colour blocks into the registration page's.
             * Passing the detected flag rather than a bare `true` keeps the fallback
             * explicit: without support this is an ordinary route change. `markAuthNav`
             * tells the stylesheet which hop this is, so the colour blocks morph and the
             * requirements card rises rather than crossfading.
             */}
            <button
              type="button"
              onClick={() => {
                markAuthNav('gate')
                navigate('/register', { viewTransition: supportsViewTransitions })
              }}
              data-rise={3}
              className="auth-rise auth-rise-sm flex h-15 w-full items-center justify-center gap-5 rounded-[20px] bg-[#f6f6f6] px-6 py-4 font-display text-lg leading-[normal] font-semibold transition-[background-color,transform] duration-[160ms] ease-out hover:bg-[#ececec] active:scale-[0.98] motion-reduce:active:scale-100 lg:text-xl"
            >
              <GoogleLogo />
              เข้าสู่ระบบด้วย Google
            </button>

            <Link
              to="/guide"
              data-rise={4}
              className="auth-rise auth-rise-sm w-full text-base leading-[normal] font-light text-gray-2 underline-offset-4 hover:underline"
            >
              ข้อกำหนด
            </Link>
          </div>
        </div>

        {/* purely decorative, and its tall-narrow composition doesn't survive stacking */}
        <div className="relative hidden h-[984px] w-[694px] shrink-0 lg:block">
          <AuthBackdrop />
        </div>
      </div>
    </div>
  )
}

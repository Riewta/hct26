import { Link } from 'react-router-dom'
import AuthBackdrop from '../components/AuthBackdrop'
import GoogleLogo from '../components/GoogleLogo'

/**
 * Figma 708:1205. A 1440x1024 row: 20 of padding, an 80 gap, and a 694x984 decorative
 * panel on the right, which leaves the form column 626 wide with an 80 left indent.
 * Figma's `leading-[normal]` is CSS `line-height: normal`, not Tailwind's 1.5, so the
 * headings and the button label spell it out.
 */
export default function SignIn() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-white">
      <div className="flex min-h-dvh flex-col items-center gap-10 p-5 lg:flex-row lg:gap-20">
        <div className="flex w-full flex-1 flex-col items-start gap-10 lg:gap-15 lg:pl-20">
          <Link
            to="/"
            className="flex w-full items-center gap-2.5 text-xl leading-[1.4] transition-opacity hover:opacity-70"
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
              className="h-16 w-auto max-w-full object-contain lg:h-20 lg:w-[356px] lg:object-cover"
            />

            <div className="flex w-full flex-col gap-3">
              <h1 className="w-full text-[28px] leading-[normal] font-bold tracking-[0.374px] lg:text-[32px]">
                ลงทะเบียนเข้าแข่งขัน
              </h1>
              <p className="w-full text-lg leading-[normal] text-gray-2 lg:text-xl">
                กรุณาใช้บัญชี Google ในการลงทะเบียนเข้าแข่งขัน
              </p>
            </div>

            {/* Figma sets this one label in Sukhumvit Set, not Noto — hence font-display */}
            <button
              type="button"
              className="flex h-15 w-full items-center justify-center gap-5 rounded-[20px] bg-[#f6f6f6] px-6 py-4 font-display text-lg leading-[normal] font-semibold transition-colors hover:bg-[#ececec] lg:text-xl"
            >
              <GoogleLogo />
              เข้าสู่ระบบด้วย Google
            </button>

            <Link
              to="/guide"
              className="w-full text-base leading-[normal] font-light text-gray-2 underline-offset-4 hover:underline"
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

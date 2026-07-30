import { Link } from 'react-router-dom'
import AuthBackdrop from '../components/AuthBackdrop'
import GoogleLogo from '../components/GoogleLogo'

export default function SignIn() {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <div className="flex flex-1 items-center px-6 py-16 lg:px-20">
        <div className="flex w-full max-w-[546px] flex-col gap-15">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl leading-[1.4] transition-opacity hover:opacity-70"
          >
            <img src="/assets/icon-chevron-left.svg" alt="" aria-hidden className="size-6" />
            หน้าหลัก
          </Link>

          <div className="flex flex-col gap-8">
            <img
              src="/assets/logo-nav.png"
              alt="BangMod Hackathon 2026"
              className="h-16 w-auto self-start lg:h-20"
            />

            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] font-bold tracking-[0.374px] lg:text-[32px]">
                ลงทะเบียนเข้าแข่งขัน
              </h1>
              <p className="text-lg text-gray-2 lg:text-xl">
                กรุณาใช้บัญชี Google ในการลงทะเบียนเข้าแข่งขัน
              </p>
            </div>

            <button
              type="button"
              className="flex h-15 w-full items-center justify-center gap-5 rounded-[20px] bg-[#f6f6f6] px-6 text-lg font-semibold transition-colors hover:bg-[#ececec] lg:text-xl"
            >
              <GoogleLogo />
              เข้าสู่ระบบด้วย Google
            </button>

            <Link
              to="/guide"
              className="text-base font-light text-gray-2 underline-offset-4 hover:underline"
            >
              ข้อกำหนด
            </Link>
          </div>
        </div>
      </div>

      {/* purely decorative, and its tall-narrow composition doesn't survive stacking */}
      <div className="relative hidden flex-1 lg:block lg:min-h-dvh">
        <AuthBackdrop />
      </div>
    </div>
  )
}

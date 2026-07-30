import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Decor from '../components/Decor'
import GoogleLogo from '../components/GoogleLogo'
import PersonDetails from '../components/team/PersonDetails'
import StatusPanel from '../components/team/StatusPanel'
import ResultModal from '../components/team/ResultModal'
import {
  MEMBERS,
  QUALIFIED_MODAL,
  REJECTED_MODAL,
  STATUS_VARIANTS,
  TEAM,
  type TeamStatus,
} from '../teamData'

const PASTA = [
  { src: '/assets/pasta-a.png', x: 2, y: 2, size: 320, rotate: -14 },
  { src: '/assets/pasta-a.png', x: 14, y: -3, size: 240, rotate: 40 },
  { src: '/assets/pasta-b.png', x: 98, y: 3, size: 300, rotate: 20 },
  { src: '/assets/pasta-b.png', x: 88, y: -2, size: 230, rotate: -30 },
]

function isStatus(value: string | null): value is TeamStatus {
  return STATUS_VARIANTS.includes(value as TeamStatus)
}

export default function MyTeam() {
  const [params] = useSearchParams()
  const statusParam = params.get('status')
  const status: TeamStatus = isStatus(statusParam) ? statusParam : 'reviewing'

  // the advisor tab is the one shown in the document-issue design
  const [active, setActive] = useState(status === 'issue' ? MEMBERS.length - 1 : 0)
  const [modal, setModal] = useState(params.get('modal'))

  const person = MEMBERS[active]

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <Decor items={PASTA} className="hidden lg:block" />

      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col gap-6 px-4 py-8 lg:py-15">
        <header className="flex items-center justify-between gap-4 px-2 lg:px-5">
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

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-8 rounded-[20px] bg-white p-4 shadow-soft">
            <div className="flex gap-4">
              <div className="size-[116px] shrink-0 rounded-2xl bg-[#ebebeb]" />
              <div className="flex flex-1 flex-col gap-4">
                <h1 className="text-xl leading-[1.4] font-medium lg:text-2xl">{TEAM.name}</h1>
                <p className="flex items-center gap-3 text-base lg:text-lg">
                  <span className="text-gray-2">รหัสทีม</span>
                  <span>{TEAM.code}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(TEAM.code)}
                    aria-label="คัดลอกรหัสทีม"
                    className="transition-opacity hover:opacity-60"
                  >
                    <img src="/assets/icon-copy.svg" alt="" aria-hidden className="size-5" />
                  </button>
                </p>
                <p className="flex gap-3 text-base lg:text-lg">
                  <span className="text-gray-2">สถานศึกษา</span>
                  <span>{TEAM.school}</span>
                </p>
              </div>
            </div>

            <div role="tablist" className="flex flex-wrap gap-2">
              {MEMBERS.map((member, i) => (
                <button
                  key={member.tab}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-3 py-2 text-base transition-colors lg:text-lg ${
                    i === active
                      ? 'border-b-2 border-brand-red font-semibold'
                      : 'rounded-2xl text-gray-2 hover:text-ink'
                  }`}
                >
                  <img
                    src={member.icon}
                    alt=""
                    aria-hidden
                    className={`size-6 ${i === active ? '' : 'opacity-60'}`}
                  />
                  {member.tab}
                </button>
              ))}
            </div>

            <PersonDetails person={person} />
          </div>

          <div className="lg:w-[400px] lg:shrink-0">
            <StatusPanel status={status} showDiscord={status === 'qualified'} />
          </div>
        </div>
      </div>

      <ResultModal
        open={modal === 'qualified'}
        {...QUALIFIED_MODAL}
        onClose={() => setModal(null)}
        actions={
          <>
            <a
              href="#"
              className="flex items-center justify-center gap-3 rounded-xl bg-[#5865f2] py-3 text-lg font-medium text-white transition-opacity hover:opacity-90"
            >
              <img
                src="/assets/icon-discord.svg"
                alt=""
                aria-hidden
                className="size-5 brightness-0 invert"
              />
              รับรหัสเข้าร่วม Discord
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-3 rounded-xl bg-[#f6f6f6] py-3 text-lg transition-colors hover:bg-[#ececec]"
            >
              <img src="/assets/icon-instagram.svg" alt="" aria-hidden className="size-5" />
              แชร์ไปยัง Instagram
            </a>
          </>
        }
      />

      <ResultModal
        open={modal === 'rejected'}
        {...REJECTED_MODAL}
        titleClassName="text-brand-red"
        onClose={() => setModal(null)}
      />
    </div>
  )
}

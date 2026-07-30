import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import GoogleLogo from '../components/GoogleLogo'
import ScrollEdgeEffect from '../components/ScrollEdgeEffect'
import PersonDetails from '../components/team/PersonDetails'
import ResultModal from '../components/team/ResultModal'
import StatusPanel, { DiscordGlyph } from '../components/team/StatusPanel'
import TeamDecor from '../components/team/TeamDecor'
import {
  MEMBERS,
  QUALIFIED_MODAL,
  REJECTED_MODAL,
  STATUS_VARIANTS,
  TEAM,
  type TeamStatus,
} from '../teamData'

const LOGO = '/assets/figma/95f39e217dc710a779c3c0b6cf30b3a377d857f5.png'
const CHEVRON = '/assets/figma/da1c84a7a51ab6256b69963fbe9c03c1607713d3.svg'
const COPY = '/assets/figma/85282b0baf589ceb0eb17e9e2d027684e76a4e8b.svg'
const DISCORD_32 = '/assets/figma/8353328712043444b22094d1885d9862cc9e8a45.svg'
const INSTAGRAM_32 = '/assets/figma/eeb6468e0956000a4bf03f129dbb014eca33f4d8.svg'

function isStatus(value: string | null): value is TeamStatus {
  return STATUS_VARIANTS.includes(value as TeamStatus)
}

/** Modal call to action — Figma sets these labels in Sukhumvit Set Semi Bold, not Noto. */
function ModalButton({
  href,
  className,
  icon,
  children,
}: {
  href: string
  className: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className={`flex w-full items-center justify-center gap-4 rounded-[16px] px-4 py-3 font-display text-[20px] leading-normal font-semibold transition-opacity hover:opacity-90 ${className}`}
    >
      {icon}
      {children}
    </a>
  )
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
    <div className="relative min-h-dvh overflow-hidden bg-[#fefdfc]">
      <TeamDecor />

      {/* Figma 708:2306 — the progressive blur band that fades the pasta out under the nav */}
      <ScrollEdgeEffect className="absolute inset-x-0 top-0 z-10 h-40" />

      {/* Figma 708:2307: a 1440 frame padded 100 either side, 60 down, 40 between the rows */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 pt-6 pb-16 lg:gap-10 lg:px-25 lg:pt-15">
        <header className="flex w-full items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-soft lg:p-5">
          <Link to="/" className="shrink-0">
            <img
              src={LOGO}
              alt="BangMod Hackathon 2026"
              className="h-10 w-auto lg:h-[50px] lg:w-[222px]"
            />
          </Link>
          <button
            type="button"
            className="flex shrink-0 items-center justify-center gap-4 rounded-[12px] border border-[#dcdcdc] py-3 pr-4 pl-5 transition-colors hover:border-brand-red"
          >
            <GoogleLogo className="size-[24px]" />
            <span className="hidden text-[20px] leading-[1.4] sm:inline">ชื่อบัญชีผู้ใช้</span>
            <img src={CHEVRON} alt="" aria-hidden className="size-[24px]" />
          </button>
        </header>

        {/* Figma 708:2317 splits the row 816 / 400 with a 24 gutter */}
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
          <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-8 rounded-[20px] bg-white p-4 shadow-soft">
            <div className="flex w-full items-start gap-4">
              <div className="aspect-square shrink-0 self-stretch rounded-2xl bg-[#ebebeb]" />
              <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
                <h1 className="text-[24px] leading-[1.4] font-medium">{TEAM.name}</h1>
                <p className="flex items-center gap-[12px] text-[18px] leading-[1.4]">
                  <span className="text-gray-2">รหัสทีม</span>
                  <span>{TEAM.code}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(TEAM.code)}
                    aria-label="คัดลอกรหัสทีม"
                    className="transition-opacity hover:opacity-60"
                  >
                    <img src={COPY} alt="" aria-hidden className="size-[20px]" />
                  </button>
                </p>
                <p className="flex flex-wrap items-start gap-[12px] text-[18px] leading-[1.4]">
                  <span className="text-gray-2">สถานศึกษา</span>
                  <span>{TEAM.school}</span>
                </p>
              </div>
            </div>

            <div role="tablist" className="flex flex-wrap items-center gap-2">
              {MEMBERS.map((member, i) => {
                const on = i === active
                return (
                  <button
                    key={member.tab}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    /*
                     * Figma draws the selected tab's 2px rule as an inside stroke, so it must
                     * not add to the 43px tab height — hence the absolutely placed bar.
                     */
                    className={`relative flex shrink-0 items-start gap-2 px-3 py-2 text-[18px] leading-normal transition-colors ${
                      on
                        ? 'font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand-red'
                        : 'rounded-2xl bg-white text-gray-2'
                    }`}
                  >
                    <img
                      src={on ? member.icon.on : member.icon.off}
                      alt=""
                      aria-hidden
                      className="size-[24px] shrink-0"
                    />
                    {member.tab}
                  </button>
                )
              })}
            </div>

            <PersonDetails person={person} />
          </div>

          <div className="w-full shrink-0 lg:w-[400px]">
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
            <ModalButton
              href="#"
              className="bg-[#5865f2] text-white"
              icon={<DiscordGlyph size={32} src={DISCORD_32} />}
            >
              รับรหัสเข้าร่วม Discord{' '}
            </ModalButton>
            <ModalButton
              href="#"
              className="bg-[#f6f6f6]"
              icon={<img src={INSTAGRAM_32} alt="" aria-hidden className="size-[32px] shrink-0" />}
            >
              แชร์ไปยัง Instagram
            </ModalButton>
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

import { STATUS_STEPS, TEAM, type StepTone, type TeamStatus } from '../../teamData'

/** Badge skin + glyph per tone, from the designed status cards. */
const BADGE: Record<StepTone, { skin: string; icon: string; size: string }> = {
  ok: {
    skin: 'bg-brand-green/10 border-brand-green/20',
    icon: '/assets/icon-status-check.svg',
    size: 'size-5',
  },
  pending: {
    skin: 'bg-brand-yellow/10 border-brand-yellow/20',
    icon: '/assets/icon-status-dot.svg',
    size: 'size-4',
  },
  alert: {
    skin: 'bg-brand-red/10 border-brand-red/20',
    icon: '/assets/icon-status-alert.svg',
    size: 'size-5',
  },
  failed: {
    skin: 'bg-brand-red/10 border-brand-red/20',
    icon: '/assets/icon-status-close.svg',
    size: 'size-4',
  },
}

const LABEL_COLOR: Record<StepTone, string> = {
  ok: 'text-brand-green',
  pending: 'text-brand-yellow',
  alert: 'text-brand-red',
  failed: 'text-brand-red',
}

const SOCIALS = [
  { icon: '/assets/icon-facebook.svg', label: 'Facebook' },
  { icon: '/assets/icon-instagram.svg', label: 'Instagram' },
]

function Badge({ tone }: { tone: StepTone }) {
  const { skin, icon, size } = BADGE[tone]
  return (
    <span
      className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${skin}`}
    >
      <img src={icon} alt="" aria-hidden className={size} />
    </span>
  )
}

export default function StatusPanel({
  status,
  showDiscord = false,
}: {
  status: TeamStatus
  /** The qualified dashboard also carries the Discord join card. */
  showDiscord?: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-[20px] bg-white p-4 shadow-soft">
        <div>
          <p className="text-lg leading-[1.4] font-medium lg:text-xl">สถานะ</p>
          <p className="text-xs text-gray-2 lg:text-sm">อัปเดตล่าสุดเมื่อ {TEAM.updatedAt}</p>
        </div>

        {STATUS_STEPS[status].map((step) => (
          <div
            key={step.title}
            className="flex flex-col gap-3 rounded-xl border-[0.5px] border-[#dcdcdc] p-2.5"
          >
            <div className="flex gap-3">
              <Badge tone={step.tone} />
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 flex-col">
                    <p className="text-xs font-medium lg:text-sm">{step.title}</p>
                    <p className="text-[11px] text-gray-2 lg:text-xs">{TEAM.updatedAt}</p>
                  </div>
                  {step.label && (
                    <p className={`text-xs lg:text-sm ${LABEL_COLOR[step.tone]}`}>{step.label}</p>
                  )}
                </div>

                {step.rows && (
                  <div className="flex flex-col gap-3">
                    {step.rows.map((row) => (
                      <div key={row.title} className="flex items-center gap-2">
                        <div className="flex flex-1 flex-col">
                          <p className="text-xs lg:text-sm">{row.title}</p>
                          <p className="text-[11px] text-gray-2 lg:text-xs">ชื่อ-สกุล</p>
                        </div>
                        <p className={`text-xs lg:text-sm ${LABEL_COLOR[row.tone]}`}>{row.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {step.contact && (
              <>
                <hr className="border-[#dcdcdc]" />
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-gray-2 lg:text-xs">ติดต่อทีมงาน</p>
                  <div className="flex gap-2">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="flex flex-1 items-center justify-center rounded-[10px] bg-[#f6f6f6] px-4 py-1.5 transition-colors hover:bg-[#ececec]"
                      >
                        <img src={social.icon} alt="" aria-hidden className="size-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showDiscord && (
        <div className="flex flex-col gap-4 rounded-[20px] bg-white p-4 shadow-soft">
          <div>
            <p className="text-lg leading-[1.4] font-medium lg:text-xl">การเข้าแข่งขันรอบคัดเลือก</p>
            <p className="text-xs text-gray-2 lg:text-sm">
              กรุณาเข้าร่วม Discord เพื่อใช้ในการแข่งขัน
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border-[0.5px] border-[#dcdcdc] p-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#5865f2]/20 bg-[#5865f2]/10">
              <img src="/assets/icon-discord.svg" alt="" aria-hidden className="size-4" />
            </span>
            <p className="flex-1 text-xs font-medium lg:text-sm">เข้าร่วม Discord</p>
            <button
              type="button"
              className="rounded-[10px] bg-[#f6f6f6] px-5 py-2 text-xs transition-colors hover:bg-[#ececec] lg:text-sm"
            >
              รับรหัสเข้าร่วม
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

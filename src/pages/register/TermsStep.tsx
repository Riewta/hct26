import { useState } from 'react'
import { Link } from 'react-router-dom'
import WizardShell, { BackButton } from '../../components/form/WizardShell'
import PolicyModal from '../../components/PolicyModal'
import { CONSENTS, REQUIRED_DOCUMENTS } from '../../registrationData'

function Row({
  icon,
  title,
  description,
  rounded,
  children,
}: {
  icon: string
  title: string
  description: string
  rounded?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#dcdcdc] p-3 sm:flex-row sm:items-center sm:gap-4 sm:pr-6">
      <img
        src={icon}
        alt=""
        aria-hidden
        className={`size-10 shrink-0 ${rounded ? 'rounded-lg' : ''}`}
      />
      <div className="flex flex-1 flex-col">
        <p className="text-lg leading-[1.4] font-medium lg:text-xl">{title}</p>
        <p className="text-base text-gray-1 lg:text-lg">{description}</p>
      </div>
      {children}
    </div>
  )
}

/** Radio pair styled as the design's check boxes. */
function ConsentChoice({ name }: { name: string }) {
  const [value, setValue] = useState<'yes' | 'no'>('yes')

  return (
    <div className="flex shrink-0 items-center gap-6 lg:gap-10">
      {(
        [
          ['yes', 'ยอมรับ'],
          ['no', 'ไม่ยอมรับ'],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name={name}
            checked={value === key}
            onChange={() => setValue(key)}
            className="sr-only"
          />
          <span
            className={`flex size-6 items-center justify-center rounded-md ${
              value === key ? 'bg-brand-red' : 'border border-[#dcdcdc]'
            }`}
          >
            <img
              src={value === key ? '/assets/icon-check-on.svg' : '/assets/icon-check-off.svg'}
              alt=""
              aria-hidden
              className="size-4"
            />
          </span>
          <span className="text-lg lg:text-xl">{label}</span>
        </label>
      ))}
    </div>
  )
}

export default function TermsStep() {
  const [openDoc, setOpenDoc] = useState<string | null>(null)
  const [accepted, setAccepted] = useState<string[]>([])

  return (
    <WizardShell
      step={5}
      actions={
        <>
          <BackButton to="/register/entrant/2" />
          <Link
            to="/register/success"
            className="ml-auto flex h-15 items-center rounded-[20px] bg-brand-red px-6 text-lg font-medium text-white transition-opacity hover:opacity-90 lg:text-xl"
          >
            ลงทะเบียนเข้าแข่งขัน
          </Link>
        </>
      }
    >
      <section className="flex flex-col gap-5">
        <h2 className="text-base text-gray-1 lg:text-lg">เอกสารบังคับ</h2>
        <div className="flex flex-col gap-5">
          {REQUIRED_DOCUMENTS.map(({ document, ...doc }) => {
            const isAccepted = accepted.includes(doc.title)
            return (
              <Row key={doc.title} {...doc}>
                <button
                  type="button"
                  onClick={() => setOpenDoc(doc.title)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-lg transition-colors lg:text-xl ${
                    isAccepted
                      ? 'bg-brand-red text-white'
                      : 'bg-brand-red/10 text-brand-red hover:bg-brand-red/20'
                  }`}
                >
                  {isAccepted && (
                    <img
                      src="/assets/icon-check-on.svg"
                      alt=""
                      aria-hidden
                      className="size-4"
                    />
                  )}
                  {isAccepted ? 'ยอมรับแล้ว' : 'อ่านและยอมรับ'}
                </button>
              </Row>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-lg text-gray-1">ความยินยอมเฉพาะเรื่อง</h2>
        <div className="flex flex-col gap-5">
          {CONSENTS.map((consent, i) => (
            <Row key={consent.title} {...consent}>
              <ConsentChoice name={`consent-${i}`} />
            </Row>
          ))}
        </div>
      </section>

      <PolicyModal
        document={REQUIRED_DOCUMENTS.find((d) => d.title === openDoc)?.document ?? null}
        onDecline={() => setOpenDoc(null)}
        onAccept={() => {
          if (openDoc) setAccepted((prev) => [...new Set([...prev, openDoc])])
          setOpenDoc(null)
        }}
      />
    </WizardShell>
  )
}

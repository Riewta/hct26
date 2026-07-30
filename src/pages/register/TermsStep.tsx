import { useState } from 'react'
import WizardShell, { BackButton, SubmitButton } from '../../components/form/WizardShell'
import PolicyModal from '../../components/PolicyModal'
import { CONSENTS, REQUIRED_DOCUMENTS } from '../../registrationData'

const CHECK = '/assets/figma/b197d7a72e66b1f0f4433b649b5ff939426e30c3.svg'

/**
 * Figma 708:1952. Two groups of rounded-16 rows: mandatory documents that open a modal,
 * then per-topic consents answered with a check pair. The consent rows carry 24 of right
 * padding where the document rows carry 12, so the row padding is passed in.
 */
function Row({
  icon,
  title,
  description,
  rounded,
  padding,
  children,
}: {
  icon: string
  title: string
  description: string
  rounded?: boolean
  padding: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex w-full flex-col gap-3 rounded-[16px] border border-[#dcdcdc] sm:flex-row sm:items-center sm:gap-4 ${padding}`}
    >
      <img
        src={icon}
        alt=""
        aria-hidden
        className={`size-10 shrink-0 ${rounded ? 'rounded-[8px] shadow-[0_0_30px_rgba(255,255,255,0.2)]' : ''}`}
      />
      <div className="flex flex-1 flex-col items-start justify-center">
        <p className="text-lg leading-[1.4] font-medium lg:text-xl">{title}</p>
        <p className="text-base leading-[normal] text-gray-1 lg:text-lg">{description}</p>
      </div>
      {children}
    </div>
  )
}

/** Radio pair styled as the design's 24 check boxes — unchecked is an empty outline. */
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
            className={`flex size-6 items-center justify-center rounded-[6px] p-1 ${
              value === key ? 'bg-brand-red' : 'border border-[#dcdcdc]'
            }`}
          >
            {value === key && <img src={CHECK} alt="" aria-hidden className="size-4" />}
          </span>
          <span className="text-lg leading-[1.4] lg:text-xl">{label}</span>
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
      withTomatoes={false}
      blurBehindContent
      actions={
        <>
          <BackButton to="/register/entrant/2" />
          <SubmitButton to="/register/success" label="ลงทะเบียนเข้าแข่งขัน" />
        </>
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <section className="flex w-full flex-col items-start justify-center gap-3">
          <h2 className="text-lg leading-[normal] text-gray-1 lg:text-xl">เอกสารบังคับ</h2>
          <div className="flex w-full flex-col items-start gap-5">
            {REQUIRED_DOCUMENTS.map(({ document, ...doc }) => {
              const isAccepted = accepted.includes(doc.title)
              return (
                <Row key={doc.title} {...doc} padding="p-3">
                  <button
                    type="button"
                    onClick={() => setOpenDoc(doc.title)}
                    className={`flex shrink-0 items-center justify-center gap-2 rounded-[12px] px-6 py-3 text-lg leading-[1.4] transition-colors lg:text-xl ${
                      isAccepted
                        ? 'bg-brand-red text-white'
                        : 'bg-brand-red/10 text-brand-red hover:bg-brand-red/20'
                    }`}
                  >
                    {isAccepted && <img src={CHECK} alt="" aria-hidden className="size-4" />}
                    {isAccepted ? 'ยอมรับแล้ว' : 'อ่านและยอมรับ'}
                  </button>
                </Row>
              )
            })}
          </div>
        </section>

        <section className="flex w-full flex-col items-start justify-center gap-3">
          <h2 className="text-lg leading-[normal] text-gray-1 lg:text-xl">ความยินยอมเฉพาะเรื่อง</h2>
          <div className="flex w-full flex-col items-start gap-5">
            {CONSENTS.map((consent, i) => (
              <Row key={consent.title} {...consent} padding="py-3 pl-3 pr-3 sm:pr-6">
                <ConsentChoice name={`consent-${i}`} />
              </Row>
            ))}
          </div>
        </section>
      </div>

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

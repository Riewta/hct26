import type { ReactNode } from 'react'

const BOX =
  'w-full rounded-xl border-[0.8px] border-[#dcdcdc] p-3 text-base lg:text-lg text-ink placeholder:text-gray-1 focus:border-brand-red focus:outline-none'

export function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-lg font-medium lg:text-xl">{children}</span>
      {required && <span className="text-base text-[#ea4335] lg:text-lg">*</span>}
    </span>
  )
}

type BaseProps = {
  label: string
  required?: boolean
  placeholder?: string
  className?: string
}

export function TextField({ label, required, placeholder, className = '' }: BaseProps) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <Label required={required}>{label}</Label>
      <input type="text" placeholder={placeholder} className={BOX} />
    </label>
  )
}

export function DateField({ label, required, placeholder, className = '' }: BaseProps) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <Label required={required}>{label}</Label>
      <input type="date" placeholder={placeholder} className={BOX} />
    </label>
  )
}

export function TextArea({ label, required, placeholder, className = '' }: BaseProps) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <Label required={required}>{label}</Label>
      <textarea rows={3} placeholder={placeholder} className={`${BOX} resize-y`} />
    </label>
  )
}

export function SelectField({
  label,
  required,
  placeholder,
  options = [],
  className = '',
}: BaseProps & { options?: string[] }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <Label required={required}>{label}</Label>
      <select className={`${BOX} appearance-none bg-white`} defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

/** Section heading with the "ล้าง" reset affordance from the design. */
export function SectionTitle({ title, onClear }: { title: string; onClear?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h2 className="text-2xl leading-[1.4] font-medium lg:text-[28px]">{title}</h2>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex shrink-0 items-center gap-2 text-base text-gray-2 hover:text-ink"
        >
          <img src="/assets/icon-close.svg" alt="" aria-hidden className="size-6" />
          ล้าง
        </button>
      )}
    </div>
  )
}

export function UploadBox({ hint = 'จำกัดขนาดเอกสารไม่เกิน 10 MB (PDF เท่านั้น)' }: { hint?: string }) {
  return (
    <div className="flex w-full flex-col gap-3 md:w-[420px] lg:w-[500px]">
      <label className="flex h-25 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border border-dashed border-[#dcdcdc] hover:border-brand-red">
        <img src="/assets/icon-file-upload.svg" alt="" aria-hidden className="size-6" />
        <span className="text-base font-medium">อัปโหลดไฟล์</span>
        <input type="file" accept="application/pdf" className="hidden" />
      </label>
      <p className="text-base text-gray-1">{hint}</p>
    </div>
  )
}

/** Numbered document requirement + its upload target. */
export function DocumentRow({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
      <p className="flex flex-1 gap-2 text-lg font-medium lg:text-xl">
        <span>{index}.</span>
        <span>{text}</span>
      </p>
      <UploadBox />
    </div>
  )
}

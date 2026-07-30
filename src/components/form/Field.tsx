import type { ReactNode } from 'react'

/**
 * Figma's field primitives (708:1311 and its siblings). Every control is a rounded-12
 * box with a 0.8px #dcdcdc hairline and 12 of padding around an 18px line, and every
 * label pairs a 20px medium name with an 18px red asterisk on a 6 gap.
 */
const BOX =
  'w-full rounded-[12px] border-[0.8px] border-[#dcdcdc] p-3 text-base leading-[normal] lg:text-lg text-ink placeholder:text-gray-1 focus:border-brand-red focus:outline-none'

const ICON = '/assets/figma/'

export function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 leading-[normal]">
      <span className="text-lg leading-[normal] font-medium lg:text-xl">{children}</span>
      {required && <span className="text-base leading-[normal] text-[#ea4335] lg:text-lg">*</span>}
    </span>
  )
}

type BaseProps = {
  label: string
  required?: boolean
  placeholder?: string
  className?: string
}

/** Figma's field group: label over control on an 8 gap. */
function FieldShell({ label, required, className, children }: BaseProps & { children: ReactNode }) {
  return (
    <label className={`flex flex-col items-start gap-2 ${className ?? ''}`}>
      <Label required={required}>{label}</Label>
      {children}
    </label>
  )
}

export function TextField({ label, required, placeholder, className }: BaseProps) {
  return (
    <FieldShell label={label} required={required} className={className}>
      <input type="text" placeholder={placeholder} className={BOX} />
    </FieldShell>
  )
}

/** Figma trails the date control with a calendar glyph. */
export function DateField({ label, required, placeholder, className }: BaseProps) {
  return (
    <FieldShell label={label} required={required} className={className}>
      <span className="relative w-full">
        <input type="date" placeholder={placeholder} className={`${BOX} pr-11`} />
        <img
          src={`${ICON}e2f35dcd983d5c03887288d750b8cab9ac1c240b.svg`}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2"
        />
      </span>
    </FieldShell>
  )
}

/** The only multi-line control in the design is 100 tall and top-aligned. */
export function TextArea({ label, required, placeholder, className }: BaseProps) {
  return (
    <FieldShell label={label} required={required} className={`w-full ${className ?? ''}`}>
      <textarea placeholder={placeholder} className={`${BOX} h-[100px] resize-y`} />
    </FieldShell>
  )
}

export function SelectField({
  label,
  required,
  placeholder,
  options = [],
  className,
}: BaseProps & { options?: string[] }) {
  return (
    <FieldShell label={label} required={required} className={className}>
      <span className="relative w-full">
        <select className={`${BOX} appearance-none bg-white pr-11`} defaultValue="">
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <img
          src={`${ICON}da1c84a7a51ab6256b69963fbe9c03c1607713d3.svg`}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2"
        />
      </span>
    </FieldShell>
  )
}

/** Section heading with the "ล้าง" reset affordance from the design. */
export function SectionTitle({ title, onClear }: { title: string; onClear?: () => void }) {
  return (
    <div className="flex w-full items-start justify-between gap-4">
      <h2 className="text-2xl leading-[1.4] font-medium lg:text-[28px]">{title}</h2>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex shrink-0 items-start gap-2 text-base leading-[normal] text-gray-2 hover:text-ink"
        >
          <img
            src={`${ICON}1b94090585ff7a3b45d6697db4f2aae8ed04747e.svg`}
            alt=""
            aria-hidden
            className="size-6"
          />
          ล้าง
        </button>
      )}
    </div>
  )
}

/** The 500-wide dashed drop target that trails every document requirement. */
export function UploadBox({
  hint = 'จำกัดขนาดเอกสารไม่เกิน 10 MB (PDF เท่านั้น)',
}: {
  hint?: string
}) {
  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-3 lg:w-[500px]">
      <label className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border border-dashed border-[#dcdcdc] hover:border-brand-red">
        <img
          src={`${ICON}1c78acc4a5b86e58e5a95e29c657511e410afedf.svg`}
          alt=""
          aria-hidden
          className="size-6"
        />
        <span className="text-base leading-[normal] font-medium">อัปโหลดไฟล์</span>
        <input type="file" accept="application/pdf" className="hidden" />
      </label>
      <p className="text-base leading-[normal] text-gray-1">{hint}</p>
    </div>
  )
}

/**
 * Numbered document requirement plus its upload target, on Figma's 32 gap. The number
 * is a real `<ol>` marker so the 30 indent and the counter match the design exactly.
 */
export function DocumentRow({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
      <ol start={index} className="min-w-0 flex-1 list-decimal">
        <li className="ms-[30px] text-lg leading-[normal] font-medium lg:text-xl">{text}</li>
      </ol>
      <UploadBox />
    </div>
  )
}

/** Figma's 0.5px section rule. */
export function Separator() {
  return <div aria-hidden className="h-[0.5px] w-full shrink-0 bg-[#dcdcdc]" />
}

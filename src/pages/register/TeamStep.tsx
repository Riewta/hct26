import WizardShell, { NextButton } from '../../components/form/WizardShell'
import { SectionTitle, SelectField, TextField, Label } from '../../components/form/Field'

const F = '/assets/figma/'

/**
 * Figma crops the "นร6" mascot inside its square rather than fitting it, so the two
 * avatars need different treatments even at the same 60 size.
 */
const NR6 = { src: `${F}522303cab6b008daf26c3f0e8e3f2ec214a0c0cf.png`, crop: true }
const NR5 = { src: `${F}b616da517775c0a0c018c7a71c10c07a82eeec55.png`, crop: false }

const TEAM_SIZES = [
  { count: 2, avatars: [NR6, NR5] },
  { count: 3, avatars: [NR5, NR6, NR5] },
]

function Avatar({ crop, src }: { crop: boolean; src: string }) {
  return (
    <span className="relative block size-15 shrink-0 overflow-hidden">
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute max-w-none object-cover"
        style={
          crop
            ? { height: '100%', width: '114.29%', left: '-11.51%', top: 0 }
            : { inset: 0, height: '100%', width: '100%' }
        }
      />
    </span>
  )
}

/** Figma 708:1255 — the shortest step, which is why the shell's card floor is 832. */
export default function TeamStep() {
  return (
    <WizardShell step={1} actions={<NextButton to="/register/advisor" />}>
      <section className="flex w-full flex-col items-center justify-center gap-4">
        <SectionTitle title="ข้อมูลทีม" onClear={() => {}} />

        <div className="flex w-full flex-col items-start gap-8 md:flex-row">
          <div className="flex flex-col items-center justify-center gap-3">
            <label className="flex size-50 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border border-dashed border-[#dcdcdc] hover:border-brand-red">
              <img
                src={`${F}18691121244d1cc30f2fff4bf73c50850cbef49f.svg`}
                alt=""
                aria-hidden
                className="size-6"
              />
              <span className="text-lg leading-[normal]">รูปโปรไฟล์ทีม</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <p className="text-base leading-[normal] text-gray-1">จำกัดขนาดไม่เกิน 5 MB</p>
          </div>

          <div className="flex flex-1 flex-col items-start gap-8">
            <TextField label="ชื่อทีม" required placeholder="มะลิ" className="w-full" />
            <SelectField
              label="สถานศึกษา"
              required
              placeholder="เลือกสถานศึกษา"
              className="w-full"
            />

            <fieldset className="flex w-full flex-col items-start gap-2">
              <legend>
                <Label required>จำนวนนักเรียนในทีม</Label>
              </legend>
              <div className="flex w-full flex-col items-start gap-4 sm:flex-row">
                {TEAM_SIZES.map((size) => (
                  <label
                    key={size.count}
                    className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2.5 overflow-hidden rounded-[12px] border-[0.8px] border-[#dcdcdc] p-3 hover:border-brand-red has-checked:border-brand-red has-checked:bg-brand-red/5"
                  >
                    <input type="radio" name="teamSize" value={size.count} className="sr-only" />
                    <span className="flex w-full items-center justify-center">
                      {size.avatars.map((avatar, i) => (
                        <span
                          key={i}
                          style={{ marginRight: i < size.avatars.length - 1 ? -20 : 0 }}
                        >
                          <Avatar {...avatar} />
                        </span>
                      ))}
                    </span>
                    <span className="text-lg leading-[normal] text-gray-1">{size.count} คน</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </section>
    </WizardShell>
  )
}

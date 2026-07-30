import WizardShell, { NextButton } from '../../components/form/WizardShell'
import { SectionTitle, SelectField, TextField, Label } from '../../components/form/Field'

const TEAM_SIZES = [
  { count: 2, avatars: ['/assets/avatar-a.png', '/assets/avatar-b.png'] },
  {
    count: 3,
    avatars: ['/assets/avatar-b.png', '/assets/avatar-a.png', '/assets/avatar-b.png'],
  },
]

export default function TeamStep() {
  return (
    <WizardShell step={1} actions={<NextButton to="/register/advisor" />}>
      <section className="flex flex-col gap-4">
        <SectionTitle title="ข้อมูลทีม" onClear={() => {}} />

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex shrink-0 flex-col items-center gap-3">
            <label className="flex size-50 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border border-dashed border-[#dcdcdc] hover:border-brand-red">
              <img src="/assets/icon-pic.svg" alt="" aria-hidden className="size-6" />
              <span className="text-lg">รูปโปรไฟล์ทีม</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <p className="text-base text-gray-1">จำกัดขนาดไม่เกิน 5 MB</p>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <TextField label="ชื่อทีม" required placeholder="มะลิ" />
            <SelectField label="สถานศึกษา" required placeholder="เลือกสถานศึกษา" />

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2">
                <Label required>จำนวนนักเรียนในทีม</Label>
              </legend>
              <div className="flex flex-col gap-4 sm:flex-row">
                {TEAM_SIZES.map((size) => (
                  <label
                    key={size.count}
                    className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border-[0.8px] border-[#dcdcdc] p-3 hover:border-brand-red has-checked:border-brand-red has-checked:bg-brand-red/5"
                  >
                    <input type="radio" name="teamSize" value={size.count} className="sr-only" />
                    <span className="flex items-center justify-center">
                      {size.avatars.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          aria-hidden
                          className="size-15 rounded-full"
                          style={{ marginRight: i < size.avatars.length - 1 ? -20 : 0 }}
                        />
                      ))}
                    </span>
                    <span className="text-lg text-gray-1">{size.count} คน</span>
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

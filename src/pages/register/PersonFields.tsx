import {
  DateField,
  SelectField,
  SectionTitle,
  TextArea,
  TextField,
} from '../../components/form/Field'
import { PREFIX_OPTIONS } from '../../registrationData'

/**
 * The person block shared by the advisor and entrant steps. The entrant version
 * adds a date of birth; otherwise the field set is identical.
 */
export default function PersonFields({
  title,
  withBirthDate = false,
}: {
  title: string
  withBirthDate?: boolean
}) {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle title={title} onClear={() => {}} />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <SelectField
            label="คำนำหน้า"
            required
            placeholder="มะลิ"
            options={PREFIX_OPTIONS}
            className="lg:w-[100px] md:shrink-0"
          />
          <TextField label="ชื่อจริง (ภาษาไทย)" required placeholder="มะลิ" className="md:flex-1" />
          <TextField label="ชื่อกลาง (ภาษาไทย)" placeholder="มะลิ" className="md:flex-1" />
          <TextField label="นามสกุล (ภาษาไทย)" required placeholder="มะลิ" className="md:flex-1" />
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <SelectField
            label="คำนำหน้า"
            required
            placeholder="มะลิ"
            options={['Mr.', 'Mrs.', 'Miss']}
            className="lg:w-[100px] md:shrink-0"
          />
          <TextField label="First Name" required placeholder="มะลิ" className="md:flex-1" />
          <TextField label="Middle Name" placeholder="มะลิ" className="md:flex-1" />
          <TextField label="Last Name" required placeholder="มะลิ" className="md:flex-1" />
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {withBirthDate && (
            <DateField
              label="วัน/เดือน/ปีเกิด"
              required
              placeholder="เลือกวันที่"
              className="md:flex-1"
            />
          )}
          <TextField label="อาหารที่แพ้" placeholder="มะลิ" className="md:flex-1" />
          <TextField label="ประเภทอาหารพิเศษ" placeholder="มะลิ" className="md:flex-1" />
          <TextField label="ยาที่แพ้" placeholder="มะลิ" className="md:flex-1" />
        </div>

        <TextArea label="โรคประจำตัว และวิธีปฐมพยาบาลเบื้องต้น" placeholder="รายละเอียด" />
      </div>
    </section>
  )
}

export function ContactFields() {
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle title="ช่องทางติดต่อ" onClear={() => {}} />
      <div className="flex flex-col gap-6 md:flex-row">
        <TextField label="อีเมล" required placeholder="example@email.com" className="md:flex-1" />
        <TextField
          label="เบอร์โทรศัพท์"
          required
          placeholder="080-000-0000"
          className="md:flex-1"
        />
        <TextField label="LINE ID" placeholder="มะลิ" className="md:flex-1" />
      </div>
    </section>
  )
}

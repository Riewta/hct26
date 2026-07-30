import type { Person } from '../../teamData'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <p className="text-xs text-gray-2 lg:text-sm">{label}</p>
      <p className="text-sm lg:text-base">{children}</p>
    </div>
  )
}

export default function PersonDetails({ person }: { person: Person }) {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg leading-[1.4] font-medium lg:text-xl">{person.heading}</h2>

        <div className="flex flex-col gap-4 md:flex-row">
          <Field label="ชื่อ-สกุล">
            <span className="flex gap-3">
              <span>{person.thaiPrefix}</span>
              <span>{person.thaiName}</span>
            </span>
          </Field>
          <Field label="Name">
            <span className="flex gap-3">
              <span>{person.enPrefix}</span>
              <span>{person.enName}</span>
            </span>
          </Field>
          <Field label="วัน/เดือน/ปีเกิด">{person.birthDate}</Field>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Field label="อาหารที่แพ้">-</Field>
          <Field label="ประเภทอาหาร">-</Field>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Field label="ยาที่แพ้">-</Field>
          <Field label="โรคประจำตัวและวิธีปฐมพยาบาลเบื้องต้น">-</Field>
        </div>
      </section>

      <hr className="border-[#dcdcdc]" />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl leading-[1.4] font-medium">2. ข้อมูลติดต่อ</h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <Field label="Email">{person.email}</Field>
          <Field label="เบอร์โทรศัพท์">{person.phone}</Field>
          <Field label="ID LINE">{person.lineId}</Field>
        </div>
      </section>

      <hr className="border-[#dcdcdc]" />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl leading-[1.4] font-medium">3. เอกสาร</h2>
        {person.documents.map((doc) => (
          <div key={doc.label} className="flex flex-col gap-2 md:flex-row md:gap-12">
            <p className="flex-1 text-sm font-light text-gray-2 md:max-w-[450px] lg:text-base">{doc.label}</p>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <img src="/assets/icon-attachment.svg" alt="" aria-hidden className="size-6" />
              <span className="text-sm lg:text-base">{doc.file}</span>
              <span className="text-sm font-light text-gray-2 lg:text-base">{doc.size}</span>
            </a>
          </div>
        ))}
      </section>
    </div>
  )
}

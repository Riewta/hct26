import { Link } from "react-router-dom";
import AuthPageShell from "../components/AuthPageShell";
import { DOCUMENT_GROUPS } from "../data";

const SECTIONS = [
  {
    image: "/assets/req-student.png",
    title: "นักเรียนผู้เข้าแข่งขัน",
    items: 0,
  },
  { image: "/assets/req-teacher.png", title: "อาจารย์", items: 1 },
];

/** The requirement copy differs slightly from the guide page's wording. */
const REQUIREMENTS = [
  [
    "สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับบุคคลที่ไม่ใช่สัญชาติไทย (เฉพาะด้านหน้า) พร้อมเซ็นสำเนาถูกต้อง",
    "สำเนา ปพ.7 (ใบรับรองผลการศึกษา) ฉบับจริงของผู้เข้าแข่งขันแต่ละคน พร้อมเซ็นสำเนาถูกต้อง",
    "รูปถ่ายของนักเรียนผู้เข้าแข่งขัน",
  ],
  DOCUMENT_GROUPS[1].items,
];

export default function Register() {
  return (
    <AuthPageShell>
      <div className="flex flex-1 flex-col gap-8 rounded-t-[32px] bg-white p-6 shadow-soft lg:p-10">
        <h1 className="text-3xl leading-[1.4] font-semibold lg:text-[40px]">
          ลงทะเบียนเข้าแข่งขัน
        </h1>

        <div className="flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <section
              key={section.title}
              className="flex flex-col items-center gap-6 rounded-3xl p-0 md:flex-row md:items-start md:gap-15 md:p-6"
            >
              <img
                src={section.image}
                alt=""
                aria-hidden
                className="size-[140px] shrink-0 object-contain lg:size-[196px]"
              />
              <div className="flex flex-1 flex-col gap-4">
                <h2 className="text-xl leading-[1.4] font-medium lg:text-2xl">
                  {section.title}
                </h2>
                <ul className="ms-[30px] list-disc text-lg leading-[1.5] font-light lg:text-xl">
                  {REQUIREMENTS[section.items].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <Link
          to="/register/team"
          className="flex h-15 w-full items-center justify-center rounded-[20px] bg-brand-red px-6 text-lg font-semibold text-white transition-opacity hover:opacity-90 lg:text-xl"
        >
          ลงทะเบียน
        </Link>
      </div>
    </AuthPageShell>
  );
}

import { Link } from 'react-router-dom'
import AuthPageShell, { ResultCard } from '../../components/AuthPageShell'

export default function SuccessStep() {
  return (
    <AuthPageShell>
      <ResultCard
        image="/assets/mascot-success.png"
        title="ลงทะเบียนเข้าแข่งขันสำเร็จ"
        lines={[
          'กรุณารอทีมงานตรวจสอบข้อมูลและเอกสาร',
          'คุณสามารถตรวจสอบสิทธิ์การเข้าแข่งขันได้ที่ทีมของฉัน',
        ]}
        action={
          <Link
            to="/my-team"
            className="flex h-15 w-full items-center justify-center gap-5 rounded-[20px] bg-brand-red px-6 text-lg font-semibold text-white transition-opacity hover:opacity-90 lg:text-xl"
          >
            <img src="/assets/icon-team.svg" alt="" aria-hidden className="size-7" />
            ไปยังทีมของฉัน
          </Link>
        }
      />
    </AuthPageShell>
  )
}

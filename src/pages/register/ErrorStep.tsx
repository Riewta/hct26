import { Link } from 'react-router-dom'
import AuthPageShell, { ResultCard } from '../../components/AuthPageShell'

export default function ErrorStep() {
  return (
    <AuthPageShell>
      <ResultCard
        image="/assets/mascot-error.png"
        title="ลงทะเบียนเข้าแข่งขันไม่สำเร็จ"
        titleClassName="text-brand-red"
        lines={['เกิดข้อผิดพลาดขึ้นในระหว่างการลงทะเบียน กรุณาลองอีกครั้ง']}
        action={
          <Link
            to="/register/terms"
            className="flex h-15 w-full items-center justify-center rounded-[20px] bg-brand-red px-6 text-lg font-semibold text-white transition-opacity hover:opacity-90 lg:text-xl"
          >
            ลองอีกครั้ง
          </Link>
        }
      />
    </AuthPageShell>
  )
}

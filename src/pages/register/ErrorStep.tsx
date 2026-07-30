import { Link } from 'react-router-dom'
import AuthPageShell, { RESULT_ACTION, ResultCard } from '../../components/AuthPageShell'

/** Figma 708:2260 — the failure state desaturates the page's colour blocks to grey. */
export default function ErrorStep() {
  return (
    <AuthPageShell muted>
      <ResultCard
        image="/assets/figma/88a60428462d844f1f3ed64f3d0783097c2d33ac.png"
        title="ลงทะเบียนเข้าแข่งขันไม่สำเร็จ"
        titleClassName="text-brand-red"
        lines={['เกิดข้อผิดพลาดขึ้นในระหว่างการลงทะเบียน กรุณาลองอีกครั้ง']}
        action={
          <Link to="/register/terms" className={RESULT_ACTION}>
            ลองอีกครั้ง
          </Link>
        }
      />
    </AuthPageShell>
  )
}

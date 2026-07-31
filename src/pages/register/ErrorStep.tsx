import { Link } from 'react-router-dom'
import AuthPageShell, { RESULT_ACTION, ResultCard } from '../../components/AuthPageShell'
import { useAuthLink } from '../../components/form/wizardNav'

/** Figma 708:2260 — the failure state desaturates the page's colour blocks to grey. */
export default function ErrorStep() {
  const authLink = useAuthLink()

  return (
    <AuthPageShell muted>
      <ResultCard
        image="/assets/figma/88a60428462d844f1f3ed64f3d0783097c2d33ac.png"
        title="ลงทะเบียนเข้าแข่งขันไม่สำเร็จ"
        titleClassName="text-brand-red"
        lines={['เกิดข้อผิดพลาดขึ้นในระหว่างการลงทะเบียน กรุณาลองอีกครั้ง']}
        action={
          /* going back into the wizard is a `back` hop: the plate carries the user in and
             the terms step slides in from the left, the mirror of how they left it. */
          <Link {...authLink('/register/terms', 'back')} className={RESULT_ACTION}>
            ลองอีกครั้ง
          </Link>
        }
      />
    </AuthPageShell>
  )
}

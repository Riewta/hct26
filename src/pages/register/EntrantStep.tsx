import { useParams } from 'react-router-dom'
import WizardShell, { BackButton, NextButton } from '../../components/form/WizardShell'
import { DocumentRow } from '../../components/form/Field'
import PersonFields, { ContactFields } from './PersonFields'
import { STUDENT_DOCUMENTS } from '../../registrationData'

/** Entrant 1 is step 3, entrant 2 is step 4; each has an identical form. */
export default function EntrantStep() {
  const { index } = useParams()
  const n = index === '2' ? 2 : 1

  return (
    <WizardShell
      step={n === 1 ? 3 : 4}
      actions={
        <>
          <BackButton to={n === 1 ? '/register/advisor' : '/register/entrant/1'} />
          <NextButton to={n === 1 ? '/register/entrant/2' : '/register/terms'} />
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[1.4] font-medium lg:text-[28px]">
          เอกสารสำหรับผู้เข้าแข่งขันคนที่ {n}
        </h2>
        <div className="flex flex-col gap-6">
          {STUDENT_DOCUMENTS.map((doc, i) => (
            <DocumentRow key={doc} index={i + 1} text={doc} />
          ))}
        </div>
      </section>

      <hr className="border-[#dcdcdc]" />
      <PersonFields title={`ข้อมูลผู้เข้าแข่งขันคนที่ ${n}`} withBirthDate />
      <hr className="border-[#dcdcdc]" />
      <ContactFields />
    </WizardShell>
  )
}

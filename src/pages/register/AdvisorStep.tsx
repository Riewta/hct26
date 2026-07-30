import WizardShell, { BackButton, NextButton } from '../../components/form/WizardShell'
import { DocumentRow } from '../../components/form/Field'
import PersonFields, { ContactFields } from './PersonFields'
import { ADVISOR_DOCUMENTS } from '../../registrationData'

export default function AdvisorStep() {
  return (
    <WizardShell
      step={2}
      actions={
        <>
          <BackButton to="/register/team" />
          <NextButton to="/register/entrant/1" />
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[1.4] font-medium lg:text-[28px]">เอกสารสำหรับอาจารย์</h2>
        <div className="flex flex-col gap-6">
          {ADVISOR_DOCUMENTS.map((doc, i) => (
            <DocumentRow key={doc} index={i + 1} text={doc} />
          ))}
        </div>
      </section>

      <hr className="border-[#dcdcdc]" />
      <PersonFields title="ข้อมูลอาจารย์" />
      <hr className="border-[#dcdcdc]" />
      <ContactFields />
    </WizardShell>
  )
}

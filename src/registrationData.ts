export const PREFIX_OPTIONS = ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง']

export const ADVISOR_DOCUMENTS = [
  'สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า) *',
  'เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำ ในสถานศึกษา เช่น บัตรประจำตัวอาจารย์ บัตรข้าราชการครู หรือหนังสือรับรองจากสถานศึกษา *',
]

export const STUDENT_DOCUMENTS = [
  'รูปถ่ายนักเรียนหน้าตรง ขนาด 1.5 นิ้ว*',
  'สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)*',
  'สำเนา ปพ.7 (ใบรับรองผลการศึกษา) ของผู้เข้าแข่งขันแต่ละคน พร้อมเซ็นสำเนาถูกต้อง*',
]

import { COMPETITION_RULES, PRIVACY_POLICY, type PolicyDocument } from './privacyPolicy'

/**
 * Documents the entrant must read and accept before submitting.
 * `document` is the full text opened in the modal.
 */
export const REQUIRED_DOCUMENTS: {
  icon: string
  title: string
  description: string
  rounded?: boolean
  document: PolicyDocument
}[] = [
  {
    icon: '/assets/icon-hand.svg',
    title: 'นโยบายความเป็นส่วนตัว',
    description: 'การเก็บและใช้ข้อมูลส่วนบุคคลของคุณ',
    document: PRIVACY_POLICY,
  },
  {
    icon: '/assets/icon-document.svg',
    title: 'กฏกติกาการแข่งขัน',
    description: 'หลักเกณฑ์และข้อปฏิบัติในการแข่งขัน',
    document: COMPETITION_RULES,
  },
  {
    icon: '/assets/logo-codern.png',
    title: 'ข้อกำหนดการใช้งาน Codern',
    description: 'เงื่อนไขการใช้งานระบบส่งโค้ดและตรวจผล',
    rounded: true,
    // no Figma node for this document yet; reuses the privacy text as a placeholder
    document: PRIVACY_POLICY,
  },
]

/** Opt-in consents, each answered ยอมรับ / ไม่ยอมรับ. */
export const CONSENTS = [
  {
    icon: '/assets/icon-stethoscope.svg',
    title: 'ความยินยอมข้อมูลสุขภาพ',
    description: 'การเก็บข้อมูลแพ้อาหาร แพ้ยา และโรคประจำตัว',
  },
  {
    icon: '/assets/icon-pencil.svg',
    title: 'คำรับรองความยินยอมจากผู้ปกครอง',
    description: 'สำหรับผู้เข้าแข่งขันอายุต่ำกว่า 20 ปี',
  },
  {
    icon: '/assets/icon-photo-album.svg',
    title: 'ความยินยอมใช้ภาพเพื่อประชาสัมพันธ์',
    description: 'ใช้ภาพถ่าย/วิดีโอในกิจกรรมเพื่อประชาสัมพันธ์',
  },
]

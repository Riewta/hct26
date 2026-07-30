export const TEAM = {
  name: 'ทีม A',
  code: 'BH001/26',
  school: 'บางมดวิทยาคม',
  updatedAt: '26 ก.ค. 69 15:47 น.',
}

export type Person = {
  /** Tab label. */
  tab: string
  icon: string
  /** Heading of the first detail section. */
  heading: string
  thaiPrefix: string
  thaiName: string
  enPrefix: string
  enName: string
  birthDate: string
  email: string
  phone: string
  lineId: string
  documents: { label: string; file: string; size: string }[]
}

const ENTRANT_DOCUMENTS = [
  {
    label: 'รูปถ่ายนักเรียนหน้าตรง ขนาด 1.5 นิ้ว',
    file: 'Photo.pdf',
    size: '7.4 MB',
  },
  {
    label:
      'สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)',
    file: 'IDcard.pdf',
    size: '9.3 MB',
  },
  {
    label: 'สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ของผู้เข้าแข่งขัน พร้อมเซ็นสำเนาถูกต้อง',
    file: 'Transcript.pdf',
    size: '9.3 MB',
  },
]

const ADVISOR_DOCUMENTS = [
  {
    label:
      'สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)',
    file: 'IDcard.pdf',
    size: '7.4 MB',
  },
  {
    label:
      'เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำในสถานศึกษา เช่น บัตรประจำตัวอาจารย์ บัตรข้าราชการครู หรือหนังสือรับรองจากสถานศึกษา',
    file: 'ID.pdf',
    size: '9.3 MB',
  },
]

const SHARED = {
  thaiPrefix: 'นางสาว',
  thaiName: 'ณัฐชา เดชดำรง',
  enPrefix: 'Mrs.',
  enName: 'Natasha Dejdumrong',
  birthDate: '26 กรกฎาคม 2551',
  email: 'abcd.cpe@kmutt.ac.th',
  phone: '0912345678',
  lineId: 'abcd',
}

export const MEMBERS: Person[] = [
  {
    tab: 'ผู้เข้าแข่งขันคนที่ 1',
    icon: '/assets/icon-user.svg',
    heading: '1. ข้อมูลผู้เข้าแข่งขันคนที่ 1',
    ...SHARED,
    documents: ENTRANT_DOCUMENTS,
  },
  {
    tab: 'ผู้เข้าแข่งขันคนที่ 2',
    icon: '/assets/icon-user.svg',
    heading: '1. ข้อมูลผู้เข้าแข่งขันคนที่ 2',
    ...SHARED,
    documents: ENTRANT_DOCUMENTS,
  },
  {
    tab: 'ผู้เข้าแข่งขันคนที่ 3',
    icon: '/assets/icon-user.svg',
    heading: '1. ข้อมูลผู้เข้าแข่งขันคนที่ 3',
    ...SHARED,
    documents: ENTRANT_DOCUMENTS,
  },
  {
    tab: 'อาจารย์',
    icon: '/assets/icon-mortarboard.svg',
    heading: '1. ข้อมูลอาจารย์',
    ...SHARED,
    documents: ADVISOR_DOCUMENTS,
  },
]

/** Badge styles, matching the four icon treatments in the design. */
export type StepTone = 'ok' | 'pending' | 'alert' | 'failed'

export type StatusStep = {
  title: string
  /** Right-hand status label; omitted when the step lists per-person rows instead. */
  label?: string
  tone: StepTone
  /** Per-person review rows shown inside the document-review step. */
  rows?: { title: string; label: string; tone: StepTone }[]
  /** Renders the ติดต่อทีมงาน social row under the step. */
  contact?: boolean
}

export const STATUS_VARIANTS = [
  'reviewing',
  'issue',
  'qualified',
  'selection-pending',
  'selection-failed',
  'semifinal-qualified',
  'semifinal-pending',
  'semifinal-failed',
] as const

export type TeamStatus = (typeof STATUS_VARIANTS)[number]

const REGISTERED: StatusStep = {
  title: 'ลงทะเบียนเข้าร่วม',
  label: 'ลงทะเบียนสำเร็จ',
  tone: 'ok',
}

const DOCS_OK: StatusStep = { title: 'ตรวจสอบเอกสาร', label: 'ตรวจสอบสำเร็จ', tone: 'ok' }

const person = (title: string, label: string, tone: StepTone) => ({ title, label, tone })

/** Every step list in the designed status cards. */
export const STATUS_STEPS: Record<TeamStatus, StatusStep[]> = {
  reviewing: [
    REGISTERED,
    {
      title: 'ตรวจสอบเอกสาร',
      tone: 'pending',
      rows: MEMBERS.map((m) => person(m.tab, 'กำลังตรวจสอบ', 'pending')),
    },
  ],
  issue: [
    REGISTERED,
    {
      title: 'ตรวจสอบเอกสาร',
      tone: 'alert',
      rows: [
        ...MEMBERS.slice(0, 3).map((m) => person(m.tab, 'ตรวจสอบสำเร็จ', 'ok')),
        person('อาจารย์', 'เอกสารมีปัญหา', 'alert'),
      ],
      contact: true,
    },
  ],
  qualified: [
    REGISTERED,
    DOCS_OK,
    { title: 'การเข้าแข่งขันรอบคัดเลือก', label: 'ผ่านการคัดเลือก', tone: 'ok' },
  ],
  'selection-pending': [
    REGISTERED,
    DOCS_OK,
    { title: 'การเข้าแข่งขันรอบคัดเลือก', label: 'กำลังสรุปผล', tone: 'pending' },
  ],
  'selection-failed': [
    REGISTERED,
    DOCS_OK,
    { title: 'การเข้าแข่งขันรอบคัดเลือก', label: 'ไม่ผ่านการคัดเลือก', tone: 'failed' },
  ],
  'semifinal-qualified': [
    REGISTERED,
    DOCS_OK,
    { title: 'การเข้าแข่งขันรอบคัดเลือก', label: 'ผ่านการคัดเลือก', tone: 'ok' },
    { title: 'การเข้าแข่งขันรอบรองชนะเลิศ', label: 'ผ่านการคัดเลือก', tone: 'ok' },
  ],
  'semifinal-pending': [
    REGISTERED,
    DOCS_OK,
    { title: 'การเข้าแข่งขันรอบคัดเลือก', label: 'ผ่านการคัดเลือก', tone: 'ok' },
    { title: 'การเข้าแข่งขันรอบรองชนะเลิศ', label: 'กำลังสรุปผล', tone: 'pending' },
  ],
  'semifinal-failed': [
    REGISTERED,
    DOCS_OK,
    { title: 'การเข้าแข่งขันรอบคัดเลือก', label: 'ผ่านการคัดเลือก', tone: 'ok' },
    { title: 'การเข้าแข่งขันรอบรองชนะเลิศ', label: 'ไม่ผ่านการคัดเลือก', tone: 'failed' },
  ],
}

export const QUALIFIED_MODAL = {
  image: '/assets/mascot-success.png',
  title: 'ทีมของคุณมีสิทธิ์เข้าแข่งขันรอบคัดเลือก',
  lines: [
    'ขอแสดงความยินดีกับทีมของคุณ',
    'กรุณาเข้าร่วม Discord สำหรับใช้ในการแข่งขันรอบคัดเลือก',
  ],
}

export const REJECTED_MODAL = {
  image: '/assets/mascot-error.png',
  title: 'ทีมของคุณไม่มีสิทธิ์เข้าแข่งขันรอบคัดเลือก',
  lines: [
    'ขออภัยทีม เอกสารของทีมของคุณไม่ผ่านเกณฑ์การพิจารณา',
    'แล้วพบกันใหม่ในการแข่งขันครั้งหน้า',
  ],
}

import { CODERN_PARAGRAPHS } from '../aboutData'
import { useReveal } from '../hooks/useReveal'

export default function CodernSection() {
  const card = useReveal()

  return (
    <section id="codern" className="relative overflow-hidden px-4 py-20 lg:px-15 lg:py-30">
      {/* soft glow behind the card, standing in for the blurred circle in Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 -z-10 size-[1100px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-yellow/10 blur-[200px]"
      />

      <div
        ref={card.ref}
        className={`mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-white shadow-soft ${card.cls}`}
      >
        <img
          src="/assets/codern-screenshot.png"
          alt="หน้าจอแพลตฟอร์ม Codern"
          className="aspect-[1954/1154] w-full object-cover"
        />
        <div className="flex flex-col gap-5 p-6 lg:p-10">
          <p className="text-lg leading-[1.5] font-medium text-brand-yellow lg:text-2xl">02</p>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl leading-[1.4] font-semibold lg:text-5xl">แพลตฟอร์ม Codern</h2>
            <div className="flex flex-col gap-6 text-base leading-[1.5] font-light lg:text-2xl">
              {CODERN_PARAGRAPHS.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

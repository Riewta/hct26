export default function SectionHeader({
  number,
  title,
  description,
  light = false,
}: {
  number: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    // Figma: number 36 tall, title 20 below it, description only 4 below the title.
    <header className="flex w-full flex-col gap-[calc(12px_+_8*var(--fl))]">
      <p
        className={`fl-eyebrow leading-[1.5] font-medium ${light ? 'text-white' : 'text-brand-yellow'}`}
      >
        {number}
      </p>
      {/* the gap closes as the type grows — 8 at 375, the design's 4 at 1440 */}
      <div className="flex flex-col gap-[calc(8px_-_4*var(--fl))]">
        <h2
          className={`fl-section leading-[1.4] font-semibold ${light ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`fl-lead leading-[1.5] font-light ${light ? 'text-white' : 'text-ink'}`}>
            {description}
          </p>
        )}
      </div>
    </header>
  )
}

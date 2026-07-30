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
    <header className="flex w-full flex-col gap-3 lg:gap-5">
      <p
        className={`text-lg leading-[1.5] font-medium lg:text-2xl ${light ? 'text-white' : 'text-brand-yellow'}`}
      >
        {number}
      </p>
      <div className="flex flex-col gap-2 lg:gap-1">
        <h2
          className={`text-3xl leading-[1.4] font-semibold lg:text-5xl ${light ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-base leading-[1.5] font-light lg:text-2xl ${light ? 'text-white' : 'text-ink'}`}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  )
}

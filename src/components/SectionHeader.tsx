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
    <header className="flex w-full flex-col gap-3 lg:gap-5">
      <p
        className={`text-lg font-medium lg:text-2xl ${light ? 'text-white' : 'text-brand-yellow'}`}
      >
        {number}
      </p>
      <h2
        className={`text-3xl leading-[1.4] font-semibold lg:text-5xl ${light ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base font-light lg:text-2xl ${light ? 'text-white' : 'text-ink'}`}>
          {description}
        </p>
      )}
    </header>
  )
}

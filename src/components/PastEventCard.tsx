import Mark2024 from './Mark2024'
import type { PastEvent } from '../pastEventsData'

export default function PastEventCard({ event }: { event: PastEvent }) {
  return (
    <article className="relative overflow-hidden rounded-[40px] p-6 lg:p-10">
      <img
        src={event.photo}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover"
      />
      {/* dark scrim so the white copy stays legible over the photo */}
      <div aria-hidden className="absolute inset-0 bg-ink/55 backdrop-blur-[10px]" />

      <div className="relative flex flex-col gap-8 text-white md:flex-row md:gap-[73px]">
        <div className="w-[180px] shrink-0 lg:w-[300px]">
          {event.mark ? (
            <img src={event.mark} alt={`โลโก้ ${event.title}`} className="w-full" />
          ) : (
            <Mark2024 />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-8 lg:gap-[73px]">
          <header className="flex flex-col gap-4 lg:gap-6">
            <h3 className="text-2xl leading-[1.4] font-medium lg:text-3xl">{event.title}</h3>
            <p className="text-lg leading-[1.5] font-light lg:text-2xl">{event.subtitle}</p>
          </header>

          <dl className="flex flex-col gap-6 lg:gap-8">
            {event.awards.map((award) => (
              <div key={award.label} className="flex flex-col gap-2 lg:gap-4">
                <dt className="text-2xl leading-[1.4] font-medium lg:text-3xl">{award.label}</dt>
                {award.winners.map((winner) => (
                  <dd key={winner} className="text-lg leading-[1.5] font-light lg:text-2xl">
                    {winner}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  )
}

import { Link } from 'react-router-dom'
import { FOOTER_ABOUT, FOOTER_GROUPS, SOCIAL_LINKS } from '../data'

export default function Footer() {
  return (
    <footer className="rounded-t-3xl bg-white px-4 pt-15 pb-25 lg:px-15">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex max-w-[600px] flex-col justify-between gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/">
                <img
                  src="/assets/logo-nav.png"
                  alt="BangMod Hackathon 2026"
                  className="h-[60px] w-auto"
                />
              </Link>
              <span aria-hidden className="h-12 w-px bg-ink" />
              <img
                src="/assets/logo-kmutt.svg"
                alt="มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี"
                className="h-12 w-auto"
              />
              <span aria-hidden className="h-12 w-px bg-ink" />
              <img
                src="/assets/logo-alt.svg"
                alt="ภาควิชาวิศวกรรมคอมพิวเตอร์"
                className="h-7 w-auto"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg leading-[1.4]">{FOOTER_ABOUT.title}</p>
              <p className="text-base leading-[1.5] text-gray-1">{FOOTER_ABOUT.body}</p>
            </div>
          </div>

          <p className="text-xs leading-[1.5] font-light text-gray-1">
            {FOOTER_ABOUT.copyright}
          </p>
        </div>

        <div className="flex max-w-[500px] flex-wrap gap-10 lg:gap-20">
          {FOOTER_GROUPS.map((column, i) => (
            <div key={i} className="flex min-w-[200px] flex-col gap-10">
              {column.map((group) => (
                <div key={group.heading} className="flex flex-col gap-3">
                  <p className="text-lg leading-[1.4] text-gray-2">{group.heading}</p>
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-base leading-[1.4] transition-colors hover:text-brand-red"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}

              {/* contact sits under the second column in the design */}
              {i === 1 && (
                <div className="flex flex-col gap-3">
                  <p className="text-lg leading-[1.4] text-gray-2">ติดต่อเรา</p>
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center gap-2.5 text-base leading-[1.4]"
                    >
                      <img src={social.icon} alt="" aria-hidden className="size-6" />
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

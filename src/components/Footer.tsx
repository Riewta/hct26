import { Link } from 'react-router-dom'
import { FOOTER_ABOUT, FOOTER_GROUPS, SOCIAL_LINKS } from '../data'

/** Figma's own exports of the two social glyphs, keyed by the label in `SOCIAL_LINKS`. */
const SOCIAL_ICON: Record<string, string> = {
  Facebook: '/assets/figma/5c123061e989ef51ad620866b56d6b0d63f2dc8c.svg',
  Instagram: '/assets/figma/ec7b502700ce8ac7dfcae9fe51fa39883e998853.svg',
}

export default function Footer() {
  return (
    <footer className="rounded-3xl bg-white px-4 pt-15 pb-25 lg:px-15">
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
                src="/assets/figma/334492fe4cb116291b1b34c10e03a9aa49cd8960.svg"
                alt="มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี"
                className="h-12 w-[211px]"
              />
              <span aria-hidden className="h-12 w-px bg-ink" />
              {/*
               * Figma clips this mark to a 57x28 window with the drawing overflowing every
               * edge — what you see is a crop of a 65x44.9 artwork, not the whole thing
               * scaled to fit, which is why fitting it by height comes out too narrow.
               */}
              <span className="relative block h-7 w-[57px] shrink-0 overflow-hidden">
                <img
                  src="/assets/figma/b1f497a79771a763f521a081e6006d3a027a793f.svg"
                  alt="ภาควิชาวิศวกรรมคอมพิวเตอร์"
                  className="absolute inset-[-30.12%_-7%_-30.35%_-7.09%] max-w-none"
                />
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg leading-[1.4]">{FOOTER_ABOUT.title}</p>
              <p className="text-base leading-[1.5] text-gray-1">{FOOTER_ABOUT.body}</p>
            </div>
          </div>

          <p className="text-xs leading-[1.5] font-light text-gray-1">{FOOTER_ABOUT.copyright}</p>
        </div>

        {/* Figma: a 500 block of two flush 250 columns, not a gapped pair */}
        <div className="flex flex-wrap gap-10 lg:grid lg:w-[500px] lg:grid-cols-2 lg:gap-0">
          {FOOTER_GROUPS.map((column, i) => (
            <div key={i} className="flex min-w-[200px] flex-col gap-10 lg:min-w-0 lg:w-[250px]">
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
                      <img
                        src={SOCIAL_ICON[social.label] ?? social.icon}
                        alt=""
                        aria-hidden
                        className="size-6"
                      />
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

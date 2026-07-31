import { Link } from 'react-router-dom'
import { FOOTER_ABOUT, FOOTER_GROUPS, SOCIAL_LINKS } from '../data'

export default function Footer() {
  return (
    <footer className="shell-wide rounded-3xl bg-white pt-[calc(40px_+_20*var(--fl))] pb-[calc(64px_+_36*var(--fl))]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex max-w-[600px] flex-col justify-between gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/" className="mm-press">
                <img
                  src="/assets/logo-nav.png"
                  alt="BangMod Hackathon 2026"
                  className="h-[calc(44px_+_16*var(--fl))] w-auto"
                />
              </Link>
              <span aria-hidden className="h-[calc(36px_+_12*var(--fl))] w-px bg-ink" />
              <img
                src="/assets/figma/334492fe4cb116291b1b34c10e03a9aa49cd8960.svg"
                alt="มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี"
                className="h-[calc(36px_+_12*var(--fl))] w-[calc((36px_+_12*var(--fl))*4.3958)]"
              />
              <span aria-hidden className="h-[calc(36px_+_12*var(--fl))] w-px bg-ink" />
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
              <p className="fl-18 leading-[1.4]">{FOOTER_ABOUT.title}</p>
              <p className="fl-16 leading-[1.5] text-gray-1">{FOOTER_ABOUT.body}</p>
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
                  <p className="fl-18 leading-[1.4] text-gray-2">{group.heading}</p>
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="mm-link mm-press inline-block fl-16 leading-[1.4] hover:text-brand-red"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}

              {/* contact sits under the second column in the design */}
              {i === 1 && (
                <div className="flex flex-col gap-3">
                  <p className="fl-18 leading-[1.4] text-gray-2">ติดต่อเรา</p>
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="mm-link mm-press flex items-center gap-2.5 fl-16 leading-[1.4] hover:text-brand-red"
                    >
                      {/* the glyph swells slightly with the row so the whole line, not just
                          the label, acknowledges the hover */}
                      <img src={social.icon} alt="" aria-hidden className="mm-icon-pop size-6" />
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

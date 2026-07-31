import { Link } from 'react-router-dom'
import { FOOTER_ABOUT, FOOTER_GROUPS, SOCIAL_LINKS } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Footer() {
  /*
   * G7 — the footer closes all three marketing pages and was the only band on any of them
   * that simply appeared. Both columns arrive, 70ms apart, which is the ladder every other
   * row on these pages uses.
   *
   * A reveal each rather than one `reveal-group` on the row. From `lg` up the two columns are
   * side by side and share a trigger, so the ladder reads exactly as a group's would; below
   * `lg` they stack into a band taller than the phone viewport, and one trigger put the link
   * columns at 1.08–1.15 of the viewport at the frame they were told to animate — the same
   * defect the prize and scope grids had. The delay is inline as `--reveal-delay`, which is
   * spent only on the reveal's own opacity and transform (index.css).
   *
   * Opacity and transform only, which is all the reveal animates: the desktop footer's
   * geometry is frozen (see the notes below on the 500 block and `lg:w-full`) and nothing
   * here may touch a length.
   */
  const about = useReveal()
  const links = useReveal()

  return (
    /* `relative` so the footer joins the positioned paint step: the page's decoration canvas
       is `-z-10` but a static footer still paints before any positioned box, so any future
       overshoot would land on top of this text instead of behind it.
       `site-footer` names it for the marketing page transition — it is the same element on
       all three pages, so it holds still while the body above it changes. */
    <footer className="site-footer relative shell-wide rounded-3xl bg-white pt-[calc(40px_+_20*var(--fl))] pb-[calc(64px_+_36*var(--fl))]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 lg:flex-row lg:justify-between">
        <div
          ref={about.ref}
          className={`flex max-w-[600px] flex-col justify-between gap-8 ${about.cls}`}
        >
          {/*
           * Below `lg` every mark in this identity row steps down. Nothing here is a `lg:`
           * override for its own sake: at the ramp's own narrow end the row needed 358 of a
           * 328 content column on a 360 phone, so it wrapped — and it wrapped after the FIRST
           * rule, which left a lone vertical bar hanging off the end of line one and the two
           * university marks stranded on line two. Three marks separated by rules only read
           * as one lockup while they are on one line. At 32 / 21 / 20 the row measures 309
           * and stays intact at 360, and from `lg` up every value is the one that was here
           * before, so the desktop footer is untouched.
           */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 lg:gap-3">
              <Link to="/" viewTransition className="mm-press shrink-0">
                <img
                  src="/assets/logo-nav.png"
                  alt="BangMod Hackathon 2026"
                  className="h-8 w-auto lg:h-[calc(44px_+_16*var(--fl))]"
                />
              </Link>
              <span
                aria-hidden
                className="h-5 w-px shrink-0 bg-ink lg:h-[calc(36px_+_12*var(--fl))]"
              />
              <img
                src="/assets/figma/334492fe4cb116291b1b34c10e03a9aa49cd8960.svg"
                alt="มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี"
                className="h-[21px] w-[92.31px] shrink-0 lg:h-[calc(36px_+_12*var(--fl))] lg:w-[calc((36px_+_12*var(--fl))*4.3958)]"
              />
              <span
                aria-hidden
                className="h-5 w-px shrink-0 bg-ink lg:h-[calc(36px_+_12*var(--fl))]"
              />
              {/*
               * Figma clips this mark to a 57x28 window with the drawing overflowing every
               * edge — what you see is a crop of a 65.02x44.92 artwork, not the whole thing
               * scaled to fit, which is why fitting it by height comes out too narrow.
               *
               * Sized with an explicit percentage width and height rather than by an inset
               * pair. `inset` cannot size a REPLACED element: for an absolutely positioned
               * image with `width: auto`, the used width is the intrinsic width and the
               * `right` offset is simply dropped as over-constrained. At the Figma window
               * that went unnoticed, because 57 x 1.1406 and 28 x 1.6044 come out at exactly
               * the intrinsic 65.02x44.92 — the inset pair and the artwork agreed by
               * construction. The moment the window shrank for the phone row the drawing
               * stayed at full size and the window showed only the left 63% of it, which is
               * why "cpe" came out as "cq". As percentages of the window the crop is a real
               * ratio and holds at any size; at 57x28 it resolves to the same numbers as
               * before, so the desktop mark is unchanged to the hundredth of a pixel.
               */}
              <span className="relative block h-5 w-[40.71px] shrink-0 overflow-hidden lg:h-7 lg:w-[57px]">
                <img
                  src="/assets/figma/b1f497a79771a763f521a081e6006d3a027a793f.svg"
                  alt="ภาควิชาวิศวกรรมคอมพิวเตอร์"
                  className="absolute top-[-30.12%] left-[-7.09%] h-[160.4353%] w-[114.0625%] max-w-none"
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

        {/*
         * Figma: a 500 block of two flush 250 columns, not a gapped pair.
         *
         * Below `lg` it is the same two columns rather than a wrap. `flex-wrap` with a 200
         * floor could only ever produce one column on a phone, which stacked all four link
         * groups into a 700px ladder — the footer was 970 tall at 390, a fifth of the whole
         * page, and the last thing on it was two social links a long way from anything. Two
         * real columns halve that and keep the desktop's own pairing.
         */}
        <div
          ref={links.ref}
          style={{ '--reveal-delay': '70ms' } as React.CSSProperties}
          className={`grid grid-cols-2 gap-x-6 gap-y-10 lg:w-[500px] lg:gap-0 ${links.cls}`}
        >
          {FOOTER_GROUPS.map((column, i) => (
            /*
             * `lg:w-full` and not `lg:w-[250px]`. The grid is 500 with two columns and no
             * gap, so at 1440 `w-full` IS 250 — but between 1024 and 1159 the 500 does not
             * hold: this block sits in a `justify-between` row beside a 600 one, so it
             * shrinks to as little as 306, and a hard 250 then made each column 97px wider
             * than its own track. Both columns overflowed, the right one past the viewport,
             * and that was the entire horizontal overflow the page had at 1024 — present on
             * every route, and there before this round. Sizing from the track cannot do it.
             */
            <div key={i} className="flex min-w-0 flex-col gap-10 lg:w-full">
              {column.map((group) => (
                <div key={group.heading} className="flex flex-col gap-3">
                  <p className="fl-18 leading-[1.4] text-gray-2">{group.heading}</p>
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      /* A page transition for the page links, and none for the fragment
                         links. `/#calendar` and `/guide#faq` do not change what is on
                         screen so much as where you are in it, and their whole point is the
                         smooth scroll `data-fragment-nav` gives them (index.css) — wrapping
                         a scroll in a snapshot cross-fade hides the very motion that says
                         you moved down the page. */
                      viewTransition={!link.to.includes('#')}
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

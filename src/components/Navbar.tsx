import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ScrollEdgeEffect from './ScrollEdgeEffect'
import { NAV_LINKS } from '../data'

/** Past this many px the nav is over content rather than over the top of the page. */
const SCROLLED_AT = 24

export default function Navbar() {
  const [open, setOpen] = useState(false)

  /*
   * G16 — the chrome had one appearance for the whole of every page. `ScrollEdgeEffect`
   * was mounted unconditionally, so at scroll 0 a seven-layer `backdrop-filter` stack was
   * blurring nothing (there is no content under the nav yet) and the pill sat flat on the
   * page looking exactly as it does 4000px down.
   *
   * rAF-throttled and `passive`, because this fires on every wheel tick: the listener only
   * records that a frame is pending, and the single read happens inside the frame. The
   * state is a boolean, so React re-renders twice per visit to the top of a page, not per
   * scroll event. The band's fade and the pill's shadow are both CSS off `data-scrolled`
   * (micro-motion.css) — nothing here writes a style.
   */
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        setScrolled(window.scrollY > SCROLLED_AT)
      })
    }

    onScroll() // a deep link or a restored position can start the page already scrolled
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * G9 — the active item was a `font-semibold` snap and nothing else, which also reflowed
   * the label's own width as it landed. The weight stays (it is what Figma draws); the
   * underline is what makes the change a movement between two places instead of a swap.
   *
   * One element positioned by a transform, exactly as the dashboard's tab rule is measured
   * (pages/MyTeam.tsx): a border redrawn under whichever link is active reads as two
   * separate marks appearing, not as one travelling. Measured off the live anchor rather
   * than off its grid cell — the cells are 177.33 centres and every Thai label overhangs
   * its own cell, so the cell's width is not the label's.
   *
   * `useLayoutEffect` and a `ResizeObserver`: the row appears at `md` and every figure in it
   * rides `--fl`, so the bar has to be re-measured on any width change, and it has to be
   * measured before paint or the first frame shows it at the wrong width.
   */
  const { pathname } = useLocation()
  const listRef = useRef<HTMLUListElement>(null)
  const [bar, setBar] = useState<{ x: number; y: number; w: number } | null>(null)
  const active = NAV_LINKS.findIndex((link) => link.to === pathname)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || active < 0) {
      setBar(null)
      return
    }

    const measure = () => {
      const item = list.children[active]?.firstElementChild as HTMLElement | undefined
      if (!item) return
      setBar({ x: item.offsetLeft, y: item.offsetTop + item.offsetHeight + 2, w: item.offsetWidth })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [active])

  return (
    <div
      data-scrolled={scrolled}
      className="shell-wide fixed inset-x-0 top-0 z-50 pt-[calc(16px_+_24*var(--fl))]"
    >
      {/*
       * Figma's band is 160 tall against a 183-tall nav row on a 1440 frame — a fifth of the
       * viewport height there. Held at 160 on a 390x844 phone the same band is a *third* of
       * the screen and the pill only fills its top half, so the remainder sat as a grey wash
       * over whatever the page put below the nav: at 390 it was mushing the calendar's own
       * section heading. The band now tracks the nav row it belongs to.
       */}
      <ScrollEdgeEffect className="site-nav-band absolute inset-x-0 top-0 h-[calc(92px_+_68*var(--fl))]" />

      {/* `site-nav` is both the scrolled-state hook and the view-transition name: this pill
          is the same element on all three marketing pages, so it should not move when one
          becomes another. See micro-motion.css. */}
      <nav className="site-nav relative mx-auto flex max-w-[1320px] items-center justify-between gap-6 rounded-[100px] bg-white py-4 pr-4 pl-[calc(20px_+_20*var(--fl))] shadow-soft">
        <NavLink to="/" viewTransition className="mm-press shrink-0">
          <img
            src="/assets/logo-nav.png"
            alt="BangMod Hackathon 2026"
            className="h-[calc(32px_+_8*var(--fl))] w-auto"
          />
        </NavLink>

        {/*
         * Figma spaces the three labels on 177.33 centres — three 97.33 cells 80 apart.
         * The labels are wider than their cells and overhang symmetrically, so each one
         * gets a centred, non-wrapping cell rather than being packed by its own width.
         * Both the cell and the gap ride the ramp, which is what lets the row appear from
         * `md` up: at 1024 the old layout jumped straight from a hamburger to full 80-apart
         * desktop spacing, and the tablet band had room for the links all along.
         */}
        <ul
          ref={listRef}
          className="relative hidden items-center md:grid md:grid-cols-3 md:gap-[calc(12px_+_68*var(--fl))]"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.to} className="flex justify-center md:w-[calc(64px_+_33.33*var(--fl))]">
              <NavLink
                to={link.to}
                viewTransition
                className={({ isActive }) =>
                  `mm-link mm-press fl-nav leading-[1.4] whitespace-nowrap hover:text-brand-red ${
                    isActive ? 'font-semibold' : 'font-normal'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Absolutely positioned, so it is out of flow and never becomes a fourth track
              in the three-column grid.
             `site-nav-indicator` is a view-transition name of its own, because the pill it
              lives in is PINNED across a marketing hop: inside a pinned snapshot the bar
              would jump to the new label instead of travelling to it. Named separately, the
              browser interpolates its box between the two snapshots and the travel happens
              during the page transition rather than after it. */}
          {bar && (
            <span
              aria-hidden
              className="mm-indicator site-nav-indicator absolute top-0 left-0 h-[2px] rounded-full bg-brand-red"
              style={{ width: bar.w, transform: `translate(${bar.x}px, ${bar.y}px)` }}
            />
          )}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/signin"
            className="mm-press fl-nav hidden rounded-[100px] bg-brand-red px-[calc(14px_+_26*var(--fl))] py-[calc(8px_+_4*var(--fl))] leading-[1.4] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 sm:block"
          >
            ลงทะเบียน
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="เมนู"
            className="mm-press-icon flex size-11 items-center justify-center rounded-full bg-brand-red text-white md:hidden"
          >
            {/* both glyphs are stacked and cross-faded, so the button never reflows
                mid-swap and the bars appear to rotate into the cross */}
            <span
              aria-hidden
              data-on={open}
              className="mm-swap mm-swap-rotate size-6 text-xl leading-none"
            >
              <span className="mm-swap-off">☰</span>
              <span className="mm-swap-on">✕</span>
            </span>
          </button>
        </div>
      </nav>

      {/*
       * The panel stays mounted so closing animates too — unmounting on close would make
       * the menu snap shut. The collapsed row is 0fr with the panel's top margin inside
       * it, so a closed menu takes no space and cannot be clicked or tabbed into.
       */}
      <div
        className={`mm-collapse relative mx-auto max-w-[1320px] md:hidden ${open ? 'is-open' : ''}`}
      >
        <ul inert={!open} className="mt-3 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                viewTransition
                onClick={() => setOpen(false)}
                className="mm-link mm-press block text-lg hover:text-brand-red"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="mm-press block rounded-[100px] bg-brand-red px-8 py-3 text-center text-lg font-bold text-white"
            >
              ลงทะเบียน
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

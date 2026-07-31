import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ScrollEdgeEffect from './ScrollEdgeEffect'
import { NAV_LINKS } from '../data'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="shell-wide fixed inset-x-0 top-0 z-50 pt-[calc(16px_+_24*var(--fl))]">
      <ScrollEdgeEffect className="absolute inset-x-0 top-0 h-40" />

      <nav className="relative mx-auto flex max-w-[1320px] items-center justify-between gap-6 rounded-[100px] bg-white py-4 pr-4 pl-[calc(20px_+_20*var(--fl))] shadow-soft">
        <NavLink to="/" className="mm-press shrink-0">
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
        <ul className="hidden items-center md:grid md:grid-cols-3 md:gap-[calc(12px_+_68*var(--fl))]">
          {NAV_LINKS.map((link) => (
            <li key={link.to} className="flex justify-center md:w-[calc(64px_+_33.33*var(--fl))]">
              <NavLink
                to={link.to}
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

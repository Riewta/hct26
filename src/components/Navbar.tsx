import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../data'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-15 lg:pt-10">
      {/* "Scroll Edge Effect - Soft": blurred white that fades out downwards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-white/90 backdrop-blur-[30px]"
        style={{
          maskImage: 'linear-gradient(to bottom, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
        }}
      />

      <nav className="relative mx-auto flex max-w-[1320px] items-center justify-between gap-6 rounded-[100px] bg-white py-4 pr-4 pl-6 shadow-soft lg:pl-10">
        <NavLink to="/" className="shrink-0">
          <img
            src="/assets/logo-nav.png"
            alt="BangMod Hackathon 2026"
            className="h-8 w-auto lg:h-10"
          />
        </NavLink>

        <ul className="hidden items-center gap-10 lg:flex xl:gap-20">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-xl leading-[1.4] transition-colors hover:text-brand-red ${
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
            className="hidden rounded-[100px] bg-brand-red px-10 py-3 text-xl leading-[1.4] font-bold text-white transition-opacity hover:opacity-90 sm:block"
          >
            ลงทะเบียน
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="เมนู"
            className="flex size-11 items-center justify-center rounded-full bg-brand-red text-white lg:hidden"
          >
            <span className="text-xl leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="relative mx-auto mt-3 flex max-w-[1320px] flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft lg:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} onClick={() => setOpen(false)} className="text-lg">
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="block rounded-[100px] bg-brand-red px-8 py-3 text-center text-lg font-bold text-white"
            >
              ลงทะเบียน
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

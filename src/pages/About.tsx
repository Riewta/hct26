import { AboutDecorBack, AboutDecorFront } from '../components/AboutDecor'
import ScopeSection from '../components/ScopeSection'
import CodernSection from '../components/CodernSection'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'

/**
 * Figma positions this page's decorations against the 1440 page frame rather than inside
 * the sections, so the four sections share one positioning context whose top is the
 * frame's y = 0. `isolate` keeps the two decoration layers — one behind the sections, one
 * over them, as Figma stacks them — from escaping into the site chrome.
 */
export default function About() {
  return (
    <div className="relative isolate">
      <AboutDecorBack />
      <ScopeSection />
      <CodernSection />
      <FaqSection />
      <ContactSection />
      <AboutDecorFront />
    </div>
  )
}

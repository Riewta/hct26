import HomeBackground from '../components/HomeBackground'
import Hero from '../components/Hero'
import Calendar from '../components/Calendar'
import Steps from '../components/Steps'
import Prizes from '../components/Prizes'

/**
 * Figma paints this page's decorations in one background frame anchored to the 1440 page
 * frame rather than inside the sections, so the four sections share one positioning
 * context whose top is the frame's y = 0. `isolate` keeps the decoration layer from
 * escaping behind the site chrome.
 */
export default function Home() {
  return (
    <div className="relative isolate">
      <HomeBackground />
      <Hero />
      <Calendar />
      <Steps />
      <Prizes />
    </div>
  )
}

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
    /*
     * `lg:min-h-[5178px]` is the height of the Figma background frame (935:451). The canvas
     * is absolutely positioned, so it contributes no height of its own; without a floor here
     * the content measures ~4690 and the footer climbs to 4937, which leaves the last 241px
     * of artwork — the cream strands and the cheese, which hang well below the red band —
     * sitting on the footer's logo row. Pinning the page to the frame's own height fixes it
     * height-independently, where tuning Prizes' bottom margin would re-break the moment any
     * section's height moved.
     */
    <div className="relative isolate lg:min-h-[5178px]">
      <HomeBackground />
      <Hero />
      <Calendar />
      <Steps />
      <Prizes />
    </div>
  )
}

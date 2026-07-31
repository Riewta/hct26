import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Direction and capability plumbing for the auth-flow view transitions.
 *
 * The View Transitions API has no notion of where the user came from — react-router
 * hands the browser one transition either way — so the shape of each hop has to be
 * published to CSS out of band. `markAuthNav` stamps `data-auth-nav` on the root
 * element, which the `:root[data-auth-nav='…']` rules in styles/auth-motion.css read to
 * pick that hop's choreography. Every navigation in the flow goes through a link or a
 * button that writes the flag explicitly, so a stale value can never be read: the next
 * transition always rewrites it before the snapshot is taken. That means nothing has to
 * clean it up, and the attribute is inert outside a transition since it only ever
 * selects pseudo-elements.
 */

/**
 * Feature detection rather than assumption — Safari and Firefox shipped this well after
 * Chrome. Where it is missing, react-router falls back to a plain navigation and every
 * `view-transition-name` and `::view-transition-*` rule is simply an unknown property the
 * engine drops, so no element can end up stuck or invisible.
 */
export const supportsViewTransitions =
  typeof document !== 'undefined' && 'startViewTransition' in document

/**
 * The hops the flow can make. Each one changes what should visibly carry over:
 *
 *  - `gate`    sign-in → the registration gate: the colour blocks morph, the plate arrives
 *  - `enter`   the gate → the first wizard step: colour sinks away, the pasta spills in
 *  - `forward` / `back`  step ↔ step, and the error screen back to the terms step
 *  - `submit`  the last step → the success or error screen: pasta leaves, colour returns
 *  - `leave`   out of the flow, with nothing left to carry — a plain crossfade
 */
export type AuthNav = 'gate' | 'enter' | 'forward' | 'back' | 'submit' | 'leave'

export function markAuthNav(kind: AuthNav) {
  if (!supportsViewTransitions) return
  document.documentElement.dataset.authNav = kind
}

/**
 * The browser's own back and forward buttons never touch a link, so without this the
 * flag would still read whatever the last click set and a `popstate` back would play the
 * forward slide. react-router stamps a monotonic `idx` on every history entry, which is
 * the only reliable way to tell which direction a `popstate` went — the event itself
 * carries no direction.
 *
 * The listener compares against the index of the entry we are leaving, and the effect
 * re-reads it after every committed navigation (a link click included), so the stored
 * index is never a step behind. `popstate` fires synchronously before react-router's
 * state update is rendered, so the flag is in place before the browser takes its
 * snapshot.
 */
export function useAuthNavHistory() {
  const location = useLocation()
  const idx = () => (history.state as { idx?: number } | null)?.idx ?? 0

  useEffect(() => {
    if (!supportsViewTransitions) return
    let leaving = idx()

    const onPop = () => {
      const arriving = idx()
      markAuthNav(arriving < leaving ? 'back' : 'forward')
      leaving = arriving
    }

    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // re-read on every navigation so `leaving` tracks the entry actually on screen
  }, [location])
}

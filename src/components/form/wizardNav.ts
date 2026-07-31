import { useEffect, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate, type To } from 'react-router-dom'

/**
 * Direction and capability plumbing for the auth-flow view transitions.
 *
 * The View Transitions API has no notion of where the user came from — one navigation
 * looks like any other — so the shape of each hop has to be published to CSS out of
 * band. `markAuthNav` stamps `data-auth-nav` on the root element, which the
 * `:root[data-auth-nav='…']` rules in styles/auth-motion.css read to pick that hop's
 * choreography. Every navigation in the flow goes through `useAuthLink`/`runAuthTransition`,
 * which writes the flag before starting the transition, so a stale value can never be
 * read. That means nothing has to clean it up, and the attribute is inert outside a
 * transition since it only ever selects pseudo-elements.
 */

/**
 * Feature detection rather than assumption — Safari and Firefox shipped this well after
 * Chrome. Where it is missing the navigation is plain, and every `view-transition-name`
 * and `::view-transition-*` rule is simply an unknown property the engine drops, so no
 * element can end up stuck or invisible.
 */
const supportsViewTransitions =
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function'

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

function markAuthNav(kind: AuthNav) {
  if (!supportsViewTransitions) return
  document.documentElement.dataset.authNav = kind
}

/**
 * Run `commit` inside a view transition, flagged as `kind`.
 *
 * This function exists because the obvious way to do it does not work. React Router's
 * `viewTransition` option — on `<Link viewTransition>` and on `navigate(to, { viewTransition })`
 * — is implemented inside `<RouterProvider>`, the *data* router. This app mounts
 * `<BrowserRouter>`, which has no `router` object and never reaches that code, so the
 * option was accepted and silently discarded on every hop: `document.startViewTransition`
 * was never called once and every `::view-transition-*` rule in styles/auth-motion.css was
 * dead. Hence starting the transition here instead, which is precisely what the data
 * router would have done.
 *
 * `flushSync` is the load-bearing part. The API snapshots the old frame, calls the update
 * callback, then snapshots the new one — so the DOM has to be in its new state by the time
 * the callback returns. React would otherwise batch the router's state update into a later
 * tick, the callback would return with nothing changed, and the browser would capture two
 * identical frames and animate nothing.
 *
 * No `prefers-reduced-motion` branch: the transition still runs, and the reduced-motion
 * block at the end of auth-motion.css clamps every group to 1ms and every snapshot to a
 * short opacity fade. That lands both screens in their final state with nothing travelling,
 * while keeping the change of screen legible — which a hard cut would not.
 */
export function runAuthTransition(kind: AuthNav, commit: () => void) {
  markAuthNav(kind)
  if (!supportsViewTransitions) {
    commit()
    return
  }
  document.startViewTransition(() => flushSync(commit))
}

/** Imperative form, for the controls in this flow that are buttons rather than links. */
export function useAuthNavigate() {
  const navigate = useNavigate()
  return (to: To, kind: AuthNav) => runAuthTransition(kind, () => navigate(to))
}

/**
 * Props for a link that navigates inside the auth flow: same destination, but the click
 * is taken over so the navigation can be wrapped in a transition.
 *
 * The `to` still renders as a real `href`, and the guard clauses hand the event back to
 * the browser for anything that is not a plain left click — a middle click, or a cmd/ctrl
 * click, has to keep opening a new tab, and a new document cannot be a view transition.
 */
export function useAuthLink() {
  const go = useAuthNavigate()

  return (to: To, kind: AuthNav) => ({
    to,
    onClick(event: MouseEvent<HTMLAnchorElement>) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      go(to, kind)
    },
  })
}

/**
 * Keeps `data-auth-nav` honest across the browser's own back and forward buttons.
 *
 * `popstate` carries no direction, so without this the flag would still read whatever the
 * last click set. React Router stamps a monotonic `idx` on every history entry, and
 * comparing it against the entry being left is the only reliable way to tell which way the
 * user went; the effect re-reads that index after every committed navigation (a link click
 * included), so it is never a step behind.
 *
 * What this deliberately does *not* do is animate. A popstate navigation has no click to
 * intercept and therefore no callback to hand `runAuthTransition`, and by the time this
 * listener runs React has already committed the new route — so the only transition
 * available to start is one that captures the destination as both its before and its
 * after. Filmed, that is not a no-op: it cross-fades the arrived screen against itself and
 * the plus-lighter dip shows as a wash of the whole page, a flash several hundred
 * milliseconds *after* the back button did its work. A hard cut is better than that.
 *
 * Animating back properly means owning the history entry, which is what React Router's
 * data router (`createBrowserRouter` + `RouterProvider`) does — it remembers that the entry
 * was created by a `viewTransition` navigation and wraps the pop in one. That is a router
 * migration, not a stylesheet change, and it is the way to get this.
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

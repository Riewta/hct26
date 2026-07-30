/**
 * Direction and capability plumbing for the auth-flow view transitions.
 *
 * The View Transitions API has no notion of "forward" or "back" — react-router hands
 * the browser one transition either way — so the direction has to be published to CSS
 * out of band. `markWizardNav` stamps `data-wizard-nav` on the root element, which the
 * `:root[data-wizard-nav='back']` rules in styles/auth-motion.css read to reverse the
 * slide. Every wizard move goes through one of the step links, and each of them writes
 * the flag explicitly, so a stale value can never be read: the next transition always
 * rewrites it before the snapshot is taken. That means nothing has to clean it up, and
 * the attribute is inert outside a transition since it only ever selects pseudo-elements.
 */

/**
 * Feature detection rather than assumption — Safari and Firefox shipped this well after
 * Chrome. Where it is missing, react-router falls back to a plain navigation and every
 * `view-transition-name` and `::view-transition-*` rule is simply an unknown property the
 * engine drops, so no element can end up stuck or invisible.
 */
export const supportsViewTransitions =
  typeof document !== 'undefined' && 'startViewTransition' in document

export type WizardDirection = 'forward' | 'back'

export function markWizardNav(direction: WizardDirection) {
  if (!supportsViewTransitions) return
  document.documentElement.dataset.wizardNav = direction
}

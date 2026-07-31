import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import PastEvents from './pages/PastEvents'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import TeamStep from './pages/register/TeamStep'
import AdvisorStep from './pages/register/AdvisorStep'
import EntrantStep from './pages/register/EntrantStep'
import TermsStep from './pages/register/TermsStep'
import SuccessStep from './pages/register/SuccessStep'
import ErrorStep from './pages/register/ErrorStep'
import MyTeam from './pages/MyTeam'
import NotFound from './pages/NotFound'
import { trackAuthNav } from './components/form/wizardNav'

/** Marketing pages share the nav + footer chrome; the auth screens stand alone. */
function SiteLayout() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

/**
 * Wraps every route so there is one place for document-wide navigation behaviour.
 *
 * `<ScrollRestoration>` is the whole reason it exists. It is a data-router-only component:
 * it calls `router.enableScrollRestoration`, which no `<BrowserRouter>` has, so before the
 * migration below there was nothing in the app restoring scroll and nothing resetting it
 * either. Both halves were visibly broken — a back press out of a long entrant step landed
 * at whatever offset the *next* step had been left at, and a forward press kept the old
 * offset instead of starting the new step at its top.
 *
 * The browser's native `scrollRestoration` cannot cover for it here. It restores after the
 * pop, against whatever the document height happens to be at that instant, and in a
 * client-rendered app that is the *outgoing* screen's height; the router restores from its
 * own per-entry record, inside the same commit that swaps the screen.
 */
function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

/**
 * `createRoutesFromElements` takes the same JSX `<Route>` tree `<Routes>` did, so the route
 * table below is unchanged by the migration from `<BrowserRouter>` to the data router.
 *
 * The migration itself is what makes the auth flow's back button work. Three separate
 * defects had one cause — `<BrowserRouter>` has no `router` object, so
 * `navigate(to, { viewTransition: true })` was accepted and dropped, `<ScrollRestoration>`
 * could not be mounted at all, and a pop could never be wrapped in a transition because a
 * `popstate` listener only runs once React has already committed the new screen. The data
 * router owns the history entry: it records which pathname pairs were crossed with a view
 * transition and re-uses the transition when one of them is popped, which is the only way
 * a back press can animate.
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<About />} />
        <Route path="/hall-of-fame" element={<PastEvents />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/team" element={<TeamStep />} />
      <Route path="/register/advisor" element={<AdvisorStep />} />
      <Route path="/register/entrant/:index" element={<EntrantStep />} />
      <Route path="/register/terms" element={<TermsStep />} />
      <Route path="/register/success" element={<SuccessStep />} />
      <Route path="/register/error" element={<ErrorStep />} />
      <Route path="/my-team" element={<MyTeam />} />
      {/* Figma 708:1240 — the 404 page stands alone, without the nav/footer chrome */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

/*
 * The auth flow's transitions are direction-aware, and the browser's back button is the
 * one navigation no link can flag. Subscribing to the router — rather than to `popstate` —
 * is what lets the direction be published before the transition starts; see
 * form/wizardNav.ts.
 */
trackAuthNav(router)

export default function App() {
  return <RouterProvider router={router} />
}

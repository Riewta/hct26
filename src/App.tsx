import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import PastEvents from "./pages/PastEvents";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import TeamStep from "./pages/register/TeamStep";
import AdvisorStep from "./pages/register/AdvisorStep";
import EntrantStep from "./pages/register/EntrantStep";
import TermsStep from "./pages/register/TermsStep";
import SuccessStep from "./pages/register/SuccessStep";
import ErrorStep from "./pages/register/ErrorStep";
import MyTeam from "./pages/MyTeam";
import NotFound from "./pages/NotFound";

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
  );
}

export default function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

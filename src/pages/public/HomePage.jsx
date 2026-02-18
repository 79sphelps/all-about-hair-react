import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
// import NavBar from "../../ui/navigation/NavBar";
// import Footer from "../../features/footer/Footer";
import FullPageLoader from "../../ui/feedback/FullPageLoader";
import { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHomePageBootstrap } from "../../hooks/useHomePageBootstrap";
import ErrorState from "../../ui/feedback/ErrorState";

// Lazy sections
const Hero = lazy(() => import("../../features/hero/Hero"));
const Services = lazy(() => import("../../features/services/Services"));
const Mission = lazy(() => import("../../features/mission/Mission"));
const Team = lazy(() => import("../../features/team/Team"));
const Gallery = lazy(() => import("../../features/gallery/Gallery"));
const ContactSection = lazy(() => import("../../features/contact/ContactSection"));
const HomePageDetailsPage = lazy(() => import("../admin/HomePageDetailsPage"));

const HomePage = () => {
  const { isAuthenticated } = useAuth0();
  const { isLoading, isError, errors } = useHomePageBootstrap();

  if (isLoading) {
    return (
      <FullPageLoader
        title="Waking up the server hosted on Render.com (free tier)…"
        subtitle="This can take up to 45 seconds on first load."
      />
    );
  }

  if (isError) {
    return <ErrorState errors={errors} />;
  }

  return (
    <div className="App">
      {/* <NavBar /> */}

      {!isAuthenticated ? (
        <>
          <Hero />
          <Services />
          <Mission />
          <Team />
          <Gallery />
          <ContactSection />
        </>
      ) : (
        <HomePageDetailsPage />
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;

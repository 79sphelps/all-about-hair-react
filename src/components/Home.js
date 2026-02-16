import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../ui/NavBar";
import Footer from "./footer/Footer";
import FullPageLoader from "./FullPageLoader";
import { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHomePageBootstrap } from "./useHomePageBootstrap";
import ErrorState from "../ui/ErrorState";

// Lazy sections
const Hero = lazy(() => import("./hero/Hero"));
const Services = lazy(() => import("./services/Services"));
const Mission = lazy(() => import("./mission/Mission"));
const Team = lazy(() => import("./team/Team"));
const Gallery = lazy(() => import("./gallery/Gallery"));
const Contact = lazy(() => import("./contact/Contact"));
const HomePageDetailsEdit2 = lazy(() => import("./admin/HomePageDetailsEdit2"));

const Home = () => {
  const { isAuthenticated } = useAuth0();
  const { isLoading, isError, errors } = useHomePageBootstrap();

  if (isLoading) {
    return (
      <FullPageLoader
        title="Waking up the server…"
        subtitle="This can take up to 45 seconds on first load."
      />
    );
  }

  if (isError) {
    return <ErrorState errors={errors} />;
  }

  return (
    <div className="App">
      <NavBar />

      {!isAuthenticated ? (
        <>
          <Hero />
          <Services />
          <Mission />
          <Team />
          <Gallery />
          <Contact />
        </>
      ) : (
        <HomePageDetailsEdit2 />
      )}

      <Footer />
    </div>
  );
};

export default Home;

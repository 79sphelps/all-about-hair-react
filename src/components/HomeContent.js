import { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy sections
const Hero = lazy(() => import("./hero/Hero"));
const Services = lazy(() => import("./services/Services"));
const Mission = lazy(() => import("./mission/Mission"));
const Team = lazy(() => import("./team/Team"));
const Gallery = lazy(() => import("./gallery/Gallery"));
const ContactForm = lazy(() => import("./contact/ContactForm"));
const HomePageDetails = lazy(() => import("./admin/HomePageDetails"));

const HomeContent = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <HomePageDetails />;
  }

  return (
    <>
      <Hero />
      <Services />
      <Mission />
      <Team />
      <Gallery />
      <ContactForm />
    </>
  );
};

export default HomeContent;
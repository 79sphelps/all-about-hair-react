import { useEffect } from "react";
// import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
// import { Skills } from "./components/Skills";
// import { Projects } from "./components/Projects";
// import { Services } from "./components/Services";
import { Services2 } from "./Services2";

// import { ServicesCarousel } from "./ServicesCarousel";
import { Mission } from "./Mission";
import { Team } from "./Team";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Gallery } from "./Gallery";
import { ContactInfo } from "./ContactInfo";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Services2 />
      <Mission />
      <Team />
      <Gallery />
      <ContactInfo />
      <Contact />
      <Footer />
    </div>
  );
}

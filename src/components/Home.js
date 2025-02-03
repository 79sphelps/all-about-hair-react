import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { Services2 } from "./Services2";
import { Mission } from "./Mission";
import { Team } from "./Team";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Gallery } from "./Gallery";
import { ContactInfo } from "./ContactInfo";
import '../App.css';

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

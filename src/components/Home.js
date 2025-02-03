import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { Services2 } from "./Services2";
import { Mission } from "./Mission";
import { Team } from "./Team";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Gallery } from "./Gallery";
import { ContactInfo } from "./ContactInfo";
import { HomePageDetails } from "./admin/HomePageDetails.js"
import '../App.css';

export const Home = () => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <NavBar />
      { !isAuthenticated ? <Banner /> : null }
      { !isAuthenticated ? <Services2 /> : null }
      { !isAuthenticated ? <Mission /> : null }
      { !isAuthenticated ? <Team /> : null }
      { !isAuthenticated ? <Gallery /> : null }
      { !isAuthenticated ? <ContactInfo /> : null }
      { !isAuthenticated ? <Contact /> : null }
      { isAuthenticated ? <HomePageDetails /> : null }
      <Footer />
    </div>
  );
}

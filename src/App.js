import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
// import { Skills } from "./components/Skills";
// import { Projects } from "./components/Projects";
// import { Services } from "./components/Services";
import { Services2 } from "./components/Services2";

import { ServicesCarousel } from "./components/ServicesCarousel";
import { Mission } from "./components/Mission";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { ContactInfo } from "./components/ContactInfo";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      {/* <Skills /> */}
      {/* <Projects /> */}
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

export default App;

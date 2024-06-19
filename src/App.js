// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { NavBar } from "./components/NavBar";
// import { Banner } from "./components/Banner";
// import { Skills } from "./components/Skills";
// import { Projects } from "./components/Projects";
// import { Services } from "./components/Services";
// import { Services2 } from "./components/Services2";

// import { ServicesCarousel } from "./components/ServicesCarousel";
// import { Mission } from "./components/Mission";
// import { Team } from "./components/Team";
// import { Contact } from "./components/Contact";
// import { Footer } from "./components/Footer";
// import { Gallery } from "./components/Gallery";
// import { ContactInfo } from "./components/ContactInfo";

import { Home } from "./components/Home";
import { 
  // BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./components/Loading.js";
import { HomePageDetails } from "./components/admin/HomePageDetails.js"
import { ServicesDetails } from './components/admin/ServicesDetails.js';
import { ServiceEdit } from './components/admin/ServiceEdit.js';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    // <div className="App">
    //   <NavBar />
    //   <Banner />
    //   <Services2 />
    //   <Mission />
    //   <Team />
    //   <Gallery />
    //   <ContactInfo />
    //   <Contact />
    //   <Footer />
    // </div>

    // <Router>
      <Routes>
        {/* <Route exact path="/" component={isAuthenticated ? CallbackPage : Home} /> */}
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/listings" component={Listings} /> */}
        <Route exact path="/admin/home-page-details" element={ isAuthenticated ? <HomePageDetails /> : <Home />} />
        <Route exact path="/admin/services-details" element={ isAuthenticated ? <ServicesDetails /> : <Home />} />
        <Route exact path="/admin/service-edit/:id" element={ isAuthenticated ? <ServiceEdit /> : <Home />} />
        {/* <Route exact path="/rentals/:id" component={Listing} />
        <Route path="/callback" component={CallbackPage} /> */}
      </Routes>
    // </Router>
  );
}

export default App;
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../ui/NavBar";
import Hero from "./hero/Hero";
import Services from "./services/Services";
import Mission from "./mission/Mission";
import Team from "./team/Team";
import Footer from "./footer/Footer";
import Gallery from "./gallery/Gallery";
import ContactForm from "./contact/ContactForm";
import HomePageDetails from "./admin/HomePageDetails";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    toast(
      "Because the backend uses the free tier of Render.com, it may take up to 30+ seconds to wake up the server on the first request. Annoying, yes, but...free has a cost, LOL.",
    );
  }, []);

  return (
    <div className="App">
      <NavBar />
      <ToastContainer
        position="top-center"
        autoClose={30000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!isAuthenticated && (
        <>
          <Hero />
          <Services />
          <Mission />
          <Team />
          <Gallery />
          <ContactForm />
        </>
      )}
      {isAuthenticated ? <HomePageDetails /> : null}
      <Footer />
    </div>
  );
};

export default Home;

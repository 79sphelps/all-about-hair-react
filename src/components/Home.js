import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Services2 from "./Services2";
import Mission from "./Mission";
import Team from "./Team";
// import Contact2 from "./Contact2";
import Footer from "./Footer";
import Gallery from "./Gallery";
import ContactInfo from "./ContactInfo";
import HomePageDetails from "./admin/HomePageDetails";
// import "../App.css";

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
          <Banner />
          <Services2 />
          <Mission />
          <Team />
          <Gallery />
          <ContactInfo />
        </>
      )}
      {isAuthenticated ? <HomePageDetails /> : null}
      <Footer />
    </div>
  );
};

export default Home;

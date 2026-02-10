/*
Pattern
- NavBar & Footer load instantly
- - They are not blocked by API calls or lazy chunks.

Sections stream independently

If:
- Services is slow
- Team API is cold
- Gallery images are heavy

…the rest of the page still renders.
*/
import { useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../ui/NavBar";
import Footer from "./footer/Footer";
import HomeContent from "./HomeContent";
import FullPageLoader from "./FullPageLoader";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    toast(
      "Because the backend uses the free tier of Render.com, it may take up to 30+ seconds to wake up the server on the first request."
    );
  }, []);

  return (
    <div className="App">
      <NavBar />

      <ToastContainer
        position="top-center"
        autoClose={30000}
        closeOnClick={false}
        pauseOnHover
      />

      <Suspense fallback={<FullPageLoader />}>
        <HomeContent isAuthenticated={isAuthenticated} />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Home;
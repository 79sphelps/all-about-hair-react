import { Outlet } from "react-router-dom";
import PublicNavBar from "../ui/navigation/PublicNavBar";
import Footer from "../features/footer/Footer";

const PublicLayout = () => {
  return (
    <>
      <PublicNavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;

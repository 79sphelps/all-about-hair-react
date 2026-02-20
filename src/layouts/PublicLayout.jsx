import { Outlet, useLocation } from "react-router-dom";
import PublicNavBar from "../ui/navigation/PublicNavBar";
import Footer from "../features/footer/components/Footer";

const PublicLayout = () => {
  const location = useLocation();

  return (
    <>
      <PublicNavBar />
      <main>
        <Outlet />
      </main>
      { !location.pathname.includes('services') && <Footer /> }
    </>
  );
};

export default PublicLayout;

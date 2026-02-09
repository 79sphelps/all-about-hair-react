import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "./components/Loading";
import './App.css';
import './style.css';
import NotFound from './components/NotFound';

const Home = lazy(() => import("./components/Home"));
const HomePageDetails = lazy(() => import("./components/admin/HomePageDetails"));
const ServicesDetails = lazy(() => import("./components/admin/ServicesDetails"));
const ServiceOfferingEdit = lazy(() => import("./components/admin/ServiceOfferingEdit"));
const Service = lazy(() => import("./components/services/Service"));
const CreateServiceOffering = lazy(() => import("./components/admin/CreateServiceOffering"));
const TeamMemberEdit = lazy(() => import("./components/admin/TeamMemberEdit2"));
const TeamDetails = lazy(() => import("./components/admin/TeamDetails"));
const CreateTeamMember = lazy(() => import("./components/admin/CreateTeamMember2"));

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>There was an error getting auth status...{error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router future={{
        v7_startTransition: true,
      }}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/services/:id" element={<Service />} />
          <Route exact path="/admin/home-page-details" element={ isAuthenticated ? <HomePageDetails /> : <Home />} />
          <Route exact path="/admin/services-details" element={ isAuthenticated ? <ServicesDetails /> : <Home />} />
          <Route exact path="/admin/service-edit/:id" element={ isAuthenticated ? <ServiceOfferingEdit /> : <Home />} />
          <Route exact path="/admin/service-add" element={ isAuthenticated ? <CreateServiceOffering /> : <Home />} />
          <Route exact path="/admin/team-member-edit/:id" element={ isAuthenticated ? <TeamMemberEdit /> : <Home />} />
          <Route exact path="/admin/team-details" element={ isAuthenticated ? <TeamDetails /> : <Home />} />
          <Route exact path="/admin/team-member-add" element={ isAuthenticated ? <CreateTeamMember /> : <Home />} />
          {/* <Route path="/callback" component={CallbackPage} /> */}
          {/* <Route exact path="/" component={isAuthenticated ? CallbackPage : Home} /> */}
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
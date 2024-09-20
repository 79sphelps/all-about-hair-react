// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home.js";
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
import { Service } from "./components/Service.js";
import { CreateService } from './components/admin/CreateService.js';
import { TeamMemberEdit } from './components/admin/TeamMemberEdit.js';
import { TeamDetails } from './components/admin/TeamDetails.js';
import { CreateTeamMember } from './components/admin/CreateTeamMember.js';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    // <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/services/:id" element={<Service />} />
        <Route exact path="/admin/home-page-details" element={ isAuthenticated ? <HomePageDetails /> : <Home />} />
        <Route exact path="/admin/services-details" element={ isAuthenticated ? <ServicesDetails /> : <Home />} />
        <Route exact path="/admin/service-edit/:id" element={ isAuthenticated ? <ServiceEdit /> : <Home />} />
        <Route exact path="/admin/service-add" element={ isAuthenticated ? <CreateService /> : <Home />} />
        <Route exact path="/admin/team-member-edit/:id" element={ isAuthenticated ? <TeamMemberEdit /> : <Home />} />
        <Route exact path="/admin/team-details" element={ isAuthenticated ? <TeamDetails /> : <Home />} />
        <Route exact path="/admin/team-member-add" element={ isAuthenticated ? <CreateTeamMember /> : <Home />} />
        {/* <Route path="/callback" component={CallbackPage} /> */}
        {/* <Route exact path="/" component={isAuthenticated ? CallbackPage : Home} /> */}
      </Routes>
    // </Router>
  );
}

export default App;
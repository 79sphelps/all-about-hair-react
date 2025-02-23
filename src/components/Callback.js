import React from "react";
import { 
  useAuth0, 
  // withAuthenticationRequired 
} from "@auth0/auth0-react";

const CallbackPage = () => {
  const { user } = useAuth0();
  return (
    <div>
      {user && user.name !== null && user.name !== "" && user.email ? (
        <div>
          <h3>Signed in as { user.name }</h3>      
        </div>
      ) : null}
    </div>
  );
};

export default CallbackPage;
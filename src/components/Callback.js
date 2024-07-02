import React from "react";
import { 
  useAuth0, 
  // withAuthenticationRequired 
} from "@auth0/auth0-react";
// import { Section } from "../components";

export const CallbackPage = () => {
  const { user } = useAuth0();
  return (
    <div>
      {user && user.name !== null && user.name !== "" && user.email ? (
        // <Section bgColor="--bs-fade-blue">
        //   <Section.InnerContainer>
        //     <Section.Header></Section.Header>
        //     <Section.Content>
        //       <Section.Flex>
        //         <Section.FlexItem width="70%">
        //           <Section.SubTitle size="1">Signed in as {user.name}</Section.SubTitle>
        //           <Section.Text>Email: {user.email}</Section.Text>
        //         </Section.FlexItem>
        //       </Section.Flex>
        //     </Section.Content>
        //   </Section.InnerContainer>
        // </Section>
        <div>
          <h3>Signed in as { user.name }</h3>      
        </div>
      ) : null}
    </div>
  );
};

// export default withAuthenticationRequired(CallbackPage, {
//     onRedirecting: () => <Loading />,
//   });

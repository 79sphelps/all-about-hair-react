// import { Container, Row, Col } from "react-bootstrap";
// import TrackVisibility from "react-on-screen";
// import AdminNavBar from "../ui/navigation/AdminNavBar";

// const AdminFormLayout = ({
//   title,
//   children,
//   subtitle,
//   className = "",
// }) => {
//   const headingId =
//     title?.toLowerCase().replace(/\s+/g, "-") || "admin-heading";

//   return (
//     <>
//       <AdminNavBar />

//       <main aria-labelledby={headingId}>
//         <section className={`contact ${className}`}>
//           <Container style={{ marginTop: "100px" }}>
//             <Row className="align-items-center">
//               <Col>
//                 <TrackVisibility once>
//                   {({ isVisible }) => (
//                     <div
//                       className={
//                         isVisible
//                           ? "animate__animated animate__fadeIn"
//                           : ""
//                       }
//                     >
//                       {title && <h1 id={headingId}>{title}</h1>}

//                       {subtitle && <p>{subtitle}</p>}

//                       {children}
//                     </div>
//                   )}
//                 </TrackVisibility>
//               </Col>
//             </Row>
//           </Container>
//         </section>
//       </main>
//     </>
//   );
// };

// export default AdminFormLayout;


import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import AdminNavBar from "../ui/navigation/AdminNavBar";

const AdminFormLayout = () => {
  return (
    <>
      <AdminNavBar />

      <main>
        <section className="contact">
          <Container style={{ marginTop: "100px" }}>
            <Row className="align-items-center">
              <Col>
                <TrackVisibility once>
                  {({ isVisible }) => (
                    <div
                      className={
                        isVisible
                          ? "animate__animated animate__fadeIn"
                          : ""
                      }
                    >
                      {/* THIS RENDERS ADMIN PAGES */}
                      <Outlet />
                    </div>
                  )}
                </TrackVisibility>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default AdminFormLayout;

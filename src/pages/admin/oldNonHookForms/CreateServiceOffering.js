// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import TrackVisibility from "react-on-screen";
// import "animate.css";

// import NavBar from "../../../ui/NavBar";
// import { FormError, formErrorsCreateService } from "../../../lib/common";
// import { useCreateService } from "../hooks/useCreateService";

// const EMPTY_SERVICE = {
//   title: "",
//   image: "",
//   description: "",
//   pricing: [],
// };

// const EMPTY_PRICING = {
//   type: "",
//   price: "",
//   description: "",
// };

// /** =========================
//  * VALIDATORS
//  ========================== */

// const validators = {
//   title: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
//   image: (v) => /^[A-Za-z0-9_ /.']{5,}$/.test(v),
//   description: (v) => /^[A-Za-z0-9_ .']{10,}$/.test(v),
//   type: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
//   price: (v) => /^[A-Za-z0-9_ .$\-']{3,}$/.test(v),
// };

// const CreateServiceOffering = () => {
//   const navigate = useNavigate();
//   const createService = useCreateService();

//   /** =========================
//    * STATE
//    ========================== */
//   const [service, setService] = useState(EMPTY_SERVICE);
//   const [pricingDraft, setPricingDraft] = useState(EMPTY_PRICING);

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const [showPricingForm, setShowPricingForm] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [buttonText, setButtonText] = useState("Create New Service");

//   /** =========================
//    * VALIDATION
//    ========================== */

//   const validateField = (name, value) => {
//     if (!validators[name]?.(value)) {
//       return formErrorsCreateService[name]?.error || "Invalid field";
//     }
//     return "";
//   };

//   /** =========================
//    * MAIN FIELD HANDLERS
//    ========================== */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setService((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // BEST UX:
//     if (touched[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: validateField(name, value),
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;

//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: validateField(name, value),
//     }));
//   };

//   /** =========================
//    * PRICING HANDLERS
//    ========================== */

//   const handlePricingChange = (e) => {
//     const { name, value } = e.target;

//     setPricingDraft((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (touched[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: validateField(name, value),
//       }));
//     }
//   };

//   const handlePricingBlur = (e) => {
//     const { name, value } = e.target;

//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: validateField(name, value),
//     }));
//   };

//   /** =========================
//    * VALIDATION BEFORE SUBMIT
//    ========================== */

//   const validateBeforeSubmit = () => {
//     const newErrors = {};

//     ["title", "image", "description"].forEach((field) => {
//       const err = validateField(field, service[field]);
//       if (err) newErrors[field] = err;
//     });

//     setErrors(newErrors);
//     setTouched({
//       title: true,
//       image: true,
//       description: true,
//     });

//     return Object.keys(newErrors).length === 0;
//   };

//   /** =========================
//    * ACTIONS
//    ========================== */

//   const addPricingDetail = () => {
//     const pricingErrors = {};

//     ["type", "price", "description"].forEach((field) => {
//       const err = validateField(field, pricingDraft[field]);
//       if (err) pricingErrors[field] = err;
//     });

//     if (Object.keys(pricingErrors).length) {
//       setErrors((prev) => ({ ...prev, ...pricingErrors }));
//       return;
//     }

//     setService((prev) => ({
//       ...prev,
//       pricing: [...prev.pricing, pricingDraft],
//     }));

//     setPricingDraft(EMPTY_PRICING);
//     setShowPricingForm(false);
//   };

//   const submitService = () => {
//     if (!validateBeforeSubmit()) return;

//     setButtonText("Creating Service…");

//     createService.mutate(service, {
//       onSuccess: () => setSubmitted(true),
//       onError: () => setButtonText("Create New Service"),
//     });
//   };

//   const resetForm = () => {
//     setService(EMPTY_SERVICE);
//     setPricingDraft(EMPTY_PRICING);
//     setErrors({});
//     setTouched({});
//     setSubmitted(false);
//     setButtonText("Create New Service");
//   };

//   const handleCancel = () => {
//     resetForm();
//     navigate("/");
//   };

//   /** =========================
//    * STATES
//    ========================== */

//   if (submitted) {
//     return (
//       <section className="contact">
//         <NavBar />
//         <Container style={{ marginTop: 100 }}>
//           <div className="admin-add-service-success-container">
//             <h4>The new service was created successfully!</h4>
//             <button className="btn btn-success" onClick={resetForm}>
//               Add Another
//             </button>
//           </div>
//         </Container>
//       </section>
//     );
//   }

//   /** =========================
//    * UI
//    ========================== */

//   return (
//     <section className="contact">
//       <NavBar />

//       <Container style={{ marginTop: "100px" }}>
//         <Row className="align-items-center">
//           <Col>
//             <TrackVisibility>
//               {({ isVisible }) => (
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                   <h2>New Service Details</h2>

//                   {["title", "image"].map((field) => (
//                     <Row key={field}>
//                       <div>{field.toUpperCase()}</div>
//                       <input
//                         name={field}
//                         value={service[field]}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         className="admin-add-service-form-input"
//                       />
//                       {touched[field] && errors[field] && (
//                         <FormError msg={errors[field]} />
//                       )}
//                     </Row>
//                   ))}

//                   <Row>
//                     <div>Description</div>
//                     <textarea
//                       name="description"
//                       rows={6}
//                       value={service.description}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="admin-add-service-form-input"
//                     />
//                     {touched.description && errors.description && (
//                       <FormError msg={errors.description} />
//                     )}
//                   </Row>

//                   {showPricingForm && (
//                     <>
//                       <h4 style={{ marginTop: 30 }}>Add Pricing Detail</h4>

//                       {["type", "price", "description"].map((field) => (
//                         <Row key={field}>
//                           <div>{field.toUpperCase()}</div>
//                           <input
//                             name={field}
//                             value={pricingDraft[field]}
//                             onChange={handlePricingChange}
//                             onBlur={handlePricingBlur}
//                             className="admin-add-service-form-input"
//                           />
//                           {touched[field] && errors[field] && (
//                             <FormError msg={errors[field]} />
//                           )}
//                         </Row>
//                       ))}

//                       <button className="admin-btn" onClick={addPricingDetail}>
//                         Add Detail
//                       </button>
//                     </>
//                   )}

//                   <Row className="admin-add-service-btn-container">
//                     <button className="admin-btn" onClick={handleCancel}>
//                       Cancel
//                     </button>
//                     <button
//                       className="admin-btn"
//                       onClick={() => setShowPricingForm(true)}
//                     >
//                       Add Pricing Detail
//                     </button>
//                     <button className="admin-btn" onClick={submitService}>
//                       {buttonText}
//                     </button>
//                   </Row>
//                 </div>
//               )}
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default CreateServiceOffering;

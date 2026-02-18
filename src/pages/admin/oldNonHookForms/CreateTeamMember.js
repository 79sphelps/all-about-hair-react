// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TrackVisibility from "react-on-screen";
// import "animate.css";

// import NavBar from "../../../ui/NavBar";
// import AdminFormLayout from "../AdminFormLayout";
// import AccessibleFormField from "../../contact/AccessibleFormField";

// import { useCreateTeamMember } from "../hooks/useCreateTeamMember";

// const EMPTY_FORM = {
//   name: "",
//   role: "",
//   photo: "",
//   bio: "",
// };

// /** =========================
//  * VALIDATORS
//  ========================== */

// const validators = {
//   name: (v) => v.trim().length >= 2,
//   role: (v) => v.trim().length >= 5,
//   photo: (v) => v.trim().length >= 10,
//   bio: (v) => v.trim().length >= 25,
// };

// const errorMessages = {
//   name: "Name must be at least 2 characters.",
//   role: "Role must be at least 5 characters.",
//   photo: "Image path must be at least 10 characters.",
//   bio: "Bio must be at least 25 characters.",
// };

// const CreateTeamMember = () => {
//   const navigate = useNavigate();
//   const createTeamMember = useCreateTeamMember();

//   /** =========================
//    * STATE
//    ========================== */

//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const [touched, setTouched] = useState({});
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   /** =========================
//    * VALIDATION
//    ========================== */

//   const validateField = (name, value) => {
//     if (!validators[name]) return;

//     setErrors((prev) => ({
//       ...prev,
//       [name]: validators[name](value)
//         ? null
//         : { message: errorMessages[name] },
//     }));
//   };

//   const validateAll = () => {
//     const newErrors = {};

//     Object.keys(validators).forEach((key) => {
//       if (!validators[key](formData[key])) {
//         newErrors[key] = { message: errorMessages[key] };
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /** =========================
//    * HANDLERS
//    ========================== */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // BEST UX:
//     // validate only after field has been touched
//     if (touched[name]) {
//       validateField(name, value);
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;

//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));

//     validateField(name, value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateAll()) return;

//     createTeamMember.mutate(formData, {
//       onSuccess: () => {
//         setSubmitted(true);
//       },
//     });
//   };

//   const handleCancel = () => {
//     navigate("/");
//   };

//   const handleAddAnother = () => {
//     setFormData(EMPTY_FORM);
//     setTouched({});
//     setErrors({});
//     setSubmitted(false);
//   };

//   /** =========================
//    * STATES
//    ========================== */

//   if (submitted) {
//     return (
//       <section className="contact">
//         <NavBar />
//         <AdminFormLayout title="Team Member Created">
//           <div role="status" aria-live="polite">
//             <h4>The new team member was created successfully!</h4>
//             <button
//               className="btn btn-success"
//               onClick={handleAddAnother}
//             >
//               Add Another Team Member
//             </button>
//           </div>
//         </AdminFormLayout>
//       </section>
//     );
//   }

//   /** =========================
//    * UI
//    ========================== */

//   return (
//     <section className="contact">
//       <NavBar />

//       <AdminFormLayout
//         title="New Team Member Details"
//         subtitle="Fill out the fields below to create a new team member."
//       >
//         <TrackVisibility once>
//           {({ isVisible }) => (
//             <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//               <form onSubmit={handleSubmit} noValidate>
//                 <AccessibleFormField
//                   id="name"
//                   name="name"
//                   label="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.name ? errors.name : null}
//                   required
//                 />

//                 <AccessibleFormField
//                   id="role"
//                   name="role"
//                   label="Role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.role ? errors.role : null}
//                   required
//                 />

//                 <AccessibleFormField
//                   id="photo"
//                   name="photo"
//                   label="Image Path"
//                   value={formData.photo}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.photo ? errors.photo : null}
//                   required
//                 />

//                 <AccessibleFormField
//                   id="bio"
//                   name="bio"
//                   label="Bio"
//                   as="textarea"
//                   rows={6}
//                   value={formData.bio}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.bio ? errors.bio : null}
//                   description={
//                     formData.bio.length < 25
//                       ? `${25 - formData.bio.length} characters remaining`
//                       : null
//                   }
//                   required
//                 />

//                 <div className="admin-btn-container">
//                   <button type="submit" className="admin-btn">
//                     Create Team Member
//                   </button>

//                   <button
//                     type="button"
//                     className="admin-btn"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </TrackVisibility>
//       </AdminFormLayout>
//     </section>
//   );
// };

// export default CreateTeamMember;

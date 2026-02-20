// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "animate.css";

// import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
// import CreateServiceForm from "../../features/admin/services/CreateServiceForm";

// import { useCreateService } from "../../features/admin/services/hooks";
// import useAdminForm from "../../features/admin/hooks/useAdminForm";



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

// const validators = {
//   title: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
//   image: (v) => /^[A-Za-z0-9_ /.']{5,}$/.test(v),
//   description: (v) => /^[A-Za-z0-9_ .']{10,}$/.test(v),
//   type: (v) => /^[A-Za-z0-9_ ']{5,}$/.test(v),
//   price: (v) => /^[A-Za-z0-9_ .$\-']{3,}$/.test(v),
// };

// const errorMessages = {
//   title: "Invalid title.",
//   image: "Invalid image path.",
//   description: "Invalid description.",
//   type: "Invalid type.",
//   price: "Invalid price.",
// };



// const CreateServicePage = () => {
//   const navigate = useNavigate();
//   const createService = useCreateService();

//   const [submitted, setSubmitted] = useState(false);
//   const [showPricingForm, setShowPricingForm] = useState(false);

//   const serviceForm = useAdminForm({
//     initialValues: EMPTY_SERVICE,
//     validators: {
//       title: validators.title,
//       image: validators.image,
//       description: validators.description,
//     },
//     errorMessages,
//   });

//   const pricingForm = useAdminForm({
//     initialValues: EMPTY_PRICING,
//     validators: {
//       type: validators.type,
//       price: validators.price,
//       description: validators.description,
//     },
//     errorMessages,
//   });

//   const addPricingDetail = () => {
//     if (!pricingForm.validateBeforeSubmit()) return;

//     serviceForm.setValues((prev) => ({
//       ...prev,
//       pricing: [...prev.pricing, pricingForm.values],
//     }));

//     pricingForm.resetForm();
//     setShowPricingForm(false);
//   };

//   const submitService = (e) => {
//     e.preventDefault();

//     if (!serviceForm.validateBeforeSubmit()) return;

//     createService.mutate(serviceForm.values, {
//       onSuccess: () => setSubmitted(true),
//     });
//   };

//   const resetForm = () => {
//     serviceForm.resetForm();
//     pricingForm.resetForm();
//     setSubmitted(false);
//   };

//   const handleCancel = () => {
//     resetForm();
//     navigate("/admin/services-details");
//   };

//   if (submitted) {
//     return (
//       <>
//         <AdminPageHeader title="Service Created" />
//         <button className="btn btn-success" onClick={resetForm}>
//           Add Another
//         </button>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminPageHeader title="New Service Details" />
//       <CreateServiceForm
//         form={serviceForm}
//         pricingForm={pricingForm}
//         onSubmit={submitService}
//         onCancel={handleCancel}
//         addPricingDetail={addPricingDetail}
//         showPricingForm={showPricingForm}
//         setShowPricingForm={setShowPricingForm}
//       />
//     </>
//   );
// };

// export default CreateServicePage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminPageHeader from "../../features/admin/components/AdminPageHeader";
import AdminFormBuilder from "../../features/admin/components/AdminFormBuilder";

import {
  serviceFormConfig,
  pricingFormConfig,
} from "../../features/admin/services/service.form";

import { useCreateService } from "../../features/admin/services/hooks";
import useAdminForm from "../../features/admin/hooks/useAdminForm";

const CreateServicePage = () => {
  const navigate = useNavigate();
  const createService = useCreateService();

  const [submitted, setSubmitted] = useState(false);
  const [showPricingForm, setShowPricingForm] = useState(false);

  const serviceForm = useAdminForm(serviceFormConfig);
  const pricingForm = useAdminForm(pricingFormConfig);

  const addPricingDetail = () => {
    if (!pricingForm.validateBeforeSubmit()) return;

    serviceForm.setValues((prev) => ({
      ...prev,
      pricing: [...prev.pricing, pricingForm.values],
    }));

    pricingForm.resetForm();
    setShowPricingForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceForm.validateBeforeSubmit()) return;

    createService.mutate(serviceForm.values, {
      onSuccess: () => setSubmitted(true),
    });
  };

  const handleCancel = () => {
    serviceForm.resetForm();
    pricingForm.resetForm();
    navigate("/admin/services-details");
  };

  if (submitted) {
    return (
      <>
        <AdminPageHeader title="Service Created" />
        <button className="admin-btn" onClick={() => setSubmitted(false)}>
          Add Another
        </button>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader title="New Service Details" />

      <form onSubmit={handleSubmit} noValidate>
        <AdminFormBuilder
          form={serviceForm}
          fields={serviceFormConfig.fields}
        />

        {/* ---------------- Pricing Section ---------------- */}

        {showPricingForm && (
          <>
            <h4 style={{ marginTop: 30 }}>Add Pricing Detail</h4>

            <AdminFormBuilder
              form={pricingForm}
              fields={pricingFormConfig.fields}
            />

            <button
              type="button"
              className="admin-btn"
              onClick={addPricingDetail}
            >
              Add Detail
            </button>
          </>
        )}

        <div className="admin-btn-container">
          <button
            type="button"
            className="admin-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="admin-btn"
            onClick={() => setShowPricingForm(true)}
          >
            Add Pricing Detail
          </button>

          <button type="submit" className="admin-btn">
            Create Service
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateServicePage;

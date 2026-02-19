import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const CreateServiceForm = ({
  form,
  pricingForm,
  onSubmit,
  onCancel,
  addPricingDetail,
  showPricingForm,
  setShowPricingForm,
}) => {
  const { values, handleChange, handleBlur, touched, errors } = form;
  const {
    values: pricingValues,
    handleChange: handlePricingChange,
    handleBlur: handlePricingBlur,
    touched: pricingTouched,
    errors: pricingErrors,
  } = pricingForm;

  return (
    <form onSubmit={onSubmit} noValidate>
      <AccessibleFormField
        id="title"
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title ? errors.title : null}
        required
      />

      <AccessibleFormField
        id="image"
        name="image"
        label="Image Path"
        value={values.image}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.image ? errors.image : null}
        required
      />

      <AccessibleFormField
        id="description"
        name="description"
        label="Description"
        as="textarea"
        rows={6}
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description ? errors.description : null}
        required
      />

      {showPricingForm && (
        <>
          <h4 style={{ marginTop: 30 }}>Add Pricing Detail</h4>

          <AccessibleFormField
            id="type"
            name="type"
            label="Type"
            value={pricingValues.type}
            onChange={handlePricingChange}
            onBlur={handlePricingBlur}
            error={pricingTouched.type ? pricingErrors.type : null}
            required
          />

          <AccessibleFormField
            id="price"
            name="price"
            label="Price"
            value={pricingValues.price}
            onChange={handlePricingChange}
            onBlur={handlePricingBlur}
            error={pricingTouched.price ? pricingErrors.price : null}
            required
          />

          <AccessibleFormField
            id="pricing-description"
            name="description"
            label="Description"
            value={pricingValues.description}
            onChange={handlePricingChange}
            onBlur={handlePricingBlur}
            error={
              pricingTouched.description ? pricingErrors.description : null
            }
            required
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
        <button type="button" className="admin-btn" onClick={onCancel}>
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateServiceForm;

import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const EditServiceForm = ({
  form,
  onSubmit,
  onCancel,
  handlePricingChange,
  handlePricingBlur,
}) => {
  const { values, handleChange, handleBlur, touched, errors } = form;

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

      <h3 style={{ marginTop: 30 }}>Pricing Details</h3>

      {values.pricing.map((item, idx) => (
        <div key={idx}>
          {["type", "price", "description"].map((field) => {
            const key = `pricing-${idx}-${field}`;

            return (
              <AccessibleFormField
                key={key}
                id={key}
                name={field}
                label={field}
                value={item[field]}
                onChange={(e) => handlePricingChange(idx, e)}
                onBlur={(e) => handlePricingBlur(idx, e)}
                error={form.touched[key] ? form.errors[key] : null}
              />
            );
          })}
        </div>
      ))}

      <div className="admin-btn-container">
        <button type="button" className="admin-btn" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="admin-btn">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditServiceForm;

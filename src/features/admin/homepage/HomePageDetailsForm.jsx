import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const HomePageDetailsForm = ({ fields, form, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} noValidate>
        {fields.map(([label, name]) => (
          <AccessibleFormField
            key={name}
            id={name}
            name={name}
            label={label}
            value={form.values[name]}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched[name] ? form.errors[name] : null}
            required
          />
        ))}

        <AccessibleFormField
          id="aboutSubMsg"
          name="aboutSubMsg"
          label="About Section Sub Message"
          as="textarea"
          rows={6}
          value={form.values.aboutSubMsg}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.aboutSubMsg ? form.errors.aboutSubMsg : null}
          required
        />

        <div className="admin-btn-container">
          <button type="submit" className="admin-btn">
            Update
          </button>

          {/* <button
            type="button"
            className="admin-btn"
            onClick={onCancel}
          >
            Cancel
          </button> */}
        </div>
      </form>
  );
};

export default HomePageDetailsForm;

import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const EditTeamMemberForm = ({ form, onSubmit, onCancel }) => {
    const { values, handleChange, handleBlur, touched, errors } = form;

  return (
    <form onSubmit={onSubmit} noValidate>
        <AccessibleFormField
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : null}
          required
        />

        <AccessibleFormField
          id="role"
          name="role"
          label="Role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.role ? errors.role : null}
          required
        />

        <AccessibleFormField
          id="photo"
          name="photo"
          label="Image Path"
          value={values.photo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.photo ? errors.photo : null}
          required
        />

        <AccessibleFormField
          id="bio"
          name="bio"
          label="Bio"
          as="textarea"
          rows={6}
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.bio ? errors.bio : null}
          description={
            values.bio.length < 25
              ? `${25 - values.bio.length} characters remaining`
              : undefined
          }
          required
        />

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

export default EditTeamMemberForm;

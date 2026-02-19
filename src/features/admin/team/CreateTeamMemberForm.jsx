import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const CreateTeamMemberForm = ({ form, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} noValidate>
      <AccessibleFormField
        id="name"
        name="name"
        label="Name"
        value={form.values.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.touched.name ? form.errors.name : null}
        required
      />

        <AccessibleFormField
          id="role"
          name="role"
          label="Role"
          value={form.values.role}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.role ? form.errors.role : null}
          required
        />

        <AccessibleFormField
          id="photo"
          name="photo"
          label="Image Path"
          value={form.values.photo}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.photo ? form.errors.photo : null}
          required
        />

        <AccessibleFormField
          id="bio"
          name="bio"
          label="Bio"
          as="textarea"
          rows={6}
          value={form.values.bio}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.bio ? form.errors.bio : null}
          description={
            form.values.bio.length < 25
              ? `${25 - form.values.bio.length} characters remaining`
              : null
          }
          required
        />

      <div className="admin-btn-container">
        <button type="submit" className="admin-btn">
          Create Team Member
        </button>

        <button
          type="button"
          className="admin-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTeamMemberForm;

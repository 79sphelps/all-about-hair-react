import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const AdminFormBuilder = ({ form, fields }) => {
  return (
    <>
      {fields.map((field) => (
        <AccessibleFormField
          key={field.name}
          id={field.name}
          name={field.name}
          label={field.label}
          as={field.type === "textarea" ? "textarea" : "input"}
          rows={field.rows}
          value={form.values[field.name]}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={
            form.touched[field.name]
              ? form.errors[field.name]
              : null
          }
          description={
            field.dynamicDescription
              ? field.dynamicDescription(form.values)
              : field.description
          }
          required={field.required}
        />
      ))}
    </>
  );
};

export default AdminFormBuilder;

import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const AdminFormBuilder = ({ form, fields }) => {
  return (
    <>
      {fields.map((field) => {
        if (field.type === "array") {
          const items = form.values[field.name] || [];

          return (
            <div key={field.name}>
              <h3>{field.label}</h3>

              {items.map((item, index) => (
                <AdminFormBuilder
                  key={index}
                  form={{
                    ...form,
                    values: item,
                    handleChange: (e) =>
                      form.handleNestedChange(field.name, index, e),
                  }}
                  fields={field.itemConfig.fields}
                />
              ))}

              <button
                type="button"
                onClick={() =>
                  form.addArrayItem(field.name, field.itemConfig.defaultValues)
                }
              >
                Add Pricing
              </button>
            </div>
          );
        }

        return (
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
            error={form.touched[field.name] ? form.errors[field.name] : null}
            description={
              field.dynamicDescription
                ? field.dynamicDescription(form.values)
                : field.description
            }
            required={field.required}
          />
        );
      })}
    </>
  );
};

export default AdminFormBuilder;

import { memo } from "react";
import AccessibleFormField from "../../../ui/form/AccessibleFormField";
import PricingRow from "./PricingRow";


import { useFormContext } from "../forms/FormContext";


const AdminFormBuilder = memo(function AdminFormBuilder({
  // form,
  fields,
}) {


  const form = useFormContext();



  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleNestedChange,
    addArrayItem,
    removeArrayItem,
  } = form;

  return (
    <>
      {fields.map((field) => {
        // ARRAY FIELD
        if (field.type === "array") {
          const items = values[field.name] || [];
          const fieldErrors = errors?.[field.name] || [];
          const fieldTouched = touched?.[field.name] || [];

          return (
            <div key={field.name}>
              <h3>{field.label}</h3>

              {items.map((item, index) => (
                <PricingRow
                  key={item._id || index}
                  item={item}
                  index={index}
                  arrayName={field.name}
                  errors={fieldErrors[index]}
                  touched={fieldTouched[index]}
                  handleNestedChange={handleNestedChange}
                  handleBlur={handleBlur}
                  removeArrayItem={removeArrayItem}
                />
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem(
                    field.name,
                    field.itemConfig.defaultValues
                  )
                }
              >
                Add {field.label}
              </button>
            </div>
          );
        }

        // NORMAL FIELD
        const value = values?.[field.name] ?? "";
        const error =
          touched?.[field.name] && errors?.[field.name]
            ? errors[field.name]
            : null;

        return (
          <AccessibleFormField
            key={field.name}
            id={field.name}
            name={field.name}
            label={field.label}
            as={field.type === "textarea" ? "textarea" : "input"}
            rows={field.rows}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            description={
              field.dynamicDescription
                ? field.dynamicDescription(values)
                : field.description
            }
            required={field.required}
          />
        );
      })}
    </>
  );
});

export default AdminFormBuilder;

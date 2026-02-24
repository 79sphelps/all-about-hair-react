/*
Todos:
- Refactor PricingRow to be fully config-driven (so no hardcoded type/price/description)
- Or, Convert this into a generic ArrayField component usable for ANY array
*/

import { memo, useCallback } from "react";
import AccessibleFormField from "../../../ui/form/AccessibleFormField";

const PricingRow = ({
  item,
  index,
  errors,
  touched,
  arrayName,
  handleNestedChange,
  handleBlur,
  removeArrayItem,
}) => {
  // Stable handler factory
  const createChangeHandler = useCallback(
    (fieldName) => (e) => {
      handleNestedChange(arrayName, index, e);
    },
    [arrayName, index, handleNestedChange]
  );

  return (
    <div className="pricing-row">
      <AccessibleFormField
        name="type"
        id={`type-${index}`}
        label="Type"
        value={item.type || ""}
        onChange={createChangeHandler("type")}
        onBlur={handleBlur}
        error={touched?.type ? errors?.type : null}
        required
      />

      <AccessibleFormField
        name="price"
        id={`price-${index}`}
        label="Price"
        value={item.price || ""}
        onChange={createChangeHandler("price")}
        onBlur={handleBlur}
        error={touched?.price ? errors?.price : null}
        required
      />

      <AccessibleFormField
        name="description"
        id={`description-${index}`}
        label="Description"
        as="textarea"
        rows={3}
        value={item.description || ""}
        onChange={createChangeHandler("description")}
        onBlur={handleBlur}
        error={touched?.description ? errors?.description : null}
      />

      <button
        type="button"
        onClick={() => removeArrayItem(arrayName, index)}
      >
        Remove
      </button>
    </div>
  );
};

export default memo(
  PricingRow,
  (prev, next) => {
    return (
      prev.item === next.item &&
      prev.errors === next.errors &&
      prev.touched === next.touched &&
      prev.index === next.index
    );
  }
);
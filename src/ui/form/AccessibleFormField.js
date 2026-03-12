import { memo } from "react";

const AccessibleFormField = ({
  id,
  name,
  label,
  type = "text",
  register,
  registerOptions,
  value,
  onChange,
  onBlur,
  error,
  touched,
  dirty,
  as = "input",
  rows,
  placeholder,
  required,
  description,
  showCharCount,
  currentLength,
  inputRef,
  ...rest
}) => {
  const fieldName = name || id;

  const errorId = `${id}-error`;
  const descriptionId = description ? `${id}-description` : null;

  const showError = error;

  const describedBy = [
    descriptionId,
    showError ? errorId : null
  ].filter(Boolean).join(" ") || undefined;

  const sharedProps = {
    id,
    name: fieldName,
    placeholder,
    "aria-invalid": !!error,
    "aria-describedby": describedBy,
    ...(as !== "textarea" ? { type } : {}),
    ...rest
  };

  const fieldProps = register
    ? {
        ...sharedProps,
        ...register(fieldName, registerOptions)
      }
    : {
        ...sharedProps,
        value: value ?? "",
        onChange,
        onBlur,
        ref: inputRef
      };

  return (
    <div className="form-field">

      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true" tabIndex="-1"> *</span>}
      </label>

      {as === "textarea"
        ? <textarea {...fieldProps} rows={rows || 4} />
        : <input {...fieldProps} />
      }

      {description && (
        <div id={descriptionId} className="form-description">
          {description}
        </div>
      )}

      {showError && (
        <div
          id={errorId}
          role="alert"
          style={{ color: "red", marginTop: 4 }}
        >
          {error.message}
        </div>
      )}

      {/* {showCharCount && (
        <div className="char-count">
          (Message Length: {currentLength} characters)
        </div>
      )} */}

    </div>
  );
};

/* Using 'memo()' here:
A field only re-renders if:
- Its value changes
- Its error changes
- Required changes
- Description changes

Typing in one field does NOT re-render siblings.
*/
// export default memo(
//   AccessibleFormField,
//   (prev, next) => {
//     return (
//       prev.value === next.value &&
//       prev.error === next.error &&
//       prev.required === next.required &&
//       prev.description === next.description
//     );
//   }
// );

export default memo(AccessibleFormField);

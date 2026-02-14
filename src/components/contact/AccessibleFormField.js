/*
Support for:
- react-hook-form
- controlled inputs
- optional descriptions
- optional errors
- proper aria linking
*/

const AccessibleFormField = ({
  id,
  name,
  label,
  type = "text",
  register,
  registerOptions,
  value,
  onChange,
  error,
  as = "input",
  rows,
  placeholder,
  required,
  description,
}) => {
  const errorId = `${id}-error`;
  const descriptionId = description ? `${id}-description` : null;

  const hasError = !!error;

  const describedBy = [descriptionId, hasError ? errorId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  const sharedProps = {
    id,
    name,
    type,
    placeholder,
    "aria-invalid": hasError,
    "aria-describedby": describedBy,
  };

  // If using react-hook-form
  const fieldProps = register
    ? { ...sharedProps, ...register(name || id, registerOptions) }
    : { ...sharedProps, value, onChange };

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {as === "textarea" ? (
        <textarea {...fieldProps} rows={rows || 4} />
      ) : (
        <input {...fieldProps} />
      )}

      {description && (
        <div id={descriptionId} className="form-description">
          {description}
        </div>
      )}

      {hasError && (
        <div
          id={errorId}
          role="alert"
          style={{ color: "red", marginTop: 4 }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
};

export default AccessibleFormField;

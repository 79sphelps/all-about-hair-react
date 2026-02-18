const AccessibleFormField = ({
  id,
  name,
  label,
  type = "text",
  register,
  registerOptions,
  value,
  onChange,
  onBlur,          // ⭐ REQUIRED
  error,
  as = "input",
  rows,
  placeholder,
  required,
  description,
  inputRef,        // optional ref support
  ...rest          // ⭐ safety for future props
}) => {
  const fieldName = name || id;

  const errorId = `${id}-error`;
  const descriptionId = description ? `${id}-description` : null;

  const hasError = !!error;

  const describedBy = [descriptionId, hasError ? errorId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  const sharedProps = {
    id,
    name: fieldName,
    placeholder,
    "aria-invalid": hasError,
    "aria-describedby": describedBy,
    ...(as !== "textarea" ? { type } : {}),
    ...rest,
  };

  /**
   * react-hook-form mode
   */
  const fieldProps = register
    ? {
        ...sharedProps,
        ...register(fieldName, registerOptions),
      }
    : {
        ...sharedProps,
        value: value ?? "",
        onChange,
        onBlur,      // ⭐ CRITICAL FIX
        ref: inputRef,
      };

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
          {error.message || error}
        </div>
      )}
    </div>
  );
};

export default AccessibleFormField;

import React from "react";

const AccessibleFormField = ({
  id,
  label,
  type = "text",
  register,
  registerOptions,
  error,
  as = "input", // "input" | "textarea"
  rows,
  placeholder,
  required,
  showCharCount,
  currentLength,
  minLength,
}) => {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const hasError = !!error;

  const describedBy =
    [hasError ? errorId : null, showCharCount ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const sharedProps = {
    id,
    "aria-invalid": hasError,
    "aria-describedby": describedBy,
    placeholder,
    ...register(id, registerOptions),
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {as === "textarea" ? (
        <textarea {...sharedProps} rows={rows || 4} />
      ) : (
        <input {...sharedProps} type={type} />
      )}

      {/* Character Counter */}
      {showCharCount && typeof currentLength === "number" && minLength && (
        <div id={helperId} aria-live="polite">
          {currentLength < minLength
            ? `${minLength - currentLength} characters still needed`
            : "Minimum length reached"}
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div id={errorId} role="alert" style={{ color: "red", marginTop: 4 }}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default AccessibleFormField;

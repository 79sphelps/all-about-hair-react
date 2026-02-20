/*
Handles:
values
touched
errors
onChange best UX pattern
onBlur validation
submit validation

This is the UX engine.

Handles:
✔ controlled state
✔ touched logic
✔ validate-on-blur
✔ validate-on-change-after-touch
✔ submit-safe validation
*/

import { useState } from "react";

const useAdminForm = ({ schema, defaultValues }) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // prevent validating possibly stale values
    setTimeout(() => {
      validateField(name);
    }, 0);
  };

  const validateField = (name) => {
  if (!schema) return;

  const result = schema.safeParse(values);

  if (!result.success) {
    const issues = result.error?.issues || result.error?.errors || [];

    const fieldError = issues.find(
      (err) => err.path?.[0] === name
    );

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError?.message || null,
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  }
};


  const validateBeforeSubmit = () => {
    if (!schema) {
      console.error("useAdminForm: schema is undefined");
      return;
    }
    const result = schema.safeParse(values);

    if (!result.success) {
      const newErrors = {};
      const issues = result.error?.issues || result.error?.errors || [];
      issues.forEach((err) => {
        newErrors[err.path?.[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateBeforeSubmit,
    resetForm,
    setValues,
  };
};

export default useAdminForm;

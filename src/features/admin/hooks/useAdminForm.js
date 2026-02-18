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
import useAdminFormValidation from "./useAdminFormValidation";

export default function useAdminForm({
  initialValues = {},
  validators = {},
  errorMessages = {},
}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const { validateField, validateAll } = useAdminFormValidation(
    validators,
    errorMessages
  );

  /* ---------- Change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Best UX:
    // Only validate if user already touched field
    if (touched[name]) {
      const error = validateField(name, value, {
        ...values,
        [name]: value,
      });

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /* ---------- Blur ---------- */
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value, values);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /* ---------- Submit ---------- */
  const validateBeforeSubmit = () => {
    const nextErrors = validateAll(values);

    // mark everything touched
    const touchedAll = {};
    Object.keys(validators).forEach((k) => {
      touchedAll[k] = true;
    });

    setTouched(touchedAll);
    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* ---------- Helpers ---------- */

  const setFormValues = (nextValues) => {
    setValues(nextValues);
  };

  const resetForm = (nextValues = initialValues) => {
    setValues(nextValues);
    setTouched({});
    setErrors({});
  };

  return {
    values,
    touched,
    errors,

    setFormValues,
    resetForm,

    handleChange,
    handleBlur,

    validateBeforeSubmit,
    setValues,
  };
}

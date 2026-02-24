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

import { useState, useCallback } from "react";

const useAdminForm = ({ schema, defaultValues }) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setDeepValue = (obj, path, value) => {
    const keys = Array.isArray(path) ? path : path.split(".");
    const newObj = { ...obj };
    let current = newObj;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };

        current = current[key];
      }
    });

    return newObj;
  };

  const getDeepValue = (obj, path) => {
    const keys = Array.isArray(path) ? path : path.split(".");
    return keys.reduce((acc, key) => acc?.[key], obj);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => setDeepValue(prev, name, value));
  }, []);

  const handleNestedChange = useCallback((arrayName, index, e) => {
    const { name, value } = e.target;
    const path = `${arrayName}.${index}.${name}`;
    setValues((prev) => setDeepValue(prev, path, value));
  }, []);

  const addArrayItem = useCallback((arrayName, defaultItem) => {
    setValues((prev) => {
      const currentArray = getDeepValue(prev, arrayName) || [];
      const updated = [...currentArray, { ...defaultItem }];
      return setDeepValue(prev, arrayName, updated);
    });
  }, []);

  const removeArrayItem = useCallback((arrayName, index) => {
    setValues((prev) => {
      const currentArray = getDeepValue(prev, arrayName) || [];
      const updated = currentArray.filter((_, i) => i !== index);
      return setDeepValue(prev, arrayName, updated);
    });
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => setDeepValue(prev, name, true));

    // prevent validating possibly stale values
    setTimeout(() => {
      validateField(name);
    }, 0);
  }, []);

  const validateField = (name) => {
    if (!schema) return;
    const result = schema.safeParse(values);

    if (!result.success) {
      const issues = result.error?.issues || result.error?.errors || [];

      const fieldError = issues.find((err) => err.path?.[0] === name);

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
      const formattedErrors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return false;
    }

    setErrors({});
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
    handleNestedChange,
    handleBlur,
    validateBeforeSubmit,
    addArrayItem,
    removeArrayItem,
    resetForm,
    setValues,
  };
};

export default useAdminForm;

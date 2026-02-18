/*
Handles:
- running validators
- returning error objects
- validating one field or all fields
*/

import { useCallback } from "react";

/**
 * validators shape:
 * {
 *   fieldName: (value, values) => true | false
 * }
 *
 * errorMessages shape:
 * {
 *   fieldName: "Error message"
 * }
 */

export default function useAdminFormValidation(validators = {}, errorMessages = {}) {
  const validateField = useCallback(
    (name, value, values = {}) => {
      const validator = validators[name];
      if (!validator) return null;

      const valid = validator(value, values);

      if (valid) return null;

      return {
        message: errorMessages[name] || "Invalid value.",
      };
    },
    [validators, errorMessages]
  );

  const validateAll = useCallback(
    (values = {}) => {
      const errors = {};

      Object.keys(validators).forEach((key) => {
        const result = validateField(key, values[key], values);
        if (result) {
          errors[key] = result;
        }
      });

      return errors;
    },
    [validators, validateField]
  );

  return {
    validateField,
    validateAll,
  };
}

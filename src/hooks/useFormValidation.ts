"use client";

import { useState, useCallback } from "react";

type ValidationSchema<T> = {
  [K in keyof T]?: (value: any) => string | null;
};

export const useFormValidation = <T extends Record<string, any>>(
  schema: ValidationSchema<T>
) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((name: keyof T, value: any) => {
    const validator = schema[name];
    if (validator) {
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
      return error;
    }
    return null;
  }, [schema]);

  const handleBlur = (name: keyof T, value: any) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const clearError = (name: keyof T) => {
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (formData: T) => {
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(schema).forEach((key) => {
      const fieldName = key as keyof T;
      const validator = schema[fieldName];
      if (validator) {
        const error = validator(formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    
    // Mark all fields in schema as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    Object.keys(schema).forEach((key) => {
      allTouched[key as keyof T] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  return { errors, touched, validateField, handleBlur, clearError, validateForm, setErrors };
};

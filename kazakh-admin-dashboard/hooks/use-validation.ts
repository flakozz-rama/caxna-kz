import { useState } from 'react';
import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export function useValidation<T>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validate = (data: unknown): { isValid: boolean; errors: ValidationError[] } => {
    try {
      schema.parse(data);
      setErrors([]);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        setErrors(validationErrors);
        return { isValid: false, errors: validationErrors };
      }
      return { isValid: false, errors: [{ field: 'general', message: 'Произошла ошибка валидации' }] };
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(errors.filter(error => error.field !== fieldName));
  };

  return {
    errors,
    validate,
    getFieldError,
    clearErrors,
    clearFieldError,
  };
} 
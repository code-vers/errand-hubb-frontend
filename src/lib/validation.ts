export const validateName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required.";
  if (trimmed.length < 2) return "Must be at least 2 characters.";
  if (trimmed.length > 50) return "Cannot exceed 50 characters.";
  
  // Allow letters, spaces, hyphens, apostrophes (and international chars)
  // Rejects numbers and other symbols
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-\']+$/;
  if (!nameRegex.test(trimmed)) return "Contains invalid characters. Only letters, spaces, hyphens, and apostrophes are allowed.";
  
  // Prevent multiple consecutive spaces
  if (/\s{2,}/.test(trimmed)) return "Multiple spaces are not allowed.";
  
  return null;
};

export const validateFullName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Full name is required.";
  if (trimmed.length < 2) return "Full name must be at least 2 characters.";
  if (trimmed.length > 100) return "Full name cannot exceed 100 characters.";
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-\']+$/;
  if (!nameRegex.test(trimmed)) return "Contains invalid characters.";
  if (/\s{2,}/.test(trimmed)) return "Multiple spaces are not allowed.";
  
  return null;
};

export const validateBusinessName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Business name is required.";
  if (trimmed.length < 2) return "Business name must be at least 2 characters.";
  if (trimmed.length > 120) return "Business name cannot exceed 120 characters.";
  
  // Allow letters, numbers, spaces, apostrophes, hyphens, ampersands, commas, dots
  const businessRegex = /^[a-zA-Z0-9À-ÿ\s\-\'\&\,\.]+$/;
  if (!businessRegex.test(trimmed)) return "Contains invalid characters.";
  
  return null;
};

export const validateEmail = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (trimmed.length > 254) return "Email cannot exceed 254 characters.";
  
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
  
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters long.";
  if (value.length > 128) return "Password cannot exceed 128 characters.";
  
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
    return "Password must contain both uppercase and lowercase letters.";
  }
  if (!/[0-9]/.test(value)) {
    return "Password must contain at least one number.";
  }
  
  return null;
};

export const validateAddress = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Address is required.";
  if (trimmed.length > 150) return "Address cannot exceed 150 characters.";
  return null;
};

export const validateCityState = (value: string, fieldName: string = "Field"): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return `${fieldName} is required.`;
  if (trimmed.length > 80) return `${fieldName} cannot exceed 80 characters.`;
  return null;
};

export const validateZip = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Zip code is required.";
  if (trimmed.length > 20) return "Zip code cannot exceed 20 characters.";
  return null;
};

export const validateSubject = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Subject is required.";
  if (trimmed.length < 3) return "Subject must be at least 3 characters.";
  if (trimmed.length > 120) return "Subject cannot exceed 120 characters.";
  return null;
};

export const validateTextarea = (value: string, maxLength: number, fieldName: string = "Field", required: boolean = true): string | null => {
  const trimmed = value.trim();
  if (required && !trimmed) return `${fieldName} is required.`;
  if (trimmed.length > maxLength) return `${fieldName} cannot exceed ${maxLength} characters.`;
  return null;
};

export const validatePhone = (value: string): string | null => {
  if (!value || value.trim() === "") return "Phone number is required.";
  // react-phone-number-input handles its own strict E.164 formatting.
  // We can just check max length to be safe. E.164 max is 15. With plus sign, it's 16.
  if (value.length > 20) return "Phone number is too long.";
  return null;
};

export const validateGenericString = (value: string, maxLength: number, fieldName: string = "Field", required: boolean = true): string | null => {
  const trimmed = value.trim();
  if (required && !trimmed) return `${fieldName} is required.`;
  if (trimmed.length > maxLength) return `${fieldName} cannot exceed ${maxLength} characters.`;
  return null;
};

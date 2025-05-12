export const REGEX = {
  ID_PHONE_NUMBER: /^0\d{9,12}$/,
  ID_PHONE_NUMBER_INTERNATIONAL: /^\+62\d{9,12}$/,
  PASSWORD:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*(),.?":{}|<>]).{8,}$/,
  ID_FAX: /^0[2-9][0-9]{7,10}$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
} as const;

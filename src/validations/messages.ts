import { string } from "./elements";
const messages = {
  required: "Required field",
  email_taken: "Email already taken",
  username_taken: "Username already used",
  username_not_exist: "Username does not exist",
  password_not_added: "No password added to this account",
  password_incorrect: "Password does not match",
  unexpected: "Unexpected error occurred",
  user_not_exist: "User not registered",
  valid_string: "Must be a valid string",
  valid_email: "Must be a valid email address",
  length2to20: "Must be between 2 and 20 characters",
  length4to20: "Must be between 4 and 20 characters",
  length6to20: "Must be between 6 and 20 characters",
  username_regex: "Use letters, numbers, underscores, and hyphens", // "Can contain letters, numbers, underscores, and hyphens (between)",
};

type MapperType = {
  key: string;
  value: keyof typeof messages;
};

const responseErrorMapper: { [key: string]: MapperType } = {
  USER_NOT_FOUND: {
    key: "email",
    value: "user_not_exist",
  },
  NO_PASSWORD_FOUND: {
    key: "password",
    value: "password_not_added",
  },
  INVALID_PASSWORD: {
    key: "password",
    value: "password_incorrect",
  },
};

export const getValidationMessage = (input: string, defaultKey = "default") => {
  const { key, value } = responseErrorMapper[input] || {};

  return {
    name: key || defaultKey,
    error: { type: "custom", message: messages[value] || messages.unexpected },
  };
};

export default messages;

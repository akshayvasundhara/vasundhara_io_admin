export const validate = (values) => {
  let errors = {};
  // Validate email field
  if (!values?.email) {
    errors.email = "Email field is required.";
  } else if (!/\S+@\S+\.\S+/.test(values?.email)) {
    errors.email = "Invalid email format. Please provide a valid email address.";
  }

  // Validate password field
  if (!values?.password) {
    errors.password = "Password field is required.";
  } else if (values?.password?.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  return errors;
};

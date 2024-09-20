export const ProfileValidate = (values) => {
  let errors = {};
  // Validate email field
  if (!values?.email) {
    errors.email = "Email field is required.";
  } else if (!/\S+@\S+\.\S+/.test(values?.email)) {
    errors.email = "Invalid email format. Please provide a valid email address.";
  }

  // Validate name field
  if (!values?.name) {
    errors.name = "Name field is required.";
  } else if (values?.name?.length < 2) {
    errors.name = "Name should be minimum 2 characters.";
  }

  // Validate full_name field
  if (!values?.first_name) {
    errors.first_name = "First name field is required.";
  }

  // Validate full_name field
  if (!values?.last_name) {
    errors.last_name = "Last name field is required.";
  }

  // Validate contact_no field
  if (!values?.contact_no) {
    errors.contact_no = "Contact number field is required.";
  }
  //  else if (values?.contact_no?.length < 3 || values?.contact_no.length > 12) {
  //   errors.contact_no = "Contact number must be between 3 and 12 digits";
  // }

  // Validate password field
  if (!values?.password) {
    errors.password = "Password field is required.";
  } else if (values?.password?.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  return errors;
};

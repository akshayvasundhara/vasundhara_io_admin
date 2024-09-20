export const ValidateFields = (values) => {
  let errors = {};
  // Validate name field
  if (!values?.name) {
    errors.name = "Name field is required.";
  } else if (values?.name?.trim()?.length === 0) {
    errors.name = "Name cannot be empty or contain only spaces.";
  } else if (values?.name?.length < 2) {
    errors.name = "Name should be minimum 2 characters.";
  }

  // Validate title field
  if (!values?.title) {
    errors.title = "Title field is required.";
  } else if (values?.title?.trim()?.length === 0) {
    errors.title = "Title cannot be empty or contain only spaces.";
  } else if (values?.title?.length < 2) {
    errors.title = "Title should be minimum 2 characters.";
  }
  // Validate Designation
  if (!values?.designation) {
    errors.designation = "Designation field is required.";
  } else if (values?.designation?.trim()?.length === 0) {
    errors.designation = "Designation cannot be empty or contain only spaces.";
  } else if (values?.designation?.length < 2) {
    errors.designation = "Designation should be minimum 2 characters.";
  }

  // Validate Description field
  if (!values?.description) {
    errors.description = "Description field is required.";
  } else if (values?.description?.trim()?.length === 0) {
    errors.description = "Description cannot be empty or contain only spaces.";
  } else if (values?.description?.trim()?.length < 2) {
    errors.description = "Description should be minimum 2 characters.";
  }



  // Validate time duration field
  if (!values?.duration) {
    errors.duration = "Time Duration field is required.";
  } else if (!/^\d+\s+\w+$/.test(values?.duration.trim())) {
    errors.duration = "Invalid time duration format. Please enter a valid duration (e.g., 10 min).";
  } else {
    const durationParts = values?.duration.trim().split(/\s+/); // Split by whitespace
    const numberPart = parseInt(durationParts[0], 10); // Parse the number part
    if (numberPart < 0) {
      errors.duration = "Time duration must be a non-negative number.";
    }
  }

  // Validate Testimonial image
  if (!values?.image) {
    errors.image = "Please select an image";
  }
  if (!values?.image) {
    errors.image = "Please select image";
  }

  return errors;
};

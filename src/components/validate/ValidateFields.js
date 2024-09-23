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

  // Validate Job name field
  if (!values?.job_name) {
    errors.job_name = "Job Name field is required.";
  } else if (values?.job_name?.trim()?.length === 0) {
    errors.job_name = "Job Name cannot be empty or contain only spaces.";
  } else if (values?.job_name?.length < 2) {
    errors.job_name = "Job Name should be minimum 2 characters.";
  }

  // Validate Experience field
  if (!values?.experience) {
    errors.experience = "Experience field is required.";
  } else if (values?.experience?.trim()?.length === 0) {
    errors.experience = "Experience cannot be empty or contain only spaces.";
  } else if (values?.experience?.length < 2) {
    errors.experience = "Experience should be minimum 2 characters.";
  }


  // Validate Qualification field
  if (!values?.qualification) {
    errors.qualification = "Qualification field is required.";
  } else if (values?.qualification?.trim()?.length === 0) {
    errors.qualification = "Qualification cannot be empty or contain only spaces.";
  } else if (values?.qualification?.length < 2) {
    errors.qualification = "Qualification should be minimum 2 characters.";
  }


  // Validate Location field
  if (!values?.location || values.location.length === 0) {
    errors.location = "Location field is required.";
  } else if (values.location.some(loc => typeof loc !== 'string' || loc.trim().length === 0)) {
    errors.location = "Location cannot be empty or contain only spaces.";
  } else if (values.location.some(loc => loc.length < 2)) {
    errors.location = "Each location should be a minimum of 2 characters.";
  }

  // Validate responsibilities field
  if (!values?.responsibilities || values.responsibilities.length === 0) {
    errors.responsibilities = "Responsibilities field is required.";
  } else if (values.responsibilities.some(res => typeof res !== 'string' || res.trim().length === 0)) {
    errors.responsibilities = "Responsibilities cannot be empty or contain only spaces.";
  } else if (values.responsibilities.some(res => res.length < 2)) {
    errors.responsibilities = "Each responsibilities should be a minimum of 2 characters.";
  }

  // No of openings validation
  if (!values?.no_of_openings) {
    errors.no_of_openings = "Number of openings field is required.";
  } else if (!/^\d+$/.test(values.no_of_openings)) {
    errors.no_of_openings = "Number of openings must be a valid number.";
  } else if (parseInt(values.no_of_openings, 10) < 1) {
    errors.no_of_openings = "Number of openings must be at least 1.";
  }

  // Validate skill field
  if (!values?.skill || values.skill.length === 0) {
    errors.skill = "Skill field is required.";
  }
  else if (values.skill.some(sk => typeof sk !== 'string' || sk.trim().length === 0)) {
    errors.skill = "Skill cannot be empty or contain only spaces.";
  }
  else if (values.skill.some(sk => sk.length < 2)) {
    errors.skill = "Each skill should be a minimum of 2 characters.";
  }

  return errors;
};

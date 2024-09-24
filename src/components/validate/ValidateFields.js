export const ValidateFields = (values) => {
  let errors = {};

  // Validate name field
  if (!values?.name) {
    errors.name = "Name field is required.";
  } else if (values?.name?.trim()?.length === 0) {
    errors.name = "Name cannot be empty or contain only spaces.";
  } else if (values?.name.length < 3 || values?.name.length > 255) {
    errors.name = "Name should be between 3 and 25 characters.";
  }

  // Validate title field
  if (!values?.title) {
    errors.title = "Title field is required.";
  } else if (values?.title?.trim()?.length === 0) {
    errors.title = "Title cannot be empty or contain only spaces.";
  } else if (values?.title.length < 3 || values?.title.length > 255) {
    errors.title = "Title should be between 3 and 25 characters.";
  }

  // Validate Designation
  if (!values?.designation) {
    errors.designation = "Designation field is required.";
  } else if (values?.designation?.trim()?.length === 0) {
    errors.designation = "Designation cannot be empty or contain only spaces.";
  } else if (values?.designation.length < 3 || values?.designation.length > 255) {
    errors.designation = "Designation should be between 3 and 255 characters.";
  }

  // Validate Description field
  if (!values?.description) {
    errors.description = "Description field is required.";
  } else if (values?.description?.trim()?.length === 0) {
    errors.description = "Description cannot be empty or contain only spaces.";
  } else if (values?.description.trim().length < 3 || values?.description.trim().length > 255) {
    errors.description = "Description should be between 3 and 255 characters.";
  }
  // Image validation
  if (!values?.image) {
    errors.image = "Please select image";
  }

  // Validate Job name field
  if (!values?.job_name) {
    errors.job_name = "Job Name field is required.";
  } else if (values?.job_name?.trim()?.length === 0) {
    errors.job_name = "Job Name cannot be empty or contain only spaces.";
  } else if (values?.job_name.length < 3 || values?.job_name.length > 25) {
    errors.job_name = "Job Name should be between 3 and 25 characters.";
  }


  // Validate Experience field
  if (!values?.experience) {
    errors.experience = "Experience field is required.";
  } else if (values?.experience?.trim()?.length === 0) {
    errors.experience = "Experience cannot be empty or contain only spaces.";
  } else if (values?.experience.length < 3 || values?.experience.length > 25) {
    errors.experience = "Experience should be between 3 and 25 characters.";
  }

  // Validate Qualification field
  if (!values?.qualification) {
    errors.qualification = "Qualification field is required.";
  } else if (values?.qualification?.trim()?.length === 0) {
    errors.qualification = "Qualification cannot be empty or contain only spaces.";
  } else if (values?.qualification.length < 3 || values?.qualification.length > 25) {
    errors.qualification = "Qualification should be between 3 and 25 characters.";
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
    errors.responsibilities = "Each responsibility should be a minimum of 2 characters.";
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
  } else if (values.skill.some(sk => typeof sk !== 'string' || sk.trim().length === 0)) {
    errors.skill = "Skill cannot be empty or contain only spaces.";
  } else if (values.skill.some(sk => sk.length < 3 || sk.length > 25)) {
    errors.skill = "Each skill should be between 3 and 25 characters.";
  }

  // Validate linkedin_link field
  if (!values?.linkedin_link) {
    errors.linkedin_link = "Linkedin link is required.";
  } else if (values?.linkedin_link?.trim()?.length === 0) {
    errors.linkedin_link = "Linkedin link cannot be empty or contain only spaces.";
  } else if (values?.linkedin_link.length < 3 || values?.linkedin_link.length > 255) {
    errors.linkedin_link = "Linkedin link should be between 3 and 255 characters.";
  }

  // Validate facebook_link field
  if (!values?.facebook_link) {
    errors.facebook_link = "Facebook link is required.";
  } else if (values?.facebook_link?.trim()?.length === 0) {
    errors.facebook_link = "Facebook link cannot be empty or contain only spaces.";
  } else if (values?.facebook_link.length < 3 || values?.facebook_link.length > 255) {
    errors.facebook_link = "Facebook link should be between 3 and 25 characters.";
  }

  // Validate twitter_link field
  if (!values?.twitter_link) {
    errors.twitter_link = "Twitter link is required.";
  } else if (values?.twitter_link?.trim()?.length === 0) {
    errors.twitter_link = "Twitter link cannot be empty or contain only spaces.";
  } else if (values?.twitter_link.length < 3 || values?.twitter_link.length > 255) {
    errors.twitter_link = "Twitter link should be between 3 and 25 characters.";
  }


  // Validate Question field
  if (!values?.question) {
    errors.question = "Question field is required.";
  } else if (values?.question?.trim()?.length === 0) {
    errors.question = "Question cannot be empty or contain only spaces.";
  } else if (values?.question.length < 3 || values?.question.length > 255) {
    errors.question = "Question should be between 3 and 25 characters.";
  }


  // Validate Answer field
  if (!values?.answer) {
    errors.answer = "Answer field is required.";
  } else if (values?.answer?.trim()?.length === 0) {
    errors.answer = "Answer cannot be empty or contain only spaces.";
  } else if (values?.answer.length < 3 || values?.answer.length > 255) {
    errors.answer = "Answer should be between 3 and 25 characters.";
  }

  // Validate type field
  if (!values?.type || values.type.length === 0) {
    errors.type = "Type field is required.";
  } else if (values.type.some(sk => typeof sk !== 'string' || sk.trim().length === 0)) {
    errors.type = "Type cannot be empty or contain only spaces.";
  } else if (values.type.some(sk => sk.length < 3 || sk.length > 25)) {
    errors.type = "Each Type should be between 3 and 25 characters.";
  }


  return errors;
};

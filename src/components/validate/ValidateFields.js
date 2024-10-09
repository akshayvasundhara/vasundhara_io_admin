export const ValidateFields = (values) => {
  let errors = {};

  // Validate name field
  if (!values?.name) {
    errors.name = "Name field is required.";
  } else if (values?.name?.trim()?.length === 0) {
    errors.name = "Name cannot be empty or contain only spaces.";
  } else if (values?.name.length < 3 || values?.name.length > 25) {
    errors.name = "Name must be between 3 and 25 characters.";
  }

  // Validate title field
  if (!values?.title) {
    errors.title = "Title field is required.";
  } else if (values?.title?.trim()?.length === 0) {
    errors.title = "Title cannot be empty or contain only spaces.";
  } else if (values?.title.length < 3 || values?.title.length > 255) {
    errors.title = "Title must be between 3 and 255 characters.";
  }

  // Validate Designation
  if (!values?.designation) {
    errors.designation = "Designation field is required.";
  } else if (values?.designation?.trim()?.length === 0) {
    errors.designation = "Designation cannot be empty or contain only spaces.";
  } else if (values?.designation.length < 3 || values?.designation.length > 255) {
    errors.designation = "Designation must be between 3 and 255 characters.";
  }

  // Validate Description field
  if (!values?.description) {
    errors.description = "Description field is required.";
  } else if (values?.description?.trim()?.length === 0) {
    errors.description = "Description cannot be empty or contain only spaces.";
  } else if (values?.description.trim().length < 3 || values?.description.trim().length > 255) {
    errors.description = "Description must be between 3 and 255 characters.";
  }
  // Image validation
  if (!values?.image) {
    errors.image = "Please upload an image";
  }

  // Validate Job name field
  if (!values?.job_name) {
    errors.job_name = "Job Name field is required.";
  } else if (values?.job_name?.trim()?.length === 0) {
    errors.job_name = "Job Name cannot be empty or contain only spaces.";
  } else if (values?.job_name.length < 2 || values?.job_name.length > 50) {
    errors.job_name = "Job Name must be between 3 and 50 characters.";
  }


  // Validate Experience field
  if (!values?.experience) {
    errors.experience = "Experience field is required.";
  } else if (values?.experience?.trim()?.length === 0) {
    errors.experience = "Experience cannot be empty or contain only spaces.";
  } else if (values?.experience.length < 3 || values?.experience.length > 25) {
    errors.experience = "Experience must be between 3 and 25 characters.";
  }

  // Validate Qualification field
  if (!values?.qualification) {
    errors.qualification = "Qualification field is required.";
  } else if (values?.qualification?.trim()?.length === 0) {
    errors.qualification = "Qualification cannot be empty or contain only spaces.";
  } else if (values?.qualification.length < 3 || values?.qualification.length > 25) {
    errors.qualification = "Qualification must be between 3 and 25 characters.";
  }

  // Validate Location field
  if (!values?.location || values.location.length === 0) {
    errors.location = "Location field is required.";
  } else if (values.location.some(loc => typeof loc !== 'string' || loc.trim().length === 0)) {
    errors.location = "Location cannot be empty or contain only spaces.";
  } else if (values.location.some(loc => loc.length < 2 || loc.length > 25)) {
    errors.location = "Location must be between 2 and 25 characters";
  }

  // Validate responsibilities field
  if (!values?.responsibilities || values.responsibilities.length === 0) {
    errors.responsibilities = "Responsibilities field is required.";
  } else if (values.responsibilities.some(res => typeof res !== 'string' || res.trim().length === 0)) {
    errors.responsibilities = "Responsibilities cannot be empty or contain only spaces.";
  } else if (values.responsibilities.some(res => res.length < 2 || res.length > 255)) {
    errors.responsibilities = "Responsibilities must be between 2 and 255 characters";
  }

  // No of openings validation
  if (!values?.no_of_openings) {
    errors.no_of_openings = "Number of openings field is required.";
  } else if (!/^\d+$/.test(values.no_of_openings)) {
    errors.no_of_openings = "Number of openings must be number.";
  } else if (parseInt(values.no_of_openings, 10) < 1) {
    errors.no_of_openings = "Number of openings must be 1 or greater";
  }

  // Validate skill field
  if (!values?.skill || values.skill.length === 0) {
    errors.skill = "Skill field is required.";
  } else if (values.skill.some(sk => typeof sk !== 'string' || sk.trim().length === 0)) {
    errors.skill = "Skill cannot be empty or contain only spaces.";
  } else if (values.skill.some(sk => sk.length < 3 || sk.length > 255)) {
    errors.skill = "Each skill must be between 3 and 255 characters.";
  }


  // Validate facebook_link field
  if (values?.facebook_link) {
    const appStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!appStoreUrlPattern.test(values.facebook_link)) {
      errors.facebook_link = "Invalid facebook link";
    }
  }

  // Validate twitter_link field

  if (values?.twitter_link) {
    const appStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!appStoreUrlPattern.test(values.twitter_link)) {
      errors.twitter_link = "Invalid twitter link";
    }
  }
  // linkedin_link 
  if (values?.linkedin_link) {
    const appStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!appStoreUrlPattern.test(values.linkedin_link)) {
      errors.linkedin_link = "Invalid linkedin link";
    }
  }


  // Validate Question field
  if (!values?.question) {
    errors.question = "Question field is required.";
  } else if (values?.question?.trim()?.length === 0) {
    errors.question = "Question cannot be empty or contain only spaces.";
  } else if (values?.question.length < 3 || values?.question.length > 255) {
    errors.question = "Question must be between 3 and 255 characters.";
  }


  // Validate Answer field
  if (!values?.answer) {
    errors.answer = "Answer field is required.";
  } else if (values?.answer?.trim()?.length === 0) {
    errors.answer = "Answer cannot be empty or contain only spaces.";
  } else if (values?.answer.length < 3 || values?.answer.length > 255) {
    errors.answer = "Answer must be between 3 and 255 characters.";
  }

  // Validate type field
  if (!values?.type || values.type.length === 0) {
    errors.type = "Type field is required.";
  } else if (values.type.some(sk => typeof sk !== 'string' || sk.trim().length === 0)) {
    errors.type = "Type cannot be empty or contain only spaces.";
  } else if (values.type.some(sk => sk.length < 3 || sk.length > 25)) {
    errors.type = "Each Type must be between 3 and 25 characters.";
  }


  // Validate Content field
  if (!values?.content) {
    errors.content = "content field is required.";
  } else if (values?.content?.trim()?.length === 0) {
    errors.content = "content cannot be empty or contain only spaces.";
  } else if (values?.content.length < 3 || values?.content.length > 255) {
    errors.content = "content must be between 3 and 255 characters.";
  }

  // Validate Main Content field
  if (!values?.main_content) {
    errors.main_content = "Main Content field is required.";
  } else if (values?.main_content?.trim()?.length === 0) {
    errors.main_content = "Main Content cannot be empty or contain only spaces.";
  }


  // Views validation
  if (!values?.views) {
    errors.views = "Views field is required.";
  } else if (!/^\d+$/.test(values.views)) {
    errors.views = "Views must be a valid number.";
  } else if (parseInt(values.views, 10) < 1) {
    errors.views = "Views must be at least 1.";
  }

  // likes validation
  if (!values?.likes) {
    errors.likes = "Likes field is required.";
  } else if (!/^\d+$/.test(values.likes)) {
    errors.likes = "Likes must be a valid number.";
  } else if (parseInt(values.likes, 10) < 1) {
    errors.likes = "Likes must be at least 1.";
  }


  // blog_read_time validation
  if (!values?.blog_read_time) {
    errors.blog_read_time = "blog_read_time field is required.";
  } else if (!/^\d+$/.test(values.blog_read_time)) {
    errors.blog_read_time = "blog_read_time must be a valid number.";
  } else if (parseInt(values.blog_read_time, 10) < 1) {
    errors.blog_read_time = "blog_read_time must be at least 1.";
  }

  // Date validation
  if (!values?.date) {
    errors.date = "Date field is required.";
  }

  if (values?.rating) {
    if (!/^\d+$/.test(values.rating)) {
      errors.rating = "Rating must be a number.";
    } else if (parseInt(values.rating, 5) < 1) {
      errors.rating = "Rating must be between 1 and 5";
    }
  }

  return errors;
};

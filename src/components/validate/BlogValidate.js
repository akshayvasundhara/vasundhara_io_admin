export const BlogValidates = (values) => {
    let errors = {};

    const playStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;

    // Validate title field
    if (!values?.title?.trim()) {
        errors.title = "Title is required";
    } else if (values?.title.length < 3 || values?.title.length > 100) {
        errors.title = "Title must be between 3 and 100 characters";
    }

    // Validate sub title field
    if (!values?.sub_title?.trim()) {
        errors.sub_title = "Sub title is required";
    } else if (values?.sub_title.length < 3 || values?.sub_title.length > 500) {
        errors.sub_title = "Sub title must be between 3 and 500 characters";
    }

    // Validate Description field
    if (values?.desc && values.desc.trim()) {
        if (values.desc.length < 3 || values.desc.length > 1000) {
            errors.desc = "Description must be between 3 and 1000 characters.";
        }
    }

    // Validate tags field
    if (values?.tags && values.tags.length > 0) {
        values.tags.forEach((tag, index) => {
            // Check if the tag is not a string or is empty after trimming
            if (typeof tag !== 'string' || tag.trim().length === 0) {
                errors[`tags[${index}]`] = "Tags cannot be empty or contain only spaces.";
            } else if (tag.length < 3 || tag.length > 25) {
                errors[`tags[${index}]`] = "Tags must be between 3 and 25 characters.";
            }
        });
    }

    // Image validation
    if (!values?.image) {
        errors.image = "Please upload an image";
    }


    // Validate Play store link field
    if (values?.play_store_link) {
        const playStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
        if (!playStoreUrlPattern.test(values.play_store_link)) {
            errors.play_store_link = "Invalid play store link";
        }
    }


    // Validate App store link field
    if (values?.app_store_link) {
        const appStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
        if (!appStoreUrlPattern.test(values.app_store_link)) {
            errors.app_store_link = "Invalid app store link";
        }
    }


    // Validate FAQs field
    if (values?.faqs && values.faqs.length > 0) {
        values.faqs.forEach((ind, index) => {
            errors.faqs = errors.faqs || [];

            // Validate Question
            if (!ind.question || ind.question.trim().length === 0) {
                // Only add error if answer is provided
                if (ind.answer && ind.answer.trim().length > 0) {
                    errors.faqs[index] = errors.faqs[index] || {}; // Initialize errors for this index
                    errors.faqs[index].question = "FAQ question is required.";
                }
            } else if (ind.question.length < 3 || ind.question.length > 255) {
                errors.faqs[index] = errors.faqs[index] || {}; // Ensure error object for this index exists
                errors.faqs[index].question = "FAQ question must be between 3 and 255 characters.";
            }

            // Validate Answer
            if (!ind.answer || ind.answer.trim().length === 0) {
                // Only add error if question is provided
                if (ind.question && ind.question.trim().length > 0) {
                    errors.faqs[index] = errors.faqs[index] || {}; // Ensure error object for this index exists
                    errors.faqs[index].answer = "FAQ answer is required.";
                }
            } else if (ind.answer.length < 3 || ind.answer.length > 500) {
                errors.faqs[index] = errors.faqs[index] || {}; // Ensure error object for this index exists
                errors.faqs[index].answer = "FAQ answer must be between 3 and 500 characters.";
            }
        });
    }

    // solution main title
    if (!values?.solution_main_title?.trim()) {
        errors.solution_main_title = "Solution main title is required";
    }
    else if (values?.solution_main_title.length < 3 || values?.solution_main_title.length > 255) {
        errors.solution_main_title = "Solution main title must be between 3 and 255 characters";
    }

    // validate solution field
    if (values?.solution && values.solution.length > 0) {
        values.solution.forEach((ind, index) => {
            errors.solution = errors.solution || [];
            errors.solution[index] = errors.solution[index] || {};

            if (!ind.title || ind.title.trim().length === 0) {
                errors.solution[index].title = "Solution title is required.";
            } else if (ind.title.length < 3 || ind.title.length > 100) {
                errors.solution[index].title = "Solution title must be between 3 and 100 characters.";
            }

            if (!ind.desc || ind.desc.trim().length === 0) {
                errors.solution[index].desc = "Solution description is required.";
            } else if (ind.desc.length < 3 || ind.desc.length > 255) {
                errors.solution[index].desc = "Solution description must be between 3 and 255 characters.";
            }
        });
        if (errors.solution.every((error) => Object.keys(error).length === 0)) {
            delete errors.solution;
        }
    } 

    // Validate features field
    if (values?.features && values.features.length > 0) {
        values.features.forEach((ind, index) => {
            // Initialize errors.features as an array if it's not already initialized
            errors.features = errors.features || [];

            // Validate Title
            if (!ind.title || ind.title.trim().length === 0) {
                // Only add error if description or image is provided
                if ((ind.desc && ind.desc.trim().length > 0) || ind.image) {
                    errors.features[index] = errors.features[index] || {}; // Initialize errors for this index
                    errors.features[index].title = "Features title is required.";
                }
            } else if (ind.title.length < 3 || ind.title.length > 100) {
                errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                errors.features[index].title = "Features title must be between 3 and 100 characters.";
            }

            // Validate Description
            // if (!ind.desc || ind.desc.trim().length === 0) {
            //     // Only add error if title or image is provided
            //     if ((ind.title && ind.title.trim().length > 0) || ind.image) {
            //         errors.features[index] = errors.features[index] || {}; // Initialize errors for this index
            //         errors.features[index].desc = "Features description is required.";
            //     }
            // } else if (ind.desc.length < 3 || ind.desc.length > 50) {
            //     errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
            //     errors.features[index].desc = "Features description must be between 3 and 50 characters.";
            // }
            // Validate Description - remove 'description is required' error
            if (ind.desc && ind.desc.trim().length > 0) {
                // Validate description length only if it exists
                if (ind.desc.length < 3 || ind.desc.length > 50) {
                    errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                    errors.features[index].desc = "Features description must be between 3 and 50 characters.";
                }
            }

            // Validate Image
            if (!ind.image) {
                // Only add error if title or description is provided
                if ((ind.title && ind.title.trim().length > 0) || (ind.desc && ind.desc.trim().length > 0)) {
                    errors.features[index] = errors.features[index] || {}; // Initialize errors for this index
                    errors.features[index].image = "Features image is required.";
                }
            } else {
                // Clear image error if valid
                if (errors.features[index]) delete errors.features[index].image;
            }
        });
    }

    // Validate industry field
    if (values?.industry && values.industry.length > 0) {
        values.industry.forEach((ind, index) => {
            // Initialize errors.industry as an array if it's not already initialized
            errors.industry = errors.industry || [];

            // Validate title
            if (!ind.title || ind.title.trim().length === 0) {
                // Only add error if description or image is provided
                if ((ind.desc && ind.desc.trim().length > 0) || ind.image) {
                    errors.industry[index] = errors.industry[index] || {}; // Initialize errors for this index
                    errors.industry[index].title = "Industry title is required.";
                }
            } else if (ind.title.length < 3 || ind.title.length > 50) {
                errors.industry[index] = errors.industry[index] || {}; // Ensure error object for this index exists
                errors.industry[index].title = "Industry title must be between 3 and 50 characters.";
            }

            // Validate description
            if (!ind.desc || ind.desc.trim().length === 0) {
                // Only add error if title or image is provided
                if ((ind.title && ind.title.trim().length > 0) || ind.image) {
                    errors.industry[index] = errors.industry[index] || {}; // Initialize errors for this index
                    errors.industry[index].desc = "Industry description is required.";
                }
            } else if (ind.desc.length < 3 || ind.desc.length > 500) {
                errors.industry[index] = errors.industry[index] || {}; // Ensure error object for this index exists
                errors.industry[index].desc = "Industry description must be between 3 and 500 characters.";
            }

            // Validate image
            if (!ind.image) {
                // Only add error if title or description is provided
                if ((ind.title && ind.title.trim().length > 0) || (ind.desc && ind.desc.trim().length > 0)) {
                    errors.industry[index] = errors.industry[index] || {}; // Initialize errors for this index
                    errors.industry[index].image = "Industry image is required.";
                }
            } else {
                // Clear image error if valid
                if (errors.industry[index]) delete errors.industry[index].image;
            }
        });
    }


    // Validate content field
    if (values?.content && values.content.length > 0) {
        values.content.forEach((ind, index) => {
            // Initialize errors.content as an array if it's not already initialized
            errors.content = errors.content || [];

            // Validate title
            if (!ind.title || ind.title.trim().length === 0) {
                // Only add error if description, image, or redirect_link is provided
                if ((ind.desc && ind.desc.trim().length > 0) || ind.image) {
                    errors.content[index] = errors.content[index] || {}; // Initialize errors for this index
                    errors.content[index].title = "Content title is required.";
                }
            } else if (ind.title.length < 3 || ind.title.length > 100) {
                errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
                errors.content[index].title = "Content title must be between 3 and 100 characters.";
            }

            // Validate description
            if (!ind.desc || ind.desc.trim().length === 0) {
                // Only add error if title, image, or redirect_link is provided
                if ((ind.title && ind.title.trim().length > 0) || ind.image) {
                    errors.content[index] = errors.content[index] || {}; // Initialize errors for this index
                    errors.content[index].desc = "Content description is required.";
                }
            } else if (ind.desc.length < 3 || ind.desc.length > 1000) {
                errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
                errors.content[index].desc = "Content description must be between 3 and 1000 characters.";
            }

            // Validate image
            if (!ind.image) {
                // Only add error if title, description, or redirect_link is provided
                if ((ind.title && ind.title.trim().length > 0) || (ind.desc && ind.desc.trim().length > 0) || (ind.redirect_link && ind.redirect_link.trim())) {
                    errors.content[index] = errors.content[index] || {}; // Initialize errors for this index
                    errors.content[index].image = "Content image is required.";
                }
            } else {
                // Clear image error if valid
                if (errors.content[index]) delete errors.content[index].image;
            }

            // Validate redirect link
            // if (!ind.redirect_link || !ind.redirect_link.trim()) {
            //     // Only add error if title, description, or image is provided
            //     if ((ind.title && ind.title.trim().length > 0) || (ind.desc && ind.desc.trim().length > 0) || ind.image) {
            //         errors.content[index] = errors.content[index] || {}; // Initialize errors for this index
            //         errors.content[index].redirect_link = "Redirect Link is required.";
            //     }
            // } else {
            //     const playStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
            //     if (!playStoreUrlPattern.test(ind.redirect_link)) {
            //         errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
            //         errors.content[index].redirect_link = "Invalid redirect link.";
            //     }
            // }
        });
    }

    // validate client field
  if (!values?.client?.name || values?.client?.name.trim().length === 0) {
        errors.client = errors.client || {};  // Initialize errors.client object if not already
        errors.client.name = "Client name is required.";
    } else if (values.client.name.length < 3 || values.client.name.length > 50) {
        errors.client.name = "Client name must be between 3 and 50 characters.";
    }

    // Validate Client Designation
    if (!values?.client?.designation || values?.client?.designation.trim().length === 0) {
        errors.client = errors.client || {};  // Initialize errors.client object if not already
        errors.client.designation = "Client designation is required.";
    } else if (values.client.designation.length < 3 || values.client.designation.length > 50) {
        errors.client.designation = "Client designation must be between 3 and 50 characters.";
    }

    // Validate Client Feedback
    if (!values?.client?.feedback || values?.client?.feedback.trim().length === 0) {
        errors.client = errors.client || {};  // Initialize errors.client object if not already
        errors.client.feedback = "Client feedback is required.";
    } else if (values.client.feedback.length < 3 || values.client.feedback.length > 500) {
        errors.client.feedback = "Client feedback must be between 3 and 500 characters.";
    }

    // Validate Image
    if (!values?.client?.image) {
        errors.client = errors.client || {};  // Initialize errors.client object if not already
        errors.client.image = "Client image is required.";
    }

    // Remove empty client errors
    if (Object.keys(errors.client || {}).length === 0) {
        delete errors.client;
    }
    

// Validate detail field
if (values?.detail && values.detail.length > 0) {
    values.detail.forEach((ind, index) => {
        errors.detail = errors.detail || [];
        errors.detail[index] = errors.detail[index] || {};

        if (typeof ind !== 'object' || Array.isArray(ind)) {
            errors.detail[index].details = "Detail must be an object.";
        } else {
            Object.entries(ind).forEach(([key, value]) => {
                if (typeof key !== 'string') {
                    errors.detail[index].key = `The key '${key}' must be a string.`;
                }
                if (typeof value !== 'string') {
                    errors.detail[index][key] = `The value of '${key}' must be a string.`;
                }
            });
        }
    });
    if (errors.detail.every((error) => Object.keys(error).length === 0)) {
        delete errors.detail;
    }
}

    return errors;
};
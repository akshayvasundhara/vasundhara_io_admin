export const BlogValidates = (values) => {
    let errors = {};

    // Validate title field
    if (!values?.title?.trim()) {
        errors.title = "Title is required";
    } else if (values?.title.length < 3 || values?.title.length > 50) {
        errors.title = "Title must be between 3 and 50 characters.";
    }

    // Validate sub title field
    if (!values?.sub_title?.trim()) {
        errors.sub_title = "Sub title is required";
    } else if (values?.sub_title.length < 3 || values?.sub_title.length > 150) {
        errors.sub_title = "Sub title must be between 3 and 150 characters";
    }

    // Validate Description field
    if (!values?.desc?.trim()) {
        errors.desc = "Description is required.";
    } else if (values?.desc.length < 3 || values?.desc.length > 500) {
        errors.desc = "Description must be between 3 and 500 characters";
    }

    // Validate tags field
    if (!values?.tags || values.tags.length === 0) {
        errors.tags = "Tag is required.";
    } else if (values.tags.some(sk => typeof sk !== 'string' || sk.trim().length === 0)) {
        errors.tags = "Tags cannot be empty or contain only spaces.";
    } else if (values.tags.some(sk => sk.length < 3 || sk.length > 25)) {
        errors.tags = "Tags must be between 3 and 25 characters.";
    }
    // Image validation
    if (!values?.image) {
        errors.image = "Please upload an image";
    }


    // Validate Play store link field
    if (!values?.play_store_link?.trim()) {
        errors.play_store_link = "Play Store Link is required.";
    } else {
        const playStoreUrlPattern = /^https:\/\/play\.google\.com\/store\/apps(\/details\?id=[a-zA-Z0-9_.]+)?/;
        if (!playStoreUrlPattern.test(values.play_store_link)) {
            errors.play_store_link = "Invalid play store link";
        }
    }


    // Validate App store link field
    if (!values?.app_store_link?.trim()) {
        errors.app_store_link = "App Store Link is required.";
    } else {
        const appStoreUrlPattern = /^https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[a-zA-Z0-9_.-]+\/id\d+/;
        if (!appStoreUrlPattern.test(values.app_store_link)) {
            errors.app_store_link = "Invalid app store link";
        }
    }


    // Validate Author field
    if (!values?.author?.trim()) {
        errors.author = "Author is required";
    }

    // Validate FAQs field
    if (!values?.faqs || values.faqs.length === 0) {
        errors.faqs = "FAQ is required.";
    } else {
        values.faqs.forEach((ind, index) => {
            // Initialize errors.features as an array if it's not already initialized
            errors.faqs = errors.faqs || [];

            // Validate Question
            if (!ind.question || ind.question.trim().length === 0) {
                errors.faqs[index] = errors.faqs[index] || {}; // Initialize errors for this index
                errors.faqs[index].question = "FAQ question is required ";
            } else if (ind.question.length < 3 || ind.question.length > 255) {
                errors.faqs[index] = errors.faqs[index] || {}; // Ensure error object for this index exists
                errors.faqs[index].question = "FAQ question must be between 3 and 255 characters.";
            }

            // Validate description
            if (!ind.answer || ind.answer.trim().length === 0) {
                errors.faqs[index] = errors.faqs[index] || {}; // Ensure error object for this index exists
                errors.faqs[index].answer = "FAQ answer is required.";
            } else if (ind.answer.length < 3 || ind.answer.length > 500) {
                errors.faqs[index] = errors.faqs[index] || {}; // Ensure error object for this index exists
                errors.faqs[index].answer = "FAQ answer must be between 3 and 500 characters.";
            }


        });
    }

    // Validate features field

    if (!values?.features || values.features.length === 0) {
        errors.features = "Features is required.";
    } else {
        values.features.forEach((ind, index) => {
            // Initialize errors.features as an array if it's not already initialized
            errors.features = errors.features || [];

            // Validate title
            if (!ind.title || ind.title.trim().length === 0) {
                errors.features[index] = errors.features[index] || {}; // Initialize errors for this index
                errors.features[index].title = "Features title is required ";
            } else if (ind.title.length < 3 || ind.title.length > 25) {
                errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                errors.features[index].title = "Features title must be between 3 and 25 characters.";
            }

            // Validate description
            if (!ind.desc || ind.desc.trim().length === 0) {
                errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                errors.features[index].desc = "Features description is required.";
            } else if (ind.desc.length < 3 || ind.desc.length > 50) {
                errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                errors.features[index].desc = "Features description must be between 3 and 50 characters.";
            }

            //validate image
            if (!ind.image) {
                errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                errors.features[index].image = "Features image is required.";
            } else {
                // Clear image error if valid
                if (errors.features[index]) delete errors.features[index].image;
            }
        });
    }


    // Validate industry field
    if (!values?.industry || values.industry.length === 0) {
        errors.industry = "Industry is required.";
    } else {
        values.industry.forEach((ind, index) => {
            // Initialize errors.industry as an array if it's not already initialized
            errors.industry = errors.industry || [];

            // Validate title
            if (!ind.title || ind.title.trim().length === 0) {
                errors.industry[index] = errors.industry[index] || {}; // Initialize errors for this index
                errors.industry[index].title = "Industry title is required.";
            } else if (ind.title.length < 3 || ind.title.length > 25) {
                errors.industry[index] = errors.industry[index] || {}; // Ensure error object for this index exists
                errors.industry[index].title = "Industry title must be between 3 and 25 characters.";
            }

            // Validate description
            if (!ind.desc || ind.desc.trim().length === 0) {
                errors.industry[index] = errors.industry[index] || {}; // Ensure error object for this index exists
                errors.industry[index].desc = "Industry description is required.";
            } else if (ind.desc.length < 3 || ind.desc.length > 50) {
                errors.industry[index] = errors.industry[index] || {}; // Ensure error object for this index exists
                errors.industry[index].desc = "Industry description must be between 3 and 50 characters.";
            }

            // Validate image
            if (!ind.image) {
                errors.industry[index] = errors.industry[index] || {}; // Ensure error object for this index exists
                errors.industry[index].image = "Industry image is required.";
            } else {
                // Clear image error if valid
                if (errors.industry[index]) delete errors.industry[index].image;
            }
        });
    }


    // Validate content  field
    if (!values?.content || values.content.length === 0) {
        errors.content = "Content is required.";
    } else {
        values.content.forEach((ind, index) => {
            // Initialize errors.industry as an array if it's not already initialized
            errors.content = errors.content || [];
            console.log("errors", errors);

            // Validate title
            if (!ind.title || ind.title.trim().length === 0) {
                errors.content[index] = errors.content[index] || {}; // Initialize errors for this index
                errors.content[index].title = "Content title is required.";
            } else if (ind.title.length < 3 || ind.title.length > 25) {
                errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
                errors.content[index].title = "Content title must be between 3 and 25 characters.";
            }

            // Validate description
            if (!ind.desc || ind.desc.trim().length === 0) {
                errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
                errors.content[index].desc = "content description is required.";
            } else if (ind.desc.length < 3 || ind.desc.length > 50) {
                errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
                errors.content[index].desc = "Content description must be between 3 and 50 characters.";
            }

            // Validate image
            if (!ind.image) {
                errors.content[index] = errors.content[index] || {}; // Ensure error object for this index exists
                errors.content[index].image = "Content image is required.";
            } else {
                // Clear image error if valid
                if (errors.content[index]) delete errors.content[index].image;
            }

            // Validate redirect link
            if (!ind.redirect_link || !ind.redirect_link.trim()) {
                errors.content[index].redirect_link = "Redirect Link is required.";
            }
            // else {
            //     const playStoreUrlPattern = /^https:\/\/play\.google\.com\/store\/apps(\/details\?id=[a-zA-Z0-9_.]+)?/;
            //     if (!playStoreUrlPattern.test(ind.redirect_link)) {
            //         errors.content[index].redirect_link = "Invalid redirect link.";
            //     }
            //     // else {
            //     //     // Clear redirect link error if valid
            //     //     delete errors.content[index].redirect_link;
            //     // }
            // }
        });
    }

    return errors;
};

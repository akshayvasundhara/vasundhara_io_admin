export const PortFolioValidate = (values) => {
    let errors = {};

    // Validate title field
    if (!values?.title?.trim()) {
        errors.title = "Title is required";
    } else if (values?.title.length < 3 || values?.title.length > 100) {
        errors.title = "Title must be between 3 and 100 characters.";
    }

    // Validate Description field
    if (values?.desc && values.desc.trim()) {
        if (values.desc.length < 3 || values.desc.length > 1000) {
            errors.desc = "Description must be between 3 and 1000 characters.";
        }
    }

    // Image validation
    if (!values?.image) {
        errors.image = "Please upload an image";
    }

    // Icon validation
    if (!values?.icon) {
        errors.icon = "Please upload an icon";
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


    // Validate features field
    if (values?.features && values.features.length > 0) {
        values.features.forEach((ind, index) => {
            // Initialize errors.features as an array if it's not already initialized
            errors.features = errors.features || [];

            // Validate Title
            if (!ind.title || ind.title.trim().length === 0) {
                // Only add error if description or image is provided
                if (ind.image) {
                    errors.features[index] = errors.features[index] || {}; // Initialize errors for this index
                    errors.features[index].title = "Features title is required.";
                }
            } else if (ind.title.length < 3 || ind.title.length > 50) {
                errors.features[index] = errors.features[index] || {}; // Ensure error object for this index exists
                errors.features[index].title = "Features title must be between 3 and 50 characters.";
            }



            // Validate Image
            if (!ind.image) {
                // Only add error if title or description is provided
                if ((ind.title && ind.title.trim().length > 0)) {
                    errors.features[index] = errors.features[index] || {}; // Initialize errors for this index
                    errors.features[index].image = "Features image is required.";
                }
            } else {
                // Clear image error if valid
                if (errors.features[index]) delete errors.features[index].image;
            }
        });
    }


    // Rating validation
    if (values?.rating) {
        if (!/^\d+$/.test(values.rating)) {
            errors.rating = "Rating must be a number.";
        } else if (parseInt(values.rating, 5) < 1) {
            errors.rating = "Rating must be between 1 and 5";
        }
    }

    if (values?.downloads && values.downloads.trim()) {
        if (values.downloads.length < 3 || values.downloads.length > 10) {
            errors.downloads = "Downloads must be between 2 and 10 characters.";
        }
    }
    if (values?.reviews && values.reviews.trim()) {
        if (values.reviews.length < 3 || values.reviews.length > 10) {
            errors.reviews = "Reviews must be between 2 and 10 characters.";
        }
    }




    return errors;
};

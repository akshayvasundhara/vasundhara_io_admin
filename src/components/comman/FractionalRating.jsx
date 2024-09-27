import React, { useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importing star icons

const FractionalRating = () => {
    const [rating, setRating] = useState(0);

    return (
        <div className='rating'>
            <Rating
                fractions={2} // Allows for half ratings
                initialRating={rating}
                onClick={(value) => setRating(value)}
                emptySymbol={<FaRegStar size={30} />} // Empty star icon
                fullSymbol={<FaStar size={30} />} // Full star icon
                placeholderSymbol={<FaStar size={30} style={{ opacity: 0.5 }} />} // Half star icon
            />
            {/* <p>Your Rating: {rating}</p> */}
        </div>
    );
};

export default FractionalRating;

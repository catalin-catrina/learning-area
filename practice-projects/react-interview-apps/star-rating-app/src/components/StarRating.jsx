import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ nrOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleMouseClick = index => {
    setRating(index);
  };

  const handleMouseEnter = index => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div>
      {Array.from({ length: nrOfStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <FaStar
            key={starIndex}
            className={starIndex <= (hover || rating) ? 'active' : 'inactive'}
            onClick={() => handleMouseClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={() => handleMouseLeave()}
            size="40"
          />
        );
      })}
    </div>
  );
}

export default StarRating;

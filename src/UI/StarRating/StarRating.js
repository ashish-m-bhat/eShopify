import React from 'react'
import {FaStar} from 'react-icons/fa';

export default function StarRating(props) {
  return (
    <div>
        {[...Array(5)].map((eachStar, index) => {
            index += 1;
            const starsToBeHighlighted = Math.round(props.rating);

            return (
            <>
                <FaStar size={props.size} color={index <= starsToBeHighlighted?"gold": "silver"} />
                {" "}
            </>
            );
        })
        }
  </div>
  );
}

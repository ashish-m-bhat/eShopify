import React from 'react'
import {FaStar} from 'react-icons/fa';

type Props = {
  rating: number,
  size: number
}

export default function StarRating(props: Props) {
  return (
    <div>
        {[...Array(5)].map((eachStar, index) => {
            index += 1;
            const starsToBeHighlighted = Math.round(props.rating);

            return (
            <React.Fragment key={Math.random()*1000}>
                <FaStar size={props.size} color={index <= starsToBeHighlighted?"gold": "silver"} />
                {" "}
            </React.Fragment>
            );
        })
        }
  </div>
  );
}

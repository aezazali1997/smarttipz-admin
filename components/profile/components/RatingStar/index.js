import React from 'react'
import ReactStars from 'react-rating-stars-component'
import {decimalSplitter} from '../../../../utils/rating'

const RatingComponent = ({ value, edit, isHalf, onChange, size, classNames }) => {
    value=decimalSplitter(value);
    return (
        <ReactStars
            count={5}
            value={value}
            size={size || 16}
            edit={false}
            isHalf={isHalf}
            onChange={(value) => onChange(value)}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#f8b93b"
            classNames={classNames}

        />
    )
}

export default RatingComponent

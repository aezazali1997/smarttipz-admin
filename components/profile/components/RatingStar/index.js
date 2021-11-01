import React from 'react'
import ReactStars from 'react-rating-stars-component'

const Rating = ({ value }) => {
    return (
        <ReactStars
            count={5}
            value={value}
            size={16}
            edit={false}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#714de1"
        />
    )
}

export default Rating

import React from 'react'

const Badge = ({ color, childrens }) => {
    return (
        <span className={`inline-flex items-center justify-center px-2 py-1 text-xs rounded-full font-bold leading-none text-black transform translate-x-1/2-translate-y-1/2 ${color}`}>
            {childrens}
        </span>
    )
}

export default Badge;

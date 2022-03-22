/* eslint-disable @next/next/no-img-element */
import { Button } from 'components';
import React from 'react'

const Card = ({ video, title, description, onClick, picture }) => {
    return (
        <div className="max-w-sm h-auto rounded-lg overflow-hidden border card shadow-md">
            <div className="w-full">
                {video}
            </div>
            <div className="flex items-center w-full space-x-3 p-3 pb-2">
                <img className="inline object-cover w-14 h-12 rounded-full"
                    src={picture || "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"}
                    alt="Profile image" />
                <div className="flex flex-col w-full ">
                    <h1 className="text-md text-sm sm:text-md text-bold font-sans">{title}</h1>
                   
                    <h1 className="text-sm text-gray-600 font-sans break-all">{description}</h1>
                </div>
            </div>
            <div className="flex w-full justify-end p-2">
                <Button
                    onSubmit={onClick}
                    type="button"
                    childrens={'Remove'}
                    classNames={"px-3 py-2 w-28 flex justify-center items-center text-white text-sm danger-btn rounded-md"}
                />
            </div>
        </div>
    )
}

export default Card;

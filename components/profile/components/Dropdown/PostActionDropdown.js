/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { useOutsideClick } from 'hooks';

const PostActionDropdown = ({ _HandleCatalogue, _HandleDeleteVideo, catalogue, ownerId, isPost }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const [ID, setID] = React.useState(null);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    useOutsideClick(popoverDropdownRef, () => {
        setDropdownPopoverShow(false);
    })

    useEffect(() => {
        if (localStorage.getItem('userId') !== null) {
            setID(localStorage.getItem('userId'))
        }
    }, [])

    return (
        <>
            <a
                className="text-blueGray-500 block cursor-default"
                href="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                        {/* <svg className="w-7 h-7 text-gray-400 hover:text-purple-600 cursor-pointer rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg> */}
                    </span>
                </div>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-10 float-left  list-none text-left rounded shadow-lg min-w-48"
                }
            >
                {

                    <>
                        {
                            ID && parseInt(ID) == ownerId &&
                            <>
                                <div
                                    className={
                                        "text-sm py-2 px-4 font-normal block w-full cursor-pointer rounded whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-200"
                                    }
                                    onClick={_HandleCatalogue}
                                >
                                    {catalogue ? 'Remove from Catalogue' : 'Add to Catalogue'}
                                </div>
                                {
                                    isPost &&
                                    <div
                                        className={
                                            "text-sm py-2 px-4 font-normal block w-full rounded cursor-pointer whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-200"
                                        }
                                        onClick={_HandleDeleteVideo}
                                    >
                                        Delete Video
                                    </div>
                                }
                            </>
                        }
                        {/* {
                            ID && parseInt(ID) !== ownerId &&
                            <>
                                <div
                                    className={
                                        "text-sm py-2 px-4 font-normal block w-full rounded cursor-pointer whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-200"
                                    }
                                    onClick={ToggleRatingModal}
                                >
                                    Rate Video
                                </div>
                                <div
                                    className={
                                        "text-sm py-2 px-4 font-normal block w-full rounded cursor-pointer whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-200"
                                    }
                                    onClick={ToggleTipModal}
                                >
                                    Give a Tip
                                </div>
                            </>
                        } */}
                    </>
                }
            </div>
        </>
    );
};

export default PostActionDropdown;

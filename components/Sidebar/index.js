/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from 'react'
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt, faComment, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
// import Badge from 'components/Badge';

const Sidebar = ({ logout }) => {

    const router = useRouter();
    const { asPath } = router;
    const [dropdown, setShowDropdown] = useState(false);

    // useEffect(() => {
    //     asPath === '/privacy-policy' || asPath === '/terms-and-conditions' || asPath === '/copyrights'
    //         || asPath === '/trademark-license'
    //         ? setShowDropdown(true) : setShowDropdown(false);
    // }, [])

    let Active = (path) => {
        return asPath === path ?
            'bg-white text' : 'sidebar-item'
    }

    const toggleDropdown = () => {
        setShowDropdown(!dropdown);
    }

    let ActiveDropdown = (path) => {
        return asPath === path ? 'text-white background' : 'sidebar-dropdown-item';
    }

    return (
        <div className="sidebar">
            <nav
                className='flex flex-col w-full h-full py-5 px-5 text-white justify-between relative navbar'
                role='navigation'
            >
                <div className="py-5 flex items-center flex-col ">
                    <Link href='/dashboard/admin'><a>
                        <Image src={logo} alt="brand" /></a>
                    </Link>
                </div>
                <div className='lg:flex h-full flex-col space-y-2 overflow-y-auto'>
                    <>
                        <Link href='/dashboard/admin' className='p-4  font-sans nav-link nav-link-ltr'>
                            <div className={`flex flex-row items-center py-2 px-3 rounded-lg w-52 font-medium cursor-pointer
                            ${Active('/dashboard/admin')}`}>

                                <FontAwesomeIcon icon={faNewspaper} /> &nbsp;Admin
                            </div>
                        </Link>
                        <Link href='/dashboard/business-verification' className='p-4 font-sans nav-link nav-link-ltr'>
                            <div className={`py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                              ${Active('/dashboard/business-verification')}`}>
                                <FontAwesomeIcon icon={faUserCircle} />&nbsp;Business Verification
                            </div>
                        </Link>
                        <Link href='/dashboard/manage-users' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/manage-users")}`}>
                                <FontAwesomeIcon icon={faPlayCircle} />&nbsp;Manage Users
                            </div>
                        </Link>
                        <Link href='/dashboard/content-management' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/content-management")}`}>
                                <div>
                                    <FontAwesomeIcon icon={faComment} />&nbsp;Content Management
                                </div>
                                {/* <Badge /> */}
                            </div>
                        </Link>
                    </>
                </div>
                <div className="flex items-center">
                    <button onClick={() => logout()}
                        className={`flex flex-row py-2 px-3 rounded-lg w-52 font-medium text-white hover:bg-white hover:text-indigo-600 `} >
                        <div>
                            <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;Logout
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;

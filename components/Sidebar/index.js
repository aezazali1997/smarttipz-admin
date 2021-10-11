/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from 'react'
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt, faComment, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
// import Badge from 'components/Badge';

const Sidebar = ({ logout }) => {

    const router = useRouter();
    const { asPath } = router;
    const [dropdown, setShowDropdown] = useState(false);

    useEffect(() => { }, [localStorage.getItem('permissions')])

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

    let CheckPermissions = (name) => {
        let permissions = JSON.parse(localStorage.getItem('permissions'))
        if (permissions) {
            console.log('permissions: ', permissions);
            let result = permissions.filter(item => item.name === name && item.value === true);
            return isEmpty(result) ? 'hidden' : ''
        }
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
                            <a>
                                <div className={`flex flex-row items-center py-2 px-3 rounded-lg w-52 font-medium cursor-pointer
                            ${Active('/dashboard/admin')} ${CheckPermissions('admin')}`}>

                                    <FontAwesomeIcon icon={faNewspaper} /> &nbsp;Admin
                                </div>
                            </a>
                        </Link>
                        <Link href='/dashboard/business-verification' className='p-4 font-sans nav-link nav-link-ltr'>
                            <a>
                                <div className={`py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                              ${Active('/dashboard/business-verification')} ${CheckPermissions('businessVerification')}`}>
                                    <FontAwesomeIcon icon={faUserCircle} />&nbsp;Business Verification
                                </div>
                            </a>
                        </Link>
                        <Link href='/dashboard/manage-users' className='p-4 font-sans nav-link nav-link-ltr' >
                            <a>
                                <div className={`py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/manage-users")} ${CheckPermissions('manageUsers')}`}>
                                    <FontAwesomeIcon icon={faPlayCircle} />&nbsp;Manage Users
                                </div>
                            </a>
                        </Link>
                        <Link href='/dashboard/content-management' className='p-4 font-sans nav-link nav-link-ltr' >
                            <a>
                                <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/content-management")} ${CheckPermissions('contentManagement')}`}>
                                    <div>
                                        <FontAwesomeIcon icon={faComment} />&nbsp;Content Management
                                    </div>
                                    {/* <Badge /> */}
                                </div>
                            </a>
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

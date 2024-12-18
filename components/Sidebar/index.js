/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faUserCircle,
  faCog,
  faPlayCircle,
  faSignOutAlt,
  faComment,
  faClipboardList,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { Routes } from "routes";
import Logo from '../../public/logo.png'

// import Badge from 'components/Badge';

const Sidebar = ({ logout,toggle }) => {
  const router = useRouter();
  const { asPath } = router;
  const [dropdown, setShowDropdown] = useState(false);


  let Active = (path) => {
    return asPath === path ? "bg-white text" : "sidebar-item";
  }

  const toggleDropdown = () => {
    setShowDropdown(!dropdown);
  };

  let ActiveDropdown = (path) => {
    return asPath === path ? "text-white background" : "sidebar-dropdown-item";
  };

  let CheckPermissions = (name) => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    if (permissions) {
      let result = permissions.filter(
        (item) => item.name=== name && item.value === true
      );
      return isEmpty(result) ? "hidden" : "";
    }
  };

  return (
    <div className="sidebar">
      <nav
        className="relative flex flex-col justify-between w-full h-full px-5 py-5 text-white navbar"
        role="navigation"
      >
        <div className="relative flex flex-col items-center py-7">
          <Link href="/dashboard/admin">
            <a>
              <Image
                className="cursor-pointer"
                src={logo}
                objectFit="cover"
                height={10}
                width={10}
                alt="brand"
              />
            </a>
          </Link>
        </div>
        <div className="flex-col h-full pt-4 space-y-2 overflow-y-auto lg:flex">
          {Routes &&
            Routes.map(({ name, path, icon, permission }, index) => (
              <div key={index}>
              
                <Link
                  href={path}
                  className="p-4 font-sans nav-link nav-link-ltr"
                >
                  <div
                    className={`flex flex-row items-center py-2 px-3 rounded-lg w-52 font-medium
                                            sidebar-item cursor-pointer ${Active(
                                              path
                                            )} ${CheckPermissions(permission)}`}
                  >
                    {icon}&nbsp;{name}
                  </div>
                </Link>
              </div>
            ))}
          <Link
            href="/dashboard/setting"
            className="p-4 font-sans nav-link nav-link-ltr"
          >
            <a>
              <div
                className={`flex items-center justify-between py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/setting")}`}
              >
                <div>
                  <FontAwesomeIcon icon={faCog} />
                  &nbsp;Settings
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => logout()}
            className={`flex flex-row py-2 px-3 rounded-lg w-52 font-medium text-white hover:bg-white hover:text-indigo-600 `}
          >
            <div>
              <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;Logout
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

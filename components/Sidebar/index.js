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
// import Badge from 'components/Badge';

const Sidebar = ({ logout }) => {
  const router = useRouter();
  const { asPath } = router;
  const [dropdown, setShowDropdown] = useState(false);

  useEffect(() => {}, [localStorage.getItem("permissions")]);

  let Active = (path) => {
    return asPath === path || asPath.includes(path.split('/dashboard/')[1]) ? "bg-white text" : "sidebar-item";
  };

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
        (item) => item.name === name && item.value === true
      );
      return isEmpty(result) ? "hidden" : "";
    }
  };

  return (
    <div className="sidebar">
      <nav
        className="flex flex-col w-full h-full py-5 px-5 text-white justify-between relative navbar"
        role="navigation"
      >
        <div className="py-7 flex items-center flex-col relative">
          <Link href="/dashboard/admin">
            <a>
              <Image
                className="cursor-pointer"
                src="https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/logo.svg"
                objectFit="cover"
                alt="brand"
                layout="fill"
              />
            </a>
          </Link>
        </div>
        <div className="lg:flex h-full flex-col space-y-2 overflow-y-auto pt-4">
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

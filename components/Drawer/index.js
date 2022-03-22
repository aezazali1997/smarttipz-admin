/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { isEmpty } from "lodash";
import Sidebar from "react-sidebar";
import { useRouter } from "next/router";
import Hamburger from "hamburger-react";
import { Routes } from "routes";

// import Badge from 'components/Badge';

const Drawer = ({ isOpen, toggle, logout }) => {
  const router = useRouter();
  const { asPath } = router;
  const [dropdown, setShowDropdown] = useState(false);

  useEffect(() => {}, [localStorage.getItem("permissions")]);

  let Active = (path) => {
    return asPath === path ? "bg-white text" : "sidebar-item";
  };

  const toggleDropdown = () => {
    setShowDropdown(!dropdown);
  };

  let ActiveDropdown = (path) => {
    return asPath === path ? "text-white background" : "sidebar-dropdown-item";
  };

  let handleClose = () => {
    toggleDropdown();
    toggle();
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
    <Sidebar
      sidebar={
        <nav
          className="flex flex-col w-auto h-full py-5 px-5 text-white justify-between relative navbar"
          role="navigation"
        >
          <div className="py-7 flex items-center flex-col relative">
            <Link href="/dashboard/admin" passHref>
              <a>
                <Image
                  src="https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/logo.svg"
                  objectFit="cover"
                  alt="brand"
                  layout="fill"
                />
              </a>
            </Link>
          </div>
          <div className="lg:flex flex-col h-full space-y-2 overflow-y-auto pt-4">
            {Routes &&
              Routes.map(({ name, path, icon, permission }, index) => (
                <div key={index}>
                  <Link
                    href={path}
                    className="p-4 font-sans nav-link nav-link-ltr"
                  >
                    <div
                      onClick={toggle}
                      className={`flex flex-row items-center py-2 px-3 rounded-lg w-52
                                            font-medium sidebar-item cursor-pointer
                                            ${Active(path)} ${CheckPermissions(
                        permission
                      )}`}
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
              <div
                onClick={toggle}
                className={`flex justify-between items-center py-2 px-3 rounded-lg w-52 font-medium sidebar-item cursor-pointer
                                    ${Active("/dashboard/setting")}`}
              >
                <div>
                  <FontAwesomeIcon icon={faCog} />
                  &nbsp;Settings
                </div>
              </div>
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
      }
      open={isOpen}
      onSetOpen={toggle}
      styles={{
        sidebar: {
          background: "#714de1",
          height: "100vh",
          position: "fixed",
          zIndex: 60,
          overflow: "hidden",
        },
        root: {
          position: "unset",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        },
        content: {
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out",
        },
        overlay: {
          zIndex: 50,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          visibility: "hidden",
          transition: "opacity .3s ease-out, visibility .3s ease-out",
          backgroundColor: "rgba(0,0,0,.3)",
        },
      }}
    >
      <nav
        className="lg:hidden flex justify-between items-center h-16 text-black relative font-mono navbar"
        role="navigation"
      >
        <div className="px-3">
          <Hamburger
            toggled={isOpen}
            onToggle={toggle}
            color="#714de1"
            direction="right"
            duration={0.5}
            size={28}
          />
        </div>
        <h1 className="text-xl text-center font-bold font-sans">
          {asPath === "/dashboard/setting"
            ? "Settings"
            : asPath === "/dashboard/admin"
            ? "Admin"
            : asPath === "/dashboard/business-verification"
            ? "Business Verification"
            : asPath === "/dashboard/manage-users"
            ? "Manage Users"
            : "Content Management"}
        </h1>
        <span className="relative px-6 inline-block cursor-pointer">
         
        </span>
      </nav>
    </Sidebar>
  );
};

export default Drawer;

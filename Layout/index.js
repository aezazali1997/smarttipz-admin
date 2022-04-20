import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { Sidebar, Drawer } from '../components';
import Swal from 'sweetalert2';

const CustomLayout = ({ children }) => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const hideMenu = () => {
        if (window.innerWidth > 991 && isOpen) {
          setIsOpen(false);
        }
      };

      window.addEventListener("resize", hideMenu);

      return () => {
        window.removeEventListener("resize", hideMenu);
      };
    });

    const toggle = () => {
      setIsOpen(!isOpen);
    };

    const _Logout = () => {
       Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        cookie.remove("name");
      cookie.remove("token");
      cookie.remove("username");
      localStorage.clear();
      router.push("/auth/login");
      },
      cancelButtonText: 'No',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
      }
    });
     
    };

    return (
      <div className={`flex flex-col lg:flex-row w-full h-screen`}>
        <Sidebar logout={_Logout} />
        <Drawer logout={_Logout} toggle={toggle} isOpen={isOpen} />
        <main className="Content">{children}</main>
      </div>
    );
}


export default CustomLayout;

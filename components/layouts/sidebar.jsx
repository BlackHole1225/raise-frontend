'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { SERVER_IP } from '../../utils/constants';

function GetClientSideStorage(key) {
  let value = '';
  useEffect(() => {
    value = localStorage.getItem(key);
  }, [key]);
  return value;
}

function ClearClientSideStorage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
}

const Sidebar = ({ navItems }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        const response = await fetch(`${SERVER_IP}/api/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: GetClientSideStorage('userEmail')
          })
        });

        if (response.ok) {
          window.location.href = '/login';
          ClearClientSideStorage();
        } else {
          console.error('Failed to logout');
        }
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside>
      <div
        className={`fixed top-1/2 left-2 transform -translate-y-1/2 z-50 lg:hidden`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <MdOutlineKeyboardDoubleArrowLeft className="w-8 h-8 text-brand-dark cursor-pointer" />
        ) : (
          <MdOutlineKeyboardDoubleArrowRight className="w-8 h-8 text-brand-dark cursor-pointer" />
        )}
      </div>

      <div
        className={`fixed top-0 left-0 lg:static bg-brand-lemon-yellow lg:translate-x-0 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-[250px] lg:w-[250px] h-screen pt-[140px] pb-8 pl-6 flex flex-col justify-between z-40 lg:flex lg:sticky`}
      >
        <div className="flex flex-col gap-4">
          {navItems?.map((item, i) => (
            <Link
              href={item.link}
              key={i}
              className={`flex gap-2.5 items-center ${item.link === pathname ? 'opacity-100' : 'opacity-70'
                }`}
            >
              {pathname === item.link && (
                <div className="w-3 h-3 rounded-full bg-brand-dark mb-2"></div>
              )}
              <p className="font-heading font-bold uppercase text-3xl text-brand-dark">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2.5 text-red-700 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          <a className="font-heading font-bold uppercase text-3xl" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </aside>
  );
};

export default Sidebar;

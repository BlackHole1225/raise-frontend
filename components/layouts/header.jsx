'use client';
import { Link } from '@nextui-org/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/navbar';
import { useMotionValueEvent } from 'framer-motion';
import { useScroll } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function GetClientSideStorage(key) {
  let value = '';
  useEffect(() => {
    value = localStorage.getItem(key);
  }, [key]);
  return value;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  // const token = window.localStorage.getItem('authToken');
  const token = GetClientSideStorage('authToken');

  // const menuItems = [
  //   'Profile',
  //   'Dashboard',
  //   'Activity',
  //   'Analytics',
  //   'System',
  //   'Deployments',
  //   'My Settings',
  //   'Team Settings',
  //   'Help & Feedback',
  //   'Log Out',
  // ];

  const menus = [
    { label: 'About', href: '/about' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Forum', href: '/forum' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' }
  ];

  const isGreenDefault = pathname !== '/';

  const [isNavTransparent, setIsNavTransparent] = useState(isGreenDefault ? false : true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 350) {
      setIsNavTransparent(false);
    } else {
      if (!isGreenDefault) {
        setIsNavTransparent(true);
      }
    }
  });

  useEffect(() => {
    if (isGreenDefault) {
      setIsNavTransparent(false);
    }
  }, [pathname]);

  return (
    <Navbar
      classNames={{
        menu: 'top-[100px]',
        wrapper: 'bg-transparent'
      }}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className={`h-[100px] duration-500 fixed ${isNavTransparent ? 'bg-transparent backdrop-filter-none' : 'bg-brand-olive-green'}`}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href='/' className='gap-4'>
            <Image width={45} height={45} src="/images/logo.png" alt="logo" />
            <p className="font-bold text-inherit text-white text-2xl mt-2">Raise</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menus.map((item) => (
          <NavbarItem key={item.label}>
            <Link
              color="foreground"
              href={item.href}
              className="font-body font-bold text-lg text-white"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem className="ml-4">
          {!token ? (
            <Link
              color="foreground"
              href="/login"
              className="font-body font-bold text-lg text-white"
            >
              Login
            </Link>
          ) : (
            <Link
              color="foreground"
              href="/account"
              className="font-body font-bold text-lg text-white"
            >
              Account
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menus.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

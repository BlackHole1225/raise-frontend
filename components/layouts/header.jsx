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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const [token, setToken] = useState('');


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
  useEffect(() => {
    setToken(localStorage?.getItem('authToken'))
  }, [])
  return (
    <Navbar
      classNames={{
        menu: 'top-[100px]',
        wrapper: 'bg-transparent'
      }}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className={`h-[100px] z-50 duration-500 fixed ${isNavTransparent ? 'bg-transparent backdrop-filter-none' : 'bg-brand-olive-green'}`}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-brand-lemon-yellow font-bold"
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
      <NavbarMenu className='bg-brand-lemon-yellow z-50'>
        {menus.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link className="w-full text-brand-olive-green font-bold border-b border-b-brand-olive-green py-1" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          {!token ? (
            <Link
              color="foreground"
              href="/login"
              className="w-full \text-brand-olive-green font-bold border-b border-b-brand-olive-green py-1"
            >
              Login
            </Link>
          ) : (
            <Link
              color="foreground"
              href="/account"
              className="w-full text-brand-olive-green font-bold border-b border-b-brand-olive-green py-1"
            >
              Account
            </Link>
          )}
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

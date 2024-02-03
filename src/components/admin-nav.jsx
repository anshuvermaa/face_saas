'use client';
import React from 'react';
import { SignedOut, UserButton, SignedIn, useSession } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils';

const ANavbar = () => {
  const { session } = useSession();

  const links = [
    { title: 'Profile', url: 'profile' },
    { title: 'Dashboard', url: 'dashboard' },
    // Add more placeholder links as needed
  ];

  return (
    <header className='text-gray-600 body-font bg-white shadow'>
      <div className='container mx-auto flex flex-wrap p-5  items-center justify-between'>
        <div className='flex items-center'>
        <Link href="/dashboard" className="flex items-center ">
        <div className="relative h-8 w-8 ">
          <Image fill alt="Logo" src="/logo.jpg" />
        </div>
        <h1 className={cn("text-2xl font-bold")}>
          Stable diffusion
        </h1>
      </Link>
        </div>
        <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'>
          <SignedIn>
            {links.map((link) =>
              (link.role === 'admin' ) || !link.role ? (
                <Link key={link.title} href={link.url}>
                  {/* Use a div instead of an anchor tag */}
                  <div className='mr-5 cursor-pointer hover:text-gray-900'>
                    {link.title}
                  </div>
                </Link>
              ) : null
            )}
          </SignedIn>
        </nav>
        <div className='md:flex items-center'>
          <SignedOut>
            <Link href='/sign-in'>
              <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4'>
                Login
              </button>
            </Link>
            <Link href='/sign-up'>
              <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base'>
                Sign Up
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className='ml-4'>
              <UserButton afterSignOutUrl='/' />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default ANavbar;

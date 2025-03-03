'use client'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';

function Header() {
  const path = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/dashboard');
  };

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-white text-transparent bg-clip-text'>
        mock.ai
      </span>

      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how-it-works' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/how-it-works">How it works?</Link>
        </li>
      </ul>

      {/* Logout Icon */}
      <button onClick={handleSignOut} className="text-gray-300 hover:text-red-500 transition-all">
        <FiLogOut size={24} />
      </button>
    </div>
  );
}

export default Header;

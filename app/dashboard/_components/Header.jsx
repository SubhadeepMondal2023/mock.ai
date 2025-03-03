'use client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
  const path = usePathname();

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-white text-transparent bg-clip-text'>mock.ai</span>
        
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}><Link href="/dashboard">Dashboard</Link></li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How it works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header;

// @ts-nocheck
"use client"
import React from 'react'
import { Menu, Moon, Search, Settings, Sun, LogOut, User } from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSiderbarCollapsed } from '@/app/reduxstate'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {

  //global state 
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  const dispatch = useAppDispatch();
  const isSiderbarCollapsed = useAppSelector(
    (state) => state.global.isSiderbarCollapsed
  )

  const handleSignOut = () => {
    // Clear token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
    }
    signOut({ callbackUrl: '/login' });
  }

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black w-auto '>
      <div className='flex items-center gap-5'>
        {!isSiderbarCollapsed ? null : (
          <button onClick={() => dispatch(setIsSiderbarCollapsed(!isSiderbarCollapsed))}>
            <Menu className='size-8 dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400' />
          </button>
        )}
        {/* <div className='relative flex flex-row h-min w-[200px]'> */}
        <Link href='/'>
          <Image src="/logo.webp" alt="logo" width={50} height={50} className='rounded' />
        </Link>
        <Link href='/'>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Flicker
          </div>
        </Link>
        {/* </div> */}
      </div>
      {/* icons */}
      <div className='flex gap-5'>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        // className={theme === "dark" ? `roudended p-2 ` : `rounded p-2 hover:bg-gray-100 `}
        >
          {theme === "dark" ? (
            <Sun className='size-6 cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400' />)
            : (<Moon className='size-6 cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400' />)
          }
        </button>
        <Link href="/settings"
          className={theme === "dark" ? `size-min roudended p-2 ` : `size-min rounded p-2 hover:bg-gray-100`} >
          <Settings className='size-6 cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400'></Settings>
        </Link>
        
        {session ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              ) : (
                <User className="size-8 p-1 rounded-full bg-emerald-500 text-white" />
              )}
              <span className="hidden md:block text-sm font-medium dark:text-white">
                {session.user?.name}
              </span>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Sign out"
            >
              <LogOut className="size-5 cursor-pointer dark:text-white hover:text-red-500 hover:dark:text-red-400" />
            </button>
          </div>
        ) : (
          <Link 
            href="/login"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
      {/* <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block">hidsfcds</div> */}
    </div>

  )
}

export default Navbar

"use client"
import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSiderbarCollapsed } from '@/app/reduxstate'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const Navbar = () => {

  //global state 
  const { theme, setTheme } = useTheme()

  const dispatch = useAppDispatch();
  const isSiderbarCollapsed = useAppSelector(
    (state) => state.global.isSiderbarCollapsed
  )

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
      </div>
      {/* <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block">hidsfcds</div> */}
    </div>

  )
}

export default Navbar

"use client"
import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSiderbarCollapsed } from '@/app/reduxstate'
import { useTheme } from 'next-themes'

const Navbar = () => {

  //global state 
  const { theme, setTheme } = useTheme()

  const dispatch = useAppDispatch();
  const isSiderbarCollapsed = useAppSelector(
    (state) => state.global.isSiderbarCollapsed
  )

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black w-auto '>
      {/*serchbar*/}
      <div className='flex items-center gap-8'>
        {!isSiderbarCollapsed ? null : (
          <button onClick={() => dispatch(setIsSiderbarCollapsed(!isSiderbarCollapsed))}>
            <Menu className='size-8 dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400' />
          </button>
        )}
        <div className='relative flex h-min w-[200px]'>
          <Search className="absolute left-[4px] top-1/2 mr-2 size-5 -translate-y-1/2 transform cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400 " />
          <input
            className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white'
            type='search'
            placeholder='Search...'
          />
        </div>
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

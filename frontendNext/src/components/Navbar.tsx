import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSiderbarCollapsed } from '@/app/reduxstate'

const Navbar = () => {

  //global state 

  const dispatch = useAppDispatch();
  const isSiderbarCollapsed = useAppSelector(
    (state) => state.global.isSiderbarCollapsed
  )
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode
  )

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
      {/*serchbar*/}
      <div className='flex items-center gap-8'>
        {!isSiderbarCollapsed ? null : (
          <button onClick={()=> dispatch(setIsSiderbarCollapsed(!isSiderbarCollapsed))}>
            <Menu className='size-8 dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400'/>
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
      <div className='flex items-center'>
        <button onClick={ () => dispatch(setIsDarkMode(!isDarkMode))}
          className={ isDarkMode ? `roudended p-2 ` : `rounded p-2 hover:bg-gray-100 `} 
        >
          {!isDarkMode ? (
            <Sun className = 'size-6 cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400' /> )
            : (<Moon className = 'size-6 cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400' /> )
          }
          </button>
        <Link href="/settings"
        className={ isDarkMode ? `size-min roudended p-2 ` : `size-min rounded p-2 hover:bg-gray-100`} >
          <Settings className='size-6 cursor-pointer dark:text-white hover:text-emerald-500 hover:dark:text-emerald-400'></Settings>
        </Link>
        {/* <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block">hidsfcds</div> */}
      </div>

    </div>
  )
}

export default Navbar

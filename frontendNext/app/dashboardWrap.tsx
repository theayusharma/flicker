"use client";
import React, { useEffect } from 'react'
import Navbar from '@/app/(components)/Navbar'
import Sidebar from '@/app/(components)/Sidebar'
import StoreProvider, { useAppSelector } from '@/app/redux'

//redux

const DashboardLayout = ({children} : {children : React.ReactNode}) => {

  const isSiderbarCollapsed = useAppSelector((state) => state.global.isSiderbarCollapsed);

  const isDarkMode = useAppSelector ((state) => state.global.isDarkMode);
  

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  },[isDarkMode]);

  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-950'>
    {/*hehe sidebar*/}
    <Sidebar/>
    <main className={`dark:bg-dark-bg flex w-full flex-col  bg-gray-50 
      
      ${ isSiderbarCollapsed ? "" : "md:pl-64 "}
      `}>
    <Navbar/>{/*navbar and children*/}
    {children}
    </main>

    </div>
  )
}

const DashboardWrap = ({children} : {children : React.ReactNode}) => {
  return (
  <StoreProvider>
    <DashboardLayout>
      {children}
    </DashboardLayout>
  </StoreProvider>

)}

export default DashboardWrap; 

            

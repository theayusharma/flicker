import {AlertCircle, AlertOctagon, AlertTriangle, ShieldAlert, Layers3,  LockIcon, Home, X, Settings, ChevronDown, ChevronUp, Briefcase, User, Users, Search } from 'lucide-react';
import Image from 'next/image';
import React, {useState} from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { setIsDarkMode, setIsSiderbarCollapsed } from '@/reduxstate/index'
const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);
    const dispatch = useAppDispatch();
  const isSiderbarCollapsed = useAppSelector(
    (state) => state.global.isSiderbarCollapsed
  )
    const sidebarcss = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
		${isSiderbarCollapsed ?  "w-0 hidden" : "w-64" }`
    
    return (
    <div className = {sidebarcss}>
        <div className="flex h-[100%] w-full flex-col justify-start">
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                    list
                </div>
				{isSiderbarCollapsed? null : (<button className="py-3" onClick={() => {dispatch(setIsSiderbarCollapsed(!isSiderbarCollapsed)) 
					}}>
						<X className ="size-6 text-gray-900 hover:gray-500 dark:text-white"/>
				</button>)}
            </div>
            {/* team */}
            <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
                <Image src = "/logo.png" alt ="logo" width={40} height={40} />
                <div>
                    <h3 className='text-md font-bold tracking-widest dark:text-gray-200'>
                    FLICKER
                    </h3>
                    <div className='mt-1 flex itmes-start gap-2'>
                        <LockIcon className='mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400'/>
                        <p className='text-sm text-gray-500'>Private</p>
                    </div>
                </div>
                
			</div>
				{/* navbar links */}
			<nav className = "z-10 w-full">
				<Sidebarlink icon={Home} label="Home" href="/" /> 
				<Sidebarlink icon={Briefcase} label="Timeline" href="/timeline" /> 
				<Sidebarlink icon={Search} label="Search" href="/search" /> 
				<Sidebarlink icon={Settings} label="Settings" href="/settings" /> 
				<Sidebarlink icon={User} label="Users" href="/users" /> 
				<Sidebarlink icon={Users} label="Teams" href="/teams" /> 

			</nav>
       

			<button onClick = {() => setShowProjects((prev) =>!prev)}
			className = "flex w-full items-center text-gray-500 px-8 py-3">
				<span>Projects</span>
				{showProjects? <ChevronUp className ="size-5"/> :
				<ChevronDown className = "size-5" />}

			</button>
			<button onClick = {() => setShowPriority((prev) =>!prev)}
			className = "flex w-full items-center text-gray-500 px-8 py-3">
				<span>Priority</span>
				{showPriority? <ChevronUp className ="size-5"/> :
				<ChevronDown className = "size-5" />}

			</button>
			{showPriority && (
			<>

			<Sidebarlink icon={AlertCircle} label="Urgent" href="/priority/urgent" /> 

			<Sidebarlink icon={ShieldAlert} label="High" href="/priority/high" /> 

			<Sidebarlink icon={AlertTriangle} label="Medium" href="/priority/medium" /> 

			<Sidebarlink icon={AlertOctagon} label="Low" href="/priority/low" /> 

			<Sidebarlink icon={Layers3} label="Backlog" href="/priority/backlog" /> 




				</>
			)}
		</div>
    </div>
  )
}

interface SidebarlinkProps {
	href : string;
	icon : LucideIcon;
	label : string; 
}

const Sidebarlink = ({
href,
icon: Icon,
label
// isCollapsed
}: SidebarlinkProps) => {
		const pathname = usePathname();
		const isActive = pathname === href || (pathname === "/"  && href === "/dashboard")

		return (
		<Link href={href} className = "w-full">
			<div className = {`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive? "bg-gray-100 text-white dark:bg-gray-600" : "" } justify-start px-8 py-3`}>
			{isActive && (<div className = " absolute left-0 top-0 h-[100%] w-[5px] bg-emerald-400 ">
				
				</div>)} 
			<Icon className="size-6 text-gray-900 dark:text-gray-100" />
			<span className = "font-medium text-gray-900 dark:text-gray-100">{label}</span>
		</div>
	</Link>
		)
	
}

export default Sidebar

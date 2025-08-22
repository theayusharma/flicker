import Header from "@/components/Header";
import { Clock, Filter, Grid3x3, List, LucideGrid3x3, Share2, Table } from "lucide-react";
import React, {useState} from "react"
type Props = {
  activeTab : string;
  setActiveTab : (tabName : string) => void
};

const ProjectHeader = ({activeTab,setActiveTab}: Props) => {

  const[isModalNewProjectOpen,setIsModalNewProjectOpen] = useState(false)l

  return (
    <div className = "px-4 xl:px-6">
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name = "Product Design"/>
      </div>
      {/* {tabs} */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200
      pb-[8px] pt-2 dark:border-stroke-dark md:items-center ">

        <div className="flex flex-1 items-center gap-5 md:gap-4">
          <TabButton 
          name="Board"
          icon={<LucideGrid3x3 className="size-5" />}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          />
          <TabButton 
          name="List"
          icon={<List className="size-5" />}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          />
          <TabButton 
          name="Timeline"
          icon={<Clock className="size-5" />}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          />
          <TabButton 
          name="Table"
          icon={<Table className="size-5" />}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-5">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 ">
            <Filter className="size-5"/>
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 ">
            <Share2 className="size-5"/>
          </button>
          <div className="relative">
            <input type="text" placeholder="Search" className="rounded-md border border-gray-300 py-1 pl-10 pr-4 focus:outline-none dark:bord-dark-secondary dark:bg-dark-secondary dark:text-white " />
              <Grid3x3 className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500"/>

          </div>
        </div>
      </div>
    </div>

  )
}

type TabButtonprop = {
  name : string;
  icon : React.ReactNode;
  setActiveTab : (tabName : string) => void;
  activeTab : string;
}

const TabButton = ({name,icon,setActiveTab,activeTab} : TabButtonprop) => {
  const isActive = activeTab === name;
  
  return(
  <button
    className={`relative flex items-center gap-2 text-gray-500 after:absolute after:content-[''] px-1 py-2 after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:hover:text-white dark:text-neutral-500 sm:px-2 lg:px-4 ${isActive ? "after:bg-blue-600 text-blue-500 dark:text-white" : "after:bg-transparent"}`}
      onClick={ () => setActiveTab(name)}
    >
      {icon} {name}
    </button>
  )
}


export default ProjectHeader;

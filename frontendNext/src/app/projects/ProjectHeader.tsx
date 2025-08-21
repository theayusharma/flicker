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
        <Head>

        </Head>

      </div>
    </div>

  )
}

export default ProjectHeader;

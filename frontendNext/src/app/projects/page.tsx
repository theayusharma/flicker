"use client"
import React, {use, useState} from "react"
import ProjectHeader from "@/app/projects/ProjectHeader"
type Props = {
  params : {id :string};
};

const Project = (props: Props) => {
  const {id} = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)
 

  return (
    // modal tasks
    <div>
      <div>
        Project   
      </div>
      <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* {activeTab == "Board" && (
          <Board/
        ) }*/}
      </div>
    </div>
  )
}

export default Project

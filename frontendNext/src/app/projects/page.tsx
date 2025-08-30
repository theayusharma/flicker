"use client"
import React, { useState } from "react"
import ProjectHeader from "@/app/projects/ProjectHeader"
import Boardview from "./Boardview";
import List from "./ListView";
type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)


  return (
    // modal tasks
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "Board" && (
        <Boardview id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab == "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

    </div>
  )
}

export default Project

"use client"
import React, { useState } from "react"
import ProjectHeader from "@/app/projects/ProjectHeader"
import Boardview from "../Boardview";
import List from "../ListView";
import TimeLineView from "../TimelineView";
import TableView from "../TableView";
type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)


  return (
    // modal tasks
    <div className="dark:bg-zinc-800">
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "Board" && (
        <Boardview id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab == "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab == "Timeline" && (
        <TimeLineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab == "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

    </div>
  )
}

export default Project

"use client"

import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery, useGetTasksQuery } from "@/app/reduxstate/api";
import React, { useMemo, useState } from "react"
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react"
import { previousMonday } from "date-fns";
import "gantt-task-react/dist/index.css"
import Header from "@/components/Header";
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

type TaskTypeItems = "task" | "milestone" | "project"

const TimeLine = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  const { data: projects, isLoading, error } = useGetProjectsQuery()

  const [displayOp, setDisplayOp] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US"
  })

  const ganttProjects = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.StartDate),
        end: new Date(project.EndDate),
        name: project.Name,
        id: `Project-${project.ID}`,
        type: "project" as TaskTypeItems,
        description: project.Description,
        isDisabled: false,
      })) || []
    )
  }, [projects])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching projects {JSON.stringify(error, null, 2)
  }</div>;

  const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOp((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }))
  }
  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex itemes-center justify-between">
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-64">
          <select className="focues:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-white dark:bg-zinc-900 dark:text-white"
            value={displayOp.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>
      <div className="overflow-hidden rounded-md bg-white dark:bg-zinc-900 darl:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttProjects}
            {...displayOp}
            columnWidth={displayOp.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  )
}

export default TimeLine

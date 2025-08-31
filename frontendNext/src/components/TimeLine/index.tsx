import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/app/reduxstate/api";
import React, { useMemo, useState } from "react"
import { DisplayOption, ViewMode } from "gantt-task-react"
import { previousMonday } from "date-fns";
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

type TaskTypeItems = "task" | "milestone" | "project"

const TimeLine = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  const { data: tasks, error, isLoading } = useGetTasksQuery({
    projectId: 1
  })
  const [displayOp, setDisplayOp] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US"
  })

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startdate as string),
        end: new Date(task.duedate as string),
        name: task.title,
        id: task.id,
        type: "task" as "TaskType",
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    )
  }, [tasks])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks: {JSON.stringify(error, null, 2)}</div>;

  const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOp((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }))
  }
  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select className="focues:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOp.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default TimeLine

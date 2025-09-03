import { Task, useGetTasksQuery } from "@/app/reduxstate/api";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import React from "react"


type ListProps = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const List = ({ id, setIsModalNewTaskOpen }: ListProps) => {
  const { data: tasks, error, isLoading } = useGetTasksQuery({
    projectId: Number(id)
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks: {JSON.stringify(error, null, 2)}</div>;
  return (
    <div
      className="px-4 pb-6 xl:px-6"
    >
      <div className="pt-5">
        <Header name="List"
          buttonComponent={
            <button
              className="flex items-center bg-emerald-500 text-white hover:bg-emerald-300 rounded p-2"
              onClick={() => setIsModalNewTaskOpen(true)}>
              Add Task
            </button>
          }
          isSmallText
        />

      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default List

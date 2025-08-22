import { useGetTasksQuery,useUpdateTaskStatusMutation } from "@/app/reduxstate/api";
import React from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

type BoardProps = {
  id:string;
  setIsModalNewTaskOpen : (isOpen : boolean) => void;
};

const tastStatus = ["To Do", "Work In Progress", "Under Review", "Completed" ]

const Boardview = ({id, setIsModalNewTaskOpen} : BoardProps) => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId:number, toStatus : string) => {
    updateTaskStatus({taskId, status : toStatus})
}
  const {data : tasks, isLoading, error} = useGetTasksQuery({projectId : Number(id)}) 

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>An error occurred while fetching tasks;
  </div>

  return <DndProvider backend={HTML5Backend}>
  
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
      {taskStatus.map((status) => (
      <TaskColumn
          key={status}
        status={sattus}
        tasks = {tasks || []}
        moveTask = {moveTask}
        setIsModalNewTaskOpen = {setIsModalNewTaskOpen} 
        />
      ))}
    </div>

  </DndProvider>
}

interface TaskColumnProps = {
  status = string:
  tasks : TaskType[]
}
const TaskColumn = ({
  status,
  tasks,
  setIsModalNewTaskOpen,
} : TaskColumnProps)


export default Boardview

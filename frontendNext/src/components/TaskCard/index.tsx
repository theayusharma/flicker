import { Task } from "@/app/reduxstate/api"
import React from "react"
import { format } from "date-fns"
import Image from "next/image"
type Props = {
  task: any
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 ro classNameuded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white dark:bg-zinc-900 rounded-md">
      {task.attachments && task.attachments.length > 0 && (
        <div className="">
          <strong>attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments &&
              task.attachments.length > 0 && (
                <Image
                  src={task.attachments[0].FileURL}
                  alt={task.attachments[0].FileName || "Attach Img"}
                  width={400}
                  height={200}
                  className="rounded-md"
                />
              )}
          </div>
        </div>
      )}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.Title}
      </p>
      <p>
        <strong>Description:</strong>{" "} {task.Description || "No desc provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.Status}
      </p>
      <p>
        <strong>Priority:</strong> {task.Priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.Tags ||
          "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong> {" "} {task.StartDate ? format(new Date(task.StartDate), "P") : "Not Set"}
      </p>
      <p>
        <strong>Due Date:</strong> {" "} {task.DueDate ? format(new Date(task.DueDate), "P") : "Not Set"}
      </p>
      <p>
        <strong>Author:</strong> {task.Author ? task.Author.UserName : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong> {task.Assignee ? task.Assignee.UserName : "Unassigned"}
      </p>

    </div>
  )
}

export default TaskCard

import { Priority, Status, useCreateTaskMutation } from "@/app/reduxstate/api";
import Modal from "@/components/Modal";
import { setDate } from "date-fns";
import { useState } from "react";
import { formatISO } from "date-fns";
import { Tags } from "lucide-react";
type Props = {
  isOpen: boolean,
  onClose: () => void;
  id?: string | null;
}

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [Title, setTitle] = useState("")
  const [status, setStatus] = useState<Status>(Status.todo)
  const [Description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>(Priority.backlog)
  const [Tags, setTags] = useState("")
  const [StartDate, setStartDate] = useState("")
  const [DueDate, setDueDate] = useState("")
  const [AuthorUserId, setAuthorUserId] = useState("")
  const [AssignedUserId, setAssignedUserId] = useState("")
  const [ProjectId, setProjectId] = useState("")
  const handleSubmit = async () => {

    if (!Title) return

    const fStartDate = formatISO(new Date(StartDate), { representation: 'complete' })
    const fDueDate = formatISO(new Date(DueDate), { representation: 'complete' })
    console.log(StartDate)
    console.log(fStartDate)
    await createTask({
      title: Title,
      description: Description,
      status,
      priority,
      startdate: fStartDate,
      duedate: fDueDate,
      authorid: parseInt(AuthorUserId),
      assigneeid: parseInt(AssignedUserId),
      projectid: Number(id)
    })
  }
  const isFormValid = () => {
    console.log(Title, AssignedUserId, id)
    return Title && AuthorUserId && (id !== undefined || ProjectId);
  };

  const selectCss = "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-black dark:bg-zinc-800 dark:text-white dark:focus:outline-none"

  const inputCss = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-black dark:bg-zinc-800 dark:text-white dark:focus:outline-none "

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task" >
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <input type="text" className={inputCss} placeholder="Title" value={Title}
          onChange={(e) => setTitle(e.target.value)} />
        {/* <option value={Priority.Low}>Low</option> */}
        <textarea className={inputCss} placeholder="Description" value={Description}
          onChange={(e) => setDescription(e.target.value)} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select className={selectCss}
            value={priority} onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])} >
            <option value="">Select Priority</option>
            <option value={Priority.urgent}>Urgent</option>
            <option value={Priority.high}>High</option>
            <option value={Priority.medium}>Medium</option>
            <option value={Priority.low}>Low</option>
            <option value={Priority.backlog}>Backlog</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectCss}
            value={status}
            onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])} >
            <option value="">Select Status</option>
            <option value={Status.todo}>To Do</option>
            <option value={Status.in_progress}>Work In Progress</option>
            <option value={Status.review}>Under Review</option>
            <option value={Status.done}>Completed</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input type="date" className={inputCss} value={StartDate}
            onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" className={inputCss} value={DueDate}
            onChange={(e) => setDueDate(e.target.value)} />
        </div>

        <input type="text" className={inputCss} placeholder="Tags" value={Tags}
          onChange={(e) => setTags(e.target.value)} />

        <input type="text" className={inputCss} placeholder="Author User Id" value={AuthorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)} />

        <input type="text" className={inputCss} placeholder="Assigned User Id" value={AssignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)} />

        {id === null && (
          <input
            type="text"
            className={inputCss}
            placeholder="ProjectId"
            value={ProjectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          disabled={!isFormValid() || isLoading} >
          {isLoading ? "Creating ..." : "Create Task"}
        </button>
      </form>
    </Modal >
  )
}
export default ModalNewTask 

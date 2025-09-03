import { useCreateProjectMutation } from "@/app/reduxstate/api";
import Modal from "@/components/Modal";
import { setDate } from "date-fns";
import { useState } from "react";
import { formatISO } from "date-fns";
type Props = {
  isOpen: boolean,
  onClose: () => void;
}

const ModalNewProject = ({
  isOpen, onClose
}: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation()
  const [ProjectName, setProjectName] = useState("")
  const [Description, setDescription] = useState("")
  const [StartDate, setStartDate] = useState("")
  const [DueDate, setEndDate] = useState("")

  const handleSubmit = async () => {

    if (!ProjectName || !StartDate || !DueDate) return;

    const fStartDate = formatISO(new Date(StartDate), { representation: 'complete' })
    const fDueDate = formatISO(new Date(DueDate), { representation: 'complete' })
    console.log(StartDate)
    console.log(fStartDate)
    await createProject({
      name: ProjectName,
      description: Description,
      startdate: fStartDate,
      enddate: fDueDate,
    })
  }
  const isFormValid = () => {
    return ProjectName && Description && StartDate && DueDate;
  }

  const inputCss = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-black dark:bg-zinc-800 dark:text-white dark:focus:outline-none "

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">

      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <input type="text" className={inputCss} placeholder="Project Name" value={ProjectName}
          onChange={(e) => setProjectName(e.target.value)} />
        <textarea className={inputCss} placeholder="Description" value={Description}
          onChange={(e) => setDescription(e.target.value)} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input type="date" className={inputCss} value={StartDate}
            onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" className={inputCss} value={DueDate}
            onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          disabled={!isFormValid() || isLoading}>
          {isLoading ? "Creating ..." : "Create Project"}
        </button>
      </form>
    </Modal>
  )
}

export default ModalNewProject

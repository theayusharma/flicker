import { Project } from "@/app/reduxstate/api"

type Props = {
  project: Project
}

const ProjectCard = ({ project }: Props) => {

  return (
    <div
      className="mb-3 bg-white p-4 shadow dark:text-white dark:bg-zinc-900 rounded-md"
    >
      <h3 className="font-bold">{project.Name}</h3>
      <p>Description: {project.Description}</p>
      <p>
        Start Date: {project.StartDate ? new Date(project.StartDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }) : "Not set"}
      </p>
      <p>
        End Date: {project.EndDate ? new Date(project.EndDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }) : "Not set"}
      </p>
    </div>
  )
}

export default ProjectCard

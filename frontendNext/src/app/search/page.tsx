"use client"

import { debounce } from "lodash"
import { useSearchQuery } from "../reduxstate/api"
import { useEffect, useState } from "react"
import Header from "@/components/Header"
import TaskCard from "@/components/TaskCard"
import UserCard from "@/components/UserCard"
import ProjectCard from "@/components/ProjectCard"

const Search = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const { data: searchRes, isLoading, isError } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3
  })

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
    },
    500,
  )

  useEffect(() => {
    return handleSearch.cancel
  }, [handleSearch.cancel])

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input type="text" placeholder="Search..." className="w-1/2 rounded border p-3 shadow dark:bg-zinc-900 dark:text-white"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5 flex flex-col">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search res.</p>}
        {!isLoading && !isError && searchRes && (
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">

            {searchRes.task && searchRes.task?.length > 0 && (
              <h2 className="dark:text-white text-center font-bold text-xl">Tasks</h2>
            )}
            {searchRes.task?.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}

            {searchRes.project && searchRes.project?.length > 0 && (
              <h2 className="dark:text-white text-center font-bold text-xl">Projects</h2>
            )}
            {searchRes.project?.map((t) => (
              <ProjectCard key={t.ID} project={t} />

            ))}

            {searchRes.user && searchRes.user?.length > 0 && (
              <h2 className="dark:text-white text-center font-bold text-xl">Users</h2>
            )}
            {searchRes.user?.map((t) => (
              <UserCard key={t.userId ?? t.username} user={t} />
            ))}
          </div>
        )}
      </div>
    </div>

  )
}

export default Search

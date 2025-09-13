"use client"

import { GridColDef } from "@mui/x-data-grid"
import { useAppSelector } from "../redux"
import { Priority, Project, Task, useGetProjectsQuery, useGetTasksQuery } from "../reduxstate/api"
import Header from "@/components/Header"
import { ResponsiveContainer, BarChart, PieChart, Pie, Cell, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { DataGrid } from "@mui/x-data-grid"
import { dataGridCN, dataGridSx } from "../lib/utils"
const HomePage = () => {

  const { data: tasks, isLoading: taskLoading, isError: tasksError } = useGetTasksQuery({
    projectId: parseInt("1")
  })

  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery()

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  if (taskLoading || isProjectsLoading) return <div>Loading...</div>
  if (tasksError || !tasks || !projects) return <div>errror fetching</div>

  const priorityCount = tasks.reduce((acc: Record<string, number>, task:
    Task) => {
    // const { priority } = task
    const priority = task.Priority || "low"
    acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;

    return acc;
  },
    {}
  )

  const taskDistri = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key]
  }))


  // const taskDistri = [
  //   {
  //     name: "hello",
  //     count: 4,
  //   },
  //   {
  //     name: "hello",
  //     count: 4,
  //   },
  //   {
  //     name: "hello",
  //     count: 4,
  //   },
  // ]


  const statusCount = projects.reduce((acc: Record<string, number>, project:
    Project) => {
    const status = project.EndDate ? "Completed" : "Active"
    acc[status] = (acc[status] || 0) + 1;

    return acc;
  },
    {}
  )

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key]
  }))

  const taskCols: GridColDef[] = [
    { field: "Title", headerName: "Title", width: 200 },
    { field: "Status", headerName: "Status", width: 150 },
    { field: "Priority", headerName: "Priority", width: 150 },
    { field: "DueDate", headerName: "Due Date", width: 150 },
  ];

  const Colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const chartColors = isDarkMode
    ? {
      bar: "#8884d8",
      barGrid: "#303030",
      pieFill: "#4A90E2",
      text: "#FFFFFF",
    }
    : {
      bar: "#8884d8",
      barGrid: "#E0E0E0",
      pieFill: "#82ca9d",
      text: "#000000",
    };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-transparent p-8" >
      <Header name="DashBoard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 ">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-500">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Tasks Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300} >
              <BarChart data={taskDistri}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.barGrid} />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }} />
                <Legend />
                <Bar dataKey="task count" fill={chartColors.bar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-500 w-min-400">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Priority Status
            </h3>
            <ResponsiveContainer width="100%" height={300} >
              <PieChart>
                <Pie dataKey="count" data={projectStatus} label fill="#82ca9d" />
                {projectStatus.map((name, idx) => {
                  <Cell key={`cell-${idx}`} fill={Colors[idx % Colors.length]} />
                })}

                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={chartColors.bar} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-500">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Your Tasks
            </h3>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={tasks}
                columns={taskCols}
                checkboxSelection
                loading={taskLoading}
                getRowClassName={() => "data-grid-row"}
                getCellClassName={() => "data-grid-col"}
                className={dataGridCN}
                sx={dataGridSx(isDarkMode)}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage 

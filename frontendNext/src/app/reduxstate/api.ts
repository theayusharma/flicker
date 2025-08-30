import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { error } from "console";
import { PagesUserlandModule } from "next/dist/server/route-modules/pages/module.compiled";

export interface Project {
  id?: string;
  name?: string;
  description?: string;
  startdate?: string;
  enddate?: string;

}

export interface Task {

  id: number;
  createdat?: number;
  updatedat?: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startdate?: string;
  duedate?: string;
  points?: number;
  projectid: number;
  authorid?: number;
  assigneeid?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[]

}
export interface Attachment {
  id: number;
  FileURL: string;
  FileName: string;
  taskId: number;
  uploadedId: number;
}

export interface User {
  userIdd?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  providerId?: string;
  teamId?: number;
}

export enum Status {
  todo = "To Do",
  in_progress = "Work In Progress",
  done = "Completed",
  review = "Under Review"

}
// Status string`gorm:"type:varchar(50);check:status IN ('todo','in_progress','review','done')" json:"status"`
export enum Priority {
  urgnet = "Urgnet",
  backlog = "Backlog",
  low = "Low",
  high = "High",
  medium = "Medium"
}



export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACK_URL }),
  reducerPath: 'api',
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({

    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      transformResponse: (response: Task[]) =>
        response.map(task => ({
          ...task,
          attachments: task.attachments ?? []
        })),
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }]
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks ",
        method: "POST",
        body: task
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [{
        type: "Tasks", id: taskId
      }],
    })
  }),
})

export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTaskMutation, useUpdateTaskStatusMutation } = api;

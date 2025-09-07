"use client"
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid"
import { useAppSelector } from "../redux"
import { useGetTeamsQuery, Team } from "../reduxstate/api"
import Header from "@/components/Header"
import { collectMeta } from "next/dist/build/utils"
import Image from "next/image"
import { dataGridCN, dataGridSx } from "../lib/utils"

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
)


type Props = {
  team: Team
}


const columns: GridColDef[] = [
  {
    field: "id", headerName: "Team ID", width: 100
  },
  {
    field: "team_name", headerName: "Team Name", width: 100
  },
  {
    field: "product_owner_username", headerName: "Product Owner", width: 100
  },
  {
    field: "project_manager_username", headerName: "Project Manager", width: 100
  },
]
const Teams = () => {

  const { data: team, isLoading, isError } = useGetTeamsQuery()

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  if (isLoading) return <div>Loading...</div>
  if (isError || !team) return <div>err fetching teams {isError}</div>

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={team || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridCN}
          sx={dataGridSx(isDarkMode)}
        />
      </div>
    </div >
  )
}

export default Teams

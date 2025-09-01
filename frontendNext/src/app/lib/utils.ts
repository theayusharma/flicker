export const dataGridCN = "border border-gray-200 bg-white shadow dark:border-black dark:bg-zinc-950 dark:text-gray-200"


export const dataGridSx = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
        borderColor: `${isDarkMode ? "#2d3135" : ""}`,
      },
    },
    "& .MuiIconbutton-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    },
    "& .MuiDataGrid-filler ": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    }
  };
};

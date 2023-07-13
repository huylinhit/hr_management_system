import { Box, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  id: any;
  rows: any;
  columns: any;
  dependency1: boolean;
  dependency2: boolean;
}
export default function DatagridCustome({ id, rows, columns, dependency1, dependency2 }: Props) {
  return (
    <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
      <DataGrid
        autoHeight
        density="standard"
        getRowId={(row: any) => row.id}
        sx={{
          height: 700,
          //border: "none",
          color: "#000000",
          fontSize: 16,
          fontWeight: 550,
          fontFamily: "Mulish",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow effect
          backgroundColor: "rgba(255, 255, 255, 1)", // Set the opacity
        }}
        slots={{
          loadingOverlay: LinearProgress,
          //toolbar: CustomToolbar,
        }}
        loading={dependency1 || dependency2}
        rows={rows}
        columns={columns}
        //showCellVerticalBorder
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

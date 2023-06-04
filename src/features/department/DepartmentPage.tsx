import { Box, Grid } from "@mui/material";

// component
import DepartmentList from "./component/DepartmentList";
import DepartmentHeader from "./component/DepartmentHeader";

// style
import "./DepartmentPage.css"


export default function DepartmentPage () {
  return (
    <Box className="page-content">
      <Grid xs={12} sx={{ marginBottom: "20px" }}>
        <DepartmentHeader />
      </Grid>
      <Grid container xs={12}>
        <DepartmentList />
      </Grid>
    </Box>
  );
};


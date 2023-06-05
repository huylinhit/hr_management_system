import { Box, Grid } from "@mui/material";

// component
import DepartmentList from "./component/DepartmentList";
import DepartmentHeader from "./component/DepartmentHeader";

// style
import "./DepartmentPage.css"
import { useState } from "react";

// api
import { Department } from "../../app/models/department";
import { UserInfor } from "../../app/models/userInfor";

// Fake data
import { USERINFOR } from "../../app/store/data"
import { DEPARTMENT } from "../../app/store/data"

export default function DepartmentPage () {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENT)
  const [staffs, setStaffs] = useState<UserInfor[]>(USERINFOR)
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Box className="page-content">
      <Grid container sx={{ marginBottom: "20px" }}>
        <DepartmentHeader />
      </Grid>
      <Grid container sx={{ padding: "0 30px 40px 30px" }}>
        <DepartmentList departments={departments} staffs={staffs} />
      </Grid>
    </Box>
  );
};


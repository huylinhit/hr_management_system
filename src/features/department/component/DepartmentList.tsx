// component
import DepartmentCard from "./DepartmentCard";

// api
import { Department } from "../../../app/models/department";
import { UserInfor } from "../../../app/models/userInfor";
import { Grid } from "@mui/material";

// interface
interface Props {
    departments: Department[]
    staffs: UserInfor[]
}

export default function DepartmentList ({departments, staffs}: Props) {
    // -------------------------- VAR -----------------------------
    // -------------------------- STATE ---------------------------
    // -------------------------- REDUX ---------------------------
    // -------------------------- EFFECT --------------------------
    // -------------------------- MAIN ----------------------------
    // return (
    //     <Grid item  xs={12}>
    //         {departments.map((department) => (
    //             <DepartmentCard key={department.departmentId} department={department} staffs={staffs}/>
    //         ))}
    //     </Grid>
    // )
}
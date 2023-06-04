import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Department } from "../../../app/models/department";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
    department: Department
    staffs: UserInfor[]
}

export default function DepartmentCard ({department, staffs}: Props) {
    // -------------------------- VAR -----------------------------
    const manager = staffs.find((staff) => staff.departmentId === department.departmentId && staff.position === "Manager")
    const staffInDepartment = staffs?.filter((staff) => staff.departmentId === department.departmentId)
    let countStaff = 0
    for (let index = 0; index < staffInDepartment.length; index++) {
        countStaff++;     
    }    
    // -------------------------- STATE ---------------------------
    // -------------------------- REDUX ---------------------------
    // -------------------------- EFFECT --------------------------
    // -------------------------- MAIN ----------------------------
    return (
        <Card sx={{ width: "100%", padding: "20px", margin: "20px 0" }}>
            <CardHeader title={department.departmentName}/>
            <Grid container sx={{ display: "flex", justifyContent:"center", alignItems:"center"}}>
                <Grid xs={10} sx={{ display: "flex", justifyContent:"center", alignItems:"center", padding:"0 20px"}}>
                        <Grid xs={4}>
                            <Typography gutterBottom variant="h6">
                                Quản lý
                            </Typography>
                            <Typography variant="h6">
                                Số lượng nhân viên
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Typography>
                                {manager? manager.lastName + " " + manager.firstName : "Not yet"}
                            </Typography>
                            <Typography>
                                {countStaff}
                            </Typography>
                        </Grid>
                </Grid>
                <Grid xs={2}>
                    <CardActions>
                        <Button size="medium">Xem thêm</Button>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}
import { useState } from "react";

// data
import { Employee } from "../../../app/models/employee";
import { DEPARTMENT } from "../../../app/store/data";
import { Department } from "../../../app/models/departments";
import { Box, Grid, Typography } from "@mui/material";


// interface
interface Props {
  staff: Employee;
}

export default function DetailInfo({ staff }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENT);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const department = departments.find((d) => staff.departmentId === d.departmentId)

  return (
    <Box sx={{ padding: "0 10px"}}>
      <Grid>
        <Typography variant="h5" sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}>
          Thông tin
        </Typography>
      </Grid>

      <Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.gender === 0 ? "Nữ" : "Nam"}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngày sinh:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.dob}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Phòng ban:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{department?.departmentName}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngày vào làm:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.hireDate}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Quốc tịch:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.country}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>CMND|CCCD:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.citizenId}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Số năm làm việc:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.workTimeByYear} năm </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Tk ngân hàng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.bankAccount}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Tên tài khoản:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.bankAccountName}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px"
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngân hàng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>{staff.bank}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

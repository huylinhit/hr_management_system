import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";


// data
import { DEPARTMENT } from "../../../app/store/data";
import { Department } from "../../../app/models/departments";
import { UserInfor } from "../../../app/models/userInfor";


// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function DetailInfo({ employee }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENT);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const department = departments.find((d) => employee?.departmentId === d.departmentId)

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
            <Typography sx={{ fontWeight: "400" }}>{employee?.gender === 0 ? "Nữ" : "Nam"}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{moment(employee?.dob).format("DD-MM-YYYY")}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.departmentName}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{moment(employee?.hireDate).format("DD-MM-YYYY")}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.country}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.citizenId}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.workTimeByYear} năm </Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.bankAccount}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.bankAccountName}</Typography>
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.bank}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

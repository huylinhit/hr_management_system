import { useState } from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import moment from "moment";

// data
import { DEPARTMENT } from "../../../app/store/data";
import { Department } from "../../../app/models/departments";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function EditInfo({ employee }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENT);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const department = departments.find(
    (d) => employee?.departmentId === d.departmentId
  );

  return (
    <Box sx={{ padding: "0 10px" }}>
      <Grid>
        <Typography
          variant="h5"
          sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}
        >
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
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              select
              id="outlined-required"
              sx={{ width: "15ch" }}
              size="small"
              label="Giới tính"
              defaultValue={employee?.gioiTinh}
            >
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={0}>Nữ</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngày sinh:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Ngày sinh"
              size="small"
              margin="dense"
              defaultValue={moment(employee?.dob).format("DD-MM-YYYY")}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Phòng ban:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Phòng ban"
              size="small"
              margin="dense"
              defaultValue={employee?.departmentName}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngày vào làm:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Ngày vào làm"
              size="small"
              margin="dense"
              defaultValue={moment(employee?.hireDate).format("DD-MM-YYYY")}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Quốc tịch:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Quốc tịch"
              size="small"
              margin="dense"
              defaultValue={employee?.country}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>CMND|CCCD:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="CMND|CCCD"
              size="small"
              margin="dense"
              defaultValue={employee?.citizenId}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Số năm làm việc:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Số năm làm việc"
              size="small"
              margin="dense"
              defaultValue={employee?.workTimeByYear}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Tk ngân hàng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Tk ngân hàng"
              size="small"
              margin="dense"
              defaultValue={employee?.bankAccount}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Tên tài khoản:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Tên tài khoản"
              size="small"
              margin="dense"
              defaultValue={employee?.bankAccountName}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngân hàng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Ngân hàng"
              size="small"
              margin="dense"
              defaultValue={employee?.bank}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

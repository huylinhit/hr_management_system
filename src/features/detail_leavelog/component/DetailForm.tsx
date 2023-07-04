import { Grid, Typography } from "@mui/material";
import { type } from "os";

// api
import { LogOT } from "../../../app/models/LogOT";
import { OtType } from "../../../app/models/otType";
import { Employee } from "../../../app/models/employee";
import { LeaveLog } from "../../../app/models/leaveLog";
import { LeaveType } from "../../../app/models/leaveType";

// interface
interface Props {
  staff: Employee;
  logLeave: LeaveLog;
  types: LeaveType[];
}

export default function DetailForm({ staff, logLeave, types }: Props) {
  const type = types.find((type) => type.leaveTypeId === logLeave.leaveTypeId);
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Mã đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.leaveLogId}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Mã số nhân viên: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.staffId}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Tên nhân viên: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {staff.lastName} {staff.firstName}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Loại đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {type?.leaveTypeName}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Từ: </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.leaveStart}
          </Typography>
        </Grid>
        <Grid item xs={1} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>-</Typography>
        </Grid>
        <Grid item xs={2} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Đến: </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.leaveEnd}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Số ngày nghỉ: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.leaveDays} ngày
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Nội dung đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.description}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Ngày gửi đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
           sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave.createAt}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

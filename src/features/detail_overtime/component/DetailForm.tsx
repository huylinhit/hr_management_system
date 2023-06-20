import { Grid, Typography } from "@mui/material";
import { type } from "os";

// api
import { Employee } from "../../../app/models/employee";
import { LogOT } from "../../../app/models/LogOT";
import { OtType } from "../../../app/models/otType";

// interface
interface Props {
  staff: Employee;
  logOt: LogOT;
  types: OtType[];
}

export default function DetailForm({ staff, logOt, types }: Props) {
  const type = types.find((type) => type.otTypeId === logOt.otTypeId);
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
        <Grid item xs={4} className="form-title">
          <Typography>Mã đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.otLogId}</Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Mã số nhân viên: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.staffId}</Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Tên nhân viên: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Loại đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{type?.typeName}</Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Từ: </Typography>
        </Grid>
        <Grid item xs={2} className="form-content">
          <Typography>{logOt.logStart}</Typography>
        </Grid>
        <Grid item xs={1} className="form-title">
          <Typography>-</Typography>
        </Grid>
        <Grid item xs={2} className="form-title">
          <Typography>Đến: </Typography>
        </Grid>
        <Grid item xs={3} className="form-content">
          <Typography>{logOt.logEnd}</Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Số ngày nghỉ: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.logHours} giờ</Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Nội dung đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.reason}</Typography>
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
        <Grid item xs={4} className="form-title">
          <Typography>Ngày gửi đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.createAt}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

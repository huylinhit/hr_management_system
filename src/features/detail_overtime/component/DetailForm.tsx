import { Grid, Typography } from "@mui/material";
import { type } from "os";

// api
import { Employee } from "../../../app/models/employee";
import { OtType } from "../../../app/models/otType";
import axios from "axios";
import { useState, useEffect } from "react";
import { LogOt } from "../../../app/models/logOt";


// interface
interface Props {
  staff: Employee;
  logOt: LogOt;
  types: OtType[];
}


export default function DetailForm
({ staff, logOt, types }: Props) 
{
  const type = types.find((type) => type.otTypeId === logOt.otTypeId);

  const [list, setList] = useState<LogOt[]>();

  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('/logots/${staffId}/')
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            {logOt.otLogId}
            
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
           {logOt.staffId}
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
            {type?.typeName}
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
            {logOt.logStart}
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
            {logOt.logEnd}
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
          }}>Số giờ làm: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logOt.logHours} giờ
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
            {logOt.reason}
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
            {logOt.createAt}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

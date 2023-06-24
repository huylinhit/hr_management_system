import { Button, Grid, IconButton, Typography } from "@mui/material";
import { AiOutlineQuestionCircle } from "react-icons/ai";

// api
import { LogOT } from "../../../app/models/LogOT";
import { OtType } from "../../../app/models/otType";
import DetailLeaveInfo from "./component/DetailLeaveInfo";

// interface
interface Props {
  logOt: LogOT;
  types: OtType[];
}

export default function DetailForm({ logOt, types }: Props) {
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
        <Grid item xs={4}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Loại đơn:{" "}
          </Typography>
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
        <Grid item xs={4}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Từ:{" "}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logOt.logStart}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            -
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Đến:{" "}
          </Typography>
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
        <Grid item xs={4}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Số ngày nghỉ: 
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logOt.logHours} ngày
            <DetailLeaveInfo />
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Nội dung đơn:{" "}
          </Typography>
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
        <Grid item xs={4}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Ngày gửi đơn:{" "}
          </Typography>
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

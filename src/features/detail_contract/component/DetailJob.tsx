import { Grid, Typography } from "@mui/material";

// data
import Contract from "../../../app/models/contract";
import { UserInfor } from "../../../app/models/userInfor";
import moment from "moment";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
}
const fontStyle = "Mulish";
const gridStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  maxWidth: "100%",
  mb: "10px",
};
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  fontSize: "16px",
};
const infoStyle = {
  fontFamily: fontStyle,
  fontWeight: 500,
  fontSize: "16px",
};
export default function DetailJob({ contract, employee }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Grid sx={{ paddingBottom: "10px" }}>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",

          fontFamily: fontStyle,
        }}
      >
        1. Công việc, phòng ban và thời hạn hợp đồng
      </Typography>

      <Grid>
        <Grid container sx={gridStyle}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Phòng ban công tác:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={infoStyle}>{employee?.departmentName}</Typography>
          </Grid>
        </Grid>

        <Grid container sx={gridStyle}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Loại hợp đồng:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={infoStyle}>
              {contract?.contractType?.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={gridStyle}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Từ ngày:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={infoStyle}>
              {moment(contract?.startDate).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography sx={infoStyle}>-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Đến ngày:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={infoStyle}>
              {moment(contract?.endDate).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
        </Grid>

        {contract?.contractStatus === true ? null : (
          <Grid container sx={gridStyle}>
            <Grid item xs={11}>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontWeight: "700",
                  fontFamily: fontStyle,
                  fontSize: "18px",
                  color: "red",
                }}
              >
                *Hợp đồng không còn hiệu lực
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

import { Box, Grid, Typography } from "@mui/material";

// data
import { UserInfor } from "../../../app/models/userInfor";
import moment from "moment";

// interface
interface Props {
  employee: UserInfor | undefined;
}
const fontStyle = "Mulish";

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
export default function EditEmployeeInfo({ employee }: Props) {
  return (
    <Box sx={{ padding: "0 35px" }}>
      <Grid>
        <Typography
          sx={{
            color: "#246DD6",
            fontWeight: "600",
            fontSize: "30px",
            marginBottom: "8px",
            fontFamily: fontStyle,
          }}
        >
          Thông tin người lao động
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
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Họ và tên:</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={infoStyle}>
              {employee?.lastName} {employee?.firstName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={infoStyle}>{employee?.gender === false ? "Nữ" : "Nam"}</Typography>
          </Grid>
        </Grid>

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
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Sinh ngày:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={infoStyle}>{moment(employee?.dob).format("DD-MM-YYYY")}</Typography>
          </Grid>
        </Grid>

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
          <Grid item xs={2}>
            <Typography sx={headerStyle}>CMND|CCCD:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={infoStyle}>{employee?.citizenId}</Typography>
          </Grid>
        </Grid>

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
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Địa chỉ:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={infoStyle}>{employee?.address}</Typography>
          </Grid>
        </Grid>

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
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Số điện thoại:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={infoStyle}>{employee?.phone}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

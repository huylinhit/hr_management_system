import { Box, Grid, Typography } from "@mui/material";

// data
import { UserInfor } from "../../../app/models/userInfor";
import moment from "moment";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function EditEmployeeInfo({ employee }: Props) {
  return (
    <Box sx={{ padding: "0 35px" }}>
      <Grid>
        <Typography
          sx={{ color: "#246DD6", fontWeight: "600", fontSize: "25px", marginBottom: "8px" }}
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Họ và tên:</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.lastName} {employee?.firstName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.gender === false ? "Nữ" : "Nam"}
            </Typography>
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Sinh ngày:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {moment(employee?.dob).format("DD-MM-YYYY")}
            </Typography>
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>CMND|CCCD:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.citizenId} 
            </Typography>
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Địa chỉ:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.address}
            </Typography>
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Số điện thoại:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.phone} 
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

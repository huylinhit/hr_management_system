import { Box, Grid, Typography } from "@mui/material";

export default function DetailInfo() {
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Ngày sinh:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Phòng ban:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Ngày vào làm:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Quốc tịch:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>CMND|CCCD:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Số năm làm việc:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Tk ngân hàng:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Tên tài khoản:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
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
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Ngân hàng:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>Giới tính:</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

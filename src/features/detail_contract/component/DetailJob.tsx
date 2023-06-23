import { Box, Grid, Typography } from "@mui/material";

export default function DetailJob() {
  return (
    <Grid>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        1. Công việc, phòng ban và thời hạn hợp đồng
      </Typography>

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
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Phòng ban công tác:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {/* {employee.dob} */}
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Loại hợp đồng:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {/* {employee.citizenId}  */}
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
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Từ ngày:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {/* {employee.lastName} {employee.firstName} */}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              -
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Đến ngày:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {/* {employee.gender === 0 ? "Nữ" : "Nam"} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

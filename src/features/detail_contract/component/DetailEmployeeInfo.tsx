import { Box, Grid, Typography } from "@mui/material";

export default function DetailEmployeeInfo() {
  return (
    <Box sx={{ padding: "0 35px" }}>
      <Grid>
        <Typography
          sx={{ color: "#246DD6", fontWeight: "600", fontSize: "25px", marginBottom: "10px" }}
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
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "400" }}>
              
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

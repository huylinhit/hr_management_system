import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

export default function DetailAva() {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        maxWidth: "100%",
      }}
    >
      <Grid
        item
        xs={9}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Grid item xs={2}>
          <Avatar
            sx={{ bgcolor: "deepOrange", width: "120px", height: "120px" }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5">Nguyen Minh Hoang</Typography>
          <Typography>Nguyen Minh Hoang</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ maxWidth: "100%" }}
      >
        <Button variant="outlined">Xem hợp đồng nhân viên</Button>
      </Grid>
    </Grid>
  );
}

import { Container, Grid, Paper, Typography } from "@mui/material";

function TypeLeavetime() {
  return (
    <>
      <Container component={Paper} sx={{ mt: "24px" }}>
        <Grid container spacing={2} sx={{ mb: "3px" }}>
          <Grid item xs={4}>
            <Typography>Loại nghỉ phép</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>Nghỉ bệnh</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>Number of days</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>14</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TypeLeavetime;

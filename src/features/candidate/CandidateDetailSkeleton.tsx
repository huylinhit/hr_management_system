import { Avatar, Box, Container, Grid, Skeleton } from "@mui/material";

export default function CandidateDetailSkeleton() {
  return (
    <Box sx={{ minHeight: "1200px" }}>
      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <Skeleton variant="circular" animation="wave" width={200} height={200} sx={{mb:"30px"}} /> {/* Placeholder for avatar */}
        <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "80px" }} />
        {/* Placeholder for name */}
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" animation="wave" sx={{ width: "100%", height: "43px", mb:"10px" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

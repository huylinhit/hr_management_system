import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function DetailOvertimeFooter() {
  return (
    <Grid container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Grid item className="footer-btn">
        <Button variant="outlined" 
            startIcon={<ArrowBackIcon />}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item className="footer-btn">
        <Button variant="contained" >
          Cập nhật 
        </Button>
      </Grid>
    </Grid>
  );
}

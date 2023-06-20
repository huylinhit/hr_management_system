import { Box, Grid, Typography, Container, CssBaseline } from "@mui/material";

// style
import "./DetailEmployee.css";
import DetailAva from "./component/DetailAva";

export default function DetailEmployee() {
  return (
    <Box className="page-container">
      <Grid container className="page-title">
        <Typography>Thông tin nhân viên</Typography>
      </Grid>

      <Container>
        <Grid container className="page-content">
          <Grid item sx={{ width: "100%" }}>
            <DetailAva />
          </Grid>
          <CssBaseline />
          <Grid item sx={{ width: "100%" }}>
            <Typography>abc</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

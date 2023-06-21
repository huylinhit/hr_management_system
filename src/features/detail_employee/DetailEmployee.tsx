import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  IconButton,
} from "@mui/material";
import { LuEdit } from "react-icons/lu";

// style
import "./DetailEmployee.css";

// component
import DetailAva from "./component/DetailAva";
import DetailContact from "./component/DetailContact";
import DetailInfo from "./component/DetailInfo";
import DetailSkill from "./component/DetailSkill";

export default function DetailEmployee() {
  return (
    <Box className="page-container-detail-employee">
      <Grid container className="page-title">
        <Typography>Thông tin nhân viên</Typography>
      </Grid>

      <Container>
        <Grid
          container
          sx={{
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            padding: "20px 45px 40px 45px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            <Grid item xs={12}></Grid>
            <Grid item xs={0}>
              <IconButton aria-label="delete" size="small">
                <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <DetailAva />
          </Grid>

          <Divider />

          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "30px 30px 0 30px",
            }}
          >
            <Grid item xs={6}>
              <DetailInfo />
            </Grid>
            <Grid item xs={6}>
              <DetailContact />
              <DetailSkill />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

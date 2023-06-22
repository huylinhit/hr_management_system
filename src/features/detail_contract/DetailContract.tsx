import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { LuEdit } from "react-icons/lu";

// component
import DetailContractInfo from "./component/DetailContractInfo";
import DetailEmployeeInfo from "./component/DetailEmployeeInfo";

export default function DetailContract() {
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid container>
        <Typography
          sx={{
            padding: "5px 0 15px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Thông tin hợp đồng
        </Typography>
        <IconButton aria-label="delete" sx={{ padding: "10px 10px 20px 10px" }}>
          <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
        </IconButton>
      </Grid>

      <Container
        sx={{
          boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          padding: "35px",
        }}
      >
        <Grid
          container
          sx={{
            borderRadius: "15px",
            border: "1px solid #E2E1E5",
            background: "#FFF",
            margin: "0 10px",
            maxWidth: "1100px",
          }}
        >
          <Grid
            item
            sx={{ width: "100%", paddingTop: "20px", paddingBottom: "15px" }}
          >
            <DetailEmployeeInfo />
          </Grid>

          <Grid
            item
            sx={{ width: "100%", paddingTop: "20px", paddingBottom: "15px" }}
          >
            <DetailContractInfo />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

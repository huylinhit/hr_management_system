import { useState } from "react";
import { Box, Grid, Typography, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { LuEdit } from "react-icons/lu";

// component
import DetailAva from "./component/DetailAva";
import DetailContact from "./component/DetailContact";
import DetailInfo from "./component/DetailInfo";
import DetailSkill from "./component/DetailSkill";

// data
import { STAFF } from "../../app/store/data";
import { Employee } from "../../app/models/employee";

export default function DetailEmployee() {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  const [staff, setStaff] = useState<Employee>(STAFF);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
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
          Thông tin nhân viên
        </Typography>
        <IconButton
          aria-label="delete"
          sx={{ padding: "10px 10px 20px 10px" }}
          component={Link}
          to={`/editemployee/${staff.staffId}`}
        >
          <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
        </IconButton>
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
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "15px" }}
          >
            <DetailAva staff={staff} />
          </Grid>

          <hr
            style={{
              background: "#E2E1E5",
              color: "#E2E1E5",
              borderColor: "#E2E1E5",
              height: "1px",
              width: "1000px",
            }}
          />
          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "15px 30px 0 30px",
            }}
          >
            <Grid item xs={5}>
              <DetailInfo staff={staff} />
            </Grid>

            <Grid item xs={1}>
              <hr
                style={{
                  background: "#E2E1E5",
                  color: "#E2E1E5",
                  borderColor: "#E2E1E5",
                  height: "350px",
                  width: "1px",
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <DetailContact staff={staff} />
              <DetailSkill staff={staff} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

// component
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data

// api
import { LeaveLog } from "../../app/models/leaveLog";
import axios from "axios";

export default function DetailLeave() {
  // -------------------------- VAR -----------------------------
  const { id } = useParams();

  const [logLeave, setlogLeave] = useState<LeaveLog>();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/log-leaves/${id}/staffs/2`).then((response) =>    
    setlogLeave(response.data)).catch(e =>{
      console.log(e)
        alert("gfffff");
  
      });
   
  }, [id]);
  console.log(logLeave)

  // -------------------------- MAIN ----------------------------

  return (
    <>
    {/* {logLeave &&( */}
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid>
        <Typography
          sx={{
            padding: "5px 0 15px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Phản hồi đơn xin nghỉ phép
        </Typography>
      </Grid>

      <Container>
        <Grid
          container
          sx={{
            border: "1px solid #E2E1E5",
            backgroundColor: "white",
            borderRadius: "30px",
            padding: "20px 45px",
            margin: "5px 0",
          }}
        >
          <Grid item sx={{ width: "100%", padding: "30px 50px 0 50px" }}>
            {/* <DetailLeaveContent logLeave={logLeave} staff={staff} types={types} /> */}
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailLeaveFooter />
          </Grid>
        </Grid>
      </Container>
    </Box>
   
    {/* )} */}
    </>
  );
}

import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data
import { STAFF, LEAVELOG } from "../../app/store/data";

// api
import { Employee } from "../../app/models/employee";
import { LeaveLog } from "../../app/models/leaveLog";

export default function DetailLeave() {
  // -------------------------- VAR -----------------------------
  const [logLeave, setLogLeave] = useState<LeaveLog>(LEAVELOG);
  // const [types, setTypes] = useState<LeaveType[]>(LEAVETYPE);

  const dispatch = useAppDispatch();
  // const [form] = Form.useForm();
  // -------------------------- STATE ---------------------------
  const [staff, setStaff] = useState<Employee>(STAFF);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
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
  );
}

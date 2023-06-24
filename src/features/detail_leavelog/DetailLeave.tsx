import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailLeaveContent from "./component/DetailLeaveContent";
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data
import { STAFF, OTLOG, OTTYPE } from "../../app/store/data";

// api
import { Employee } from "../../app/models/employee";
import { LogOT } from "../../app/models/LogOT";
import { OtType } from "../../app/models/otType";

export default function DetailLeave() {
  // -------------------------- VAR -----------------------------
  const [logOt, setLogOt] = useState<LogOT>(OTLOG);
  const [types, setTypes] = useState<OtType[]>(OTTYPE);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [form] = Form.useForm();
  // -------------------------- STATE ---------------------------
  const [staff, setStaff] = useState<Employee>(STAFF);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const onSubmit = (data: FieldValues) => {
    console.log("abc");

    navigate("/viewot");
  };
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
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            borderRadius: "30px",
            padding: "20px 45px",
            margin: "5px 20px",
          }}
        >
          <Grid item sx={{ width: "100%", padding: "30px 50px 0 50px" }}>
            <DetailLeaveContent logOt={logOt} staff={staff} types={types} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailLeaveFooter />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

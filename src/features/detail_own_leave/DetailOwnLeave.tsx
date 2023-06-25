import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailLeaveContent from "./component/DetailLeaveContent";
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data
import { OTLOG, OTTYPE } from "../../app/store/data";

// api
import { LogOT } from "../../app/models/LogOT";
import { OtType } from "../../app/models/otType";

export default function DetailOwnLeave() {
  // -------------------------- VAR -----------------------------
  const [logOt, setLogOt] = useState<LogOT>(OTLOG);
  const [types, setTypes] = useState<OtType[]>(OTTYPE);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const onSubmit = (data: FieldValues) => {
    console.log("abc");

    // navigate("/viewot");
  };
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid>
        <Typography
          sx={{
            paddingTop: "5px",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >Đơn xin nghỉ phép</Typography>
        <Typography
          sx={{
            paddingBottom: "15px",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "20px",
          }}
        >Mã đơn - {logOt.otLogId}</Typography>
      </Grid>

      <Container>
        <Grid
          container
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            borderRadius: "30px",
            padding: "20px 45px",
            margin: "5px 0",
          }}  
        >
          <Grid item sx={{ width: "100%", padding: "30px 50px 0 50px" }}>
            <DetailLeaveContent logOt={logOt} types={types} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailLeaveFooter logOt={logOt}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

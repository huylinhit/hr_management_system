import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

//style
import "./DetailOvertime.css";

// component
import DetailOvertimeContent from "./component/DetailOvertimeContent";
import DetailOvertimeFooter from "./component/DetailOvertimeFooter";

// data
import { STAFF, OTLOG, OTTYPE } from "../../app/store/data";

// api
import { UserInfor } from "../../app/models/userInfor";
import { LogOT } from "../../app/models/LogOT";
import { OtType } from "../../app/models/otType";

export default function DetailOvertime() {
  // -------------------------- VAR -----------------------------
  const [logOt, setLogOt] = useState<LogOT>(OTLOG);
  const [types, setTypes] = useState<OtType[]>(OTTYPE);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  // -------------------------- STATE ---------------------------
  const [staff, setStaff] = useState<UserInfor>(STAFF);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const onSubmit = (data: FieldValues) => {
    console.log("abc");

    navigate("/viewot");
  };
  // -------------------------- MAIN ----------------------------
  return (
    <Box className="page-container">
      <Grid container className="page-title">
        <Typography>Phản hồi đơn làm thêm giờ</Typography>
      </Grid>

      <Container>
        <Grid
          container
          onSubmit={handleSubmit(onSubmit)}
          className="page-content"
        >
          <Grid item sx={{ width: "100%", padding: "50px 50px 0 50px" }}>
            <DetailOvertimeContent logOt={logOt} staff={staff} types={types} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailOvertimeFooter />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

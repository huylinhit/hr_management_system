import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

//style
import "./DetailLeave.css";

// component
import DetailLeaveContent from "./component/DetailLeaveContent";
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data
import { STAFF, OTLOG, OTTYPE } from "../../app/store/data";

// api
import { Employee } from "../../app/models/employee";
import { LogOT } from "../../app/models/LogOT";
import { OtType } from "../../app/models/otType";
import { Form } from "antd";

export default function DetailLeave() {
  // -------------------------- VAR -----------------------------
  const [logOt, setLogOt] = useState<LogOT>(OTLOG);
  const [types, setTypes] = useState<OtType[]>(OTTYPE);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
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
    <Box className="page-container">
      <Grid container className="page-title">
        <Typography>Phản hồi đơn xin nghỉ phép</Typography>
      </Grid>

      <Grid container className="page-content">
        <Form autoComplete="off" form={form}>
          <Grid item sx={{ width: "100%", padding: "50px 50px 0 50px" }}>
            <DetailLeaveContent logOt={logOt} staff={staff} types={types} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailLeaveFooter />
          </Grid>
        </Form>
      </Grid>
    </Box>
  );
}

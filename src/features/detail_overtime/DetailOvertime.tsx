import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailOvertimeContent from "./component/DetailOvertimeContent";
import DetailOvertimeFooter from "./component/DetailOvertimeFooter";

// data
import { STAFF, OTLOG, OTTYPE } from "../../app/store/data";

// api
import { Employee } from "../../app/models/employee";
// import { LogOT } from "../../app/models/LogOT";
import { OtType } from "../../app/models/otType";
import axios from "axios";
import { LogOvertime } from "../../app/models/logOvertime";

export default function DetailOvertime() {
  // -------------------------- VAR -----------------------------
  // const [logOt, setLogOt] = useState<LogOT>(OTLOG);
  const [types, setTypes] = useState<OtType[]>(OTTYPE);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  // -------------------------- STATE ---------------------------
  const [staff, setStaff] = useState<Employee>(STAFF);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const onSubmit = (data: FieldValues) => {
    console.log("abc");

    navigate("/viewot");
  };

  
  const [logOt, setLogOt] = useState<LogOvertime>();
  useEffect(() => {
    axios.get(`/logots/${id}`).then((response) => setLogOt(response.data));
  }, [id]);
  console.log(logOt);

  // -------------------------- MAIN ----------------------------
  return (

   <>
   {logOt &&(
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
          Phản hồi đơn làm thêm giờ
        </Typography>
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
            <DetailOvertimeContent logOt={logOt} staff={staff} types={types} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {/* <DetailOvertimeFooter /> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
   )}
    
   </>
  );
}

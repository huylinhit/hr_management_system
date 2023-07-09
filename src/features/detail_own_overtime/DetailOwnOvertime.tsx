import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailOvertimeContent from "./component/DetailOvertimeContent";
import DetailOvertimeFooter from "./component/DetailOvertimeFooter";

// data
import { OTLOG, OTTYPE } from "../../app/store/data";

// api
// import { LogOt } from "../../app/models/LogOT";
import { OtType } from "../../app/models/otType";
import axios from "axios";
import { LogOvertime } from "../../app/models/logOvertime";

export default function DetailOwnOvertime() {
  // -------------------------- VAR -----------------------------
  // const [logOt, setLogOt] = useState<LogOT>(OTLOG);
  const [types, setTypes] = useState<OtType[]>(OTTYPE);

  const { id } = useParams();

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
  const [logOt, setLogOt] = useState<LogOvertime>();
  useEffect(() => {
    axios.get(`/logots/${id}`).then((response) => setLogOt(response.data));
  }, [id]);
  console.log(logOt);

  // -------------------------- MAIN ----------------------------
  return (
    <>
      {logOt && (
        <Box
          sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}
        >
          <Grid>
            <Typography
              sx={{
                paddingTop: "5px",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "30px",
                lineHeight: "39px",
              }}
            >
              Đơn làm thêm giờ
            </Typography>
            <Typography
              sx={{
                paddingBottom: "15px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "20px",
              }}
            >
              Mã đơn  - {logOt.otLogId}
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
                <DetailOvertimeContent logOt={logOt} types={types} />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <DetailOvertimeFooter logOt={logOt} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}

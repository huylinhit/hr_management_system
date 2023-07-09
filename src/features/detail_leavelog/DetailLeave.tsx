import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data

// api
import { Employee } from "../../app/models/employee";
import { LeaveLog } from "../../app/models/leaveLog";
import { LeaveType } from "../../app/models/leaveType";
import axios from "axios";

export default function DetailLeave() {
  // -------------------------- VAR -----------------------------
  // const [logLeave, setLogLeave] = useState<LeaveLog>(LEAVELOG);
  // const [types, setTypes] = useState<LeaveType[]>(LEAVETYPE);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  // const [form] = Form.useForm();
  // -------------------------- STATE ---------------------------
  // const [staff, setStaff] = useState<Employee>(STAFF);

  console.log(staff.staffId)
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // const onSubmit = (data: FieldValues) => {
  //   console.log("abc");

  //   navigate("/myleavelist");
  // };

  // const [list, setList] = useState<LeaveLog[]>();

  // axios.defaults.baseURL = "http://localhost:5000/api";
  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get(`/log-leaves/${logLeave?.leaveLogId}/staffs/${staff.staffId}`)
  //     .then((response) => {
  //       setList(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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

import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

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
  const [types, setTypes] = useState<OtType[]>(OTTYPE)
  // -------------------------- STATE ---------------------------
  const [staff, setStaff] = useState<UserInfor>(STAFF);
  const [finish, setFinish] = useState(false)
  const [formValue, setFormValue] = useState({})
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------

  // -------------------------- MAIN ----------------------------
  return (
    <Box className="page-container">
      <Grid container className="page-title">
        <Typography>Phản hồi đơn làm thêm giờ</Typography>
      </Grid>
      <Grid container className="page-content">
        <Grid item sx={{ width: "100%", padding: "20px 70px" }}>
          <DetailOvertimeContent logOt={logOt} staff={staff} types={types} 
                                 setFormValue={setFormValue} formValue={formValue} finish={finish} />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <DetailOvertimeFooter setFinish={setFinish} />
        </Grid>
      </Grid>
    </Box>
  );
}

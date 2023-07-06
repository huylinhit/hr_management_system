import { useEffect, useState } from "react";
import { Box, Grid, Typography, Container, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

// component
import EditAva from "./component/EditAva";
import EditContact from "./component/EditContact";
import EditInfo from "./component/EditInfo";
import EditSkill from "./component/EditSkill";
import EditEmployeeFooter from "./component/EditEmployeeFooter";
import ConfirmSubmitDialog from "./dialog/ConfirmSubmitDialog";

// data
import {
  employeeSelectors,
  fetchEmployeeAsync,
} from "../../app/store/employee/employeeSlice";


export default function EditEmployee() {
  // -------------------------- VAR -----------------------------
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const employee = useAppSelector((state) =>
    employeeSelectors.selectById(state, id!)
  );
  // -------------------------- STATE ---------------------------
  const [form, setForm] = useState({
    lastName: employee?.lastName,
    firstName: employee?.firstName,
    email: employee?.email,
    deparatmentId: employee?.departmentId,
    dob: employee?.dob,
    phone: employee?.phone,
    gender: employee?.gender,
    address: employee?.address,
    country: employee?.country,
    citizenId: employee?.citizenId,
    bankAccount: employee?.bankAccount,
    bankAccountName: employee?.bankAccountName,
    bank: employee?.bank,
    accountStatus: employee?.accountStatus,
  });
  const [skillForm, setSkillForm] = useState([])
  const [openSubmit, setOpenSubmit] = useState(false);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchEmployeeAsync(Number(id)));
  }, [dispatch]);
  // -------------------------- FUNCTION ------------------------
  const handleSubmit = () => {
    setOpenSubmit(true);
  };
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid container>
        <Typography
          sx={{
            padding: "5px 0 15px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Chỉnh sửa thông tin nhân viên
        </Typography>
      </Grid>

      <Container>
        <Grid
          container
          sx={{
            border: "1px solid #E2E1E5",
            borderRadius: "20px",
            backgroundColor: "white",
            padding: "20px 45px 20px 45px",
          }}
        >
          <Grid
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "15px" }}
          >
            <EditAva employee={employee} setForm={setForm} />
          </Grid>

          <hr
            style={{
              background: "#E2E1E5",
              color: "#E2E1E5",
              borderColor: "#E2E1E5",
              height: "1px",
              width: "1000px",
            }}
          />
          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "15px 30px 0 30px",
            }}
          >
            <Grid item xs={5}>
              <EditInfo employee={employee} setForm={setForm} />
            </Grid>

            <Grid item xs={1}>
              <hr
                style={{
                  background: "#E2E1E5",
                  color: "#E2E1E5",
                  borderColor: "#E2E1E5",
                  height: "610px",
                  width: "1px",
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <EditContact employee={employee} setForm={setForm} />
              <EditSkill employee={employee} setSkillForm={setSkillForm}/>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <EditEmployeeFooter
              employee={employee}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>

        <ConfirmSubmitDialog
          open={openSubmit}
          setOpen={setOpenSubmit}
          id={id}
          item={form}
        />
      </Container>
    </Box>
  );
}

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
import { employeeSelectors, fetchEmployeeAsync } from "../../app/store/employee/employeeSlice";
import { staffSkillsSelectors, fetchStaffSkillsAsync } from "../skills/staffSkillSlice";

export default function EditEmployee() {
  // -------------------------- VAR -----------------------------
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // -------------------------- REDUX ---------------------------
  const employee = useAppSelector((state) => employeeSelectors.selectById(state, id!));

  const skills = useAppSelector((state: any) =>
    staffSkillsSelectors.selectAll(state).filter((s) => s.staffId == employee?.staffId)
  );

  let skillUpdate = [{ uniqueId: 0, level: "", skillName: "" }];
  skillUpdate = skills.map((skill) => {
    return {
      uniqueId: skill.uniqueId,
      level: skill.level,
      skillName: skill.skillName,
    };
  });
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
  const [skillForm, setSkillForm] = useState(skillUpdate);
  const [openSubmit, setOpenSubmit] = useState(false);
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchEmployeeAsync(Number(id)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStaffSkillsAsync());
  }, [dispatch]);
  // -------------------------- FUNCTION ------------------------
  const handleSubmit = () => {
    setOpenSubmit(true);
  };
  // -------------------------- MAIN ----------------------------
  return (
    <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
      <Grid
        container
        sx={{
     
          borderRadius: "20px",
          backgroundColor: "white",
        }}
        xs={12}
      >
        <Grid item sx={{ width: "100%", paddingTop: "10px", paddingBottom: "15px" }}>
          <EditAva employee={employee} setForm={setForm} />
          <Box sx={{ borderBottom: "2px solid #333333", mb: "10px", mt: "1%" }}></Box>
        </Grid>

        <Grid item xs={12}>
          {/* <EditInfo employee={employee} setForm={setForm} /> */}
        </Grid>

        <Grid item xs={12}>
          {/* <EditContact employee={employee} setForm={setForm} /> */}
          <EditSkill
            employee={employee}
            skills={skills}
            skillForm={skillForm}
            setSkillForm={setSkillForm}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <EditEmployeeFooter employee={employee} handleSubmit={handleSubmit} />
        </Grid>
      </Grid>

      <ConfirmSubmitDialog
        open={openSubmit}
        setOpen={setOpenSubmit}
        id={id}
        item={form}
        skillForm={skillForm}
      />
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Box, Stepper, Typography, Step, StepLabel, Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// component
import NewAccount from "./component/NewAccount";
import NewStaff from "./component/NewStaff";

// data
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { departmentSelectors, fetchDepartmentsAsync } from "../department/departmentSlice";
import agent from "../../app/api/agent";
import { fetchUserInforsAsync } from "../department/userInforSlice";
import { setHeaderTitle } from "../../app/layout/headerSlice";
const fontStyle = "Mulish";
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  mb: "5px",
};
export default function AddNewEmployee() {
  // -------------------------- VAR -----------------------------
  const stepName = ["Tạo tài khoản", "Thông tin cá nhân"];
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const location = useLocation();
  // -------------------------- STATE ---------------------------
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [isValid, setIsValid] = useState(true);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    email: "",
    lastName: "",
    firstName: "",
    dob: "2000-01-01",
    phone: "",
    gender: false,
    address: "",
    country: "",
    citizenId: "",
    departmentId: 1,
    isManager: false,
    bankAccount: "",
    bankAccountName: "",
    bank: "",
  });
  // -------------------------- REDUX ---------------------------
  const departments = useAppSelector((state) => departmentSelectors.selectAll(state));
  const { departmentsLoaded } = useAppSelector((state) => state.department);
  // -------------------------- EFFECT --------------------------
  //Set header
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Thêm nhân viên", path: "/staffs/add" }]));
  }, [dispatch, location]);

  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
  }, [dispatch, departmentsLoaded]);
  // -------------------------- FUNCTION ------------------------
  const areAllFieldsNotNull = (object: any): boolean => {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (
          object[key] === "" ||
          object[key] === 0 ||
          confirmPwd === "" ||
          confirmPwd !== userForm.password
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(step)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(step);
    }

    setStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    await agent.Account.register(userForm)
      .then((response) => {
        dispatch(fetchUserInforsAsync());
        toast.success("Đã thêm nhân viên thành công");
        history("/staffs");
      })
      .catch((error) => {
        if (Array.isArray(error)) {
          error.forEach((errorMessage: string) => {
            toast.error(errorMessage);
            console.log(errorMessage);
          });
        }
        setStep(0);
      });
  };
  // -------------------------- MAIN ----------------------------
  const disabled = !areAllFieldsNotNull(userForm);

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "white",
        padding: "15px",
        height: "1200px",
      }}
    >
      <Stepper activeStep={step}>
        {stepName.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel style={headerStyle} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <NewAccount
              setUserForm={setUserForm}
              userForm={userForm}
              confirmPwd={confirmPwd}
              setConfirmPwd={setConfirmPwd}
            />
          )}
          {step === 1 && (
            <NewStaff setUserForm={setUserForm} departments={departments} userForm={userForm} />
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={step === 0}
              onClick={handleBack}
              sx={{ mr: 1, fontSize: "17px", borderRadius: "10px" }}
            >
              Quay về
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              disabled={step === 1 ? disabled : false}
              variant="contained"
              size="small"
              sx={{ fontSize: "17px", borderRadius: "10px" }}
              onClick={step === 1 ? handleSubmit : handleNext}
            >
              {step === stepName.length - 1 ? "Hoàn thành" : "Tiếp"}
            </Button>
          </Box>
        </form>
      </React.Fragment>
    </Container>
  );
}

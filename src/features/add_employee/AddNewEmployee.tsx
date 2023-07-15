import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
  Container,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  departmentSelectors,
  fetchDepartmentsAsync,
} from "../department/departmentSlice";
import agent from "../../app/api/agent";

// component
import NewAccount from "./component/NewAccount";
import NewStaff from "./component/NewStaff";
import { useNavigate } from "react-router-dom";

export default function AddNewEmployee() {
  // -------------------------- VAR -----------------------------
  const stepName = ["Tạo tài khoản", "Thông tin cá nhân"];
  const dispatch = useAppDispatch();
  const history = useNavigate();
  // -------------------------- STATE ---------------------------
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [isValid, setIsValid] = useState(true);
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    email: "",
    lastName: "",
    firstName: "",
    dob: "",
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
  const departments = useAppSelector((state) =>
    departmentSelectors.selectAll(state)
  );
  const { departmentsLoaded } = useAppSelector((state) => state.department);
  // -------------------------- EFFECT --------------------------

  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
  }, [dispatch, departmentsLoaded]);
  // -------------------------- FUNCTION ------------------------
  const areAllFieldsNotNull = (object: any): boolean => {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] === "" || object[key] === 0) {
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
    console.log(userForm);
    await agent.Account.register(userForm)
      .then((response) => {
        console.log("Add new employee successfully: ", response);
        setStep((prevActiveStep) => prevActiveStep + 1);
        setTimeout(() => history("/staffs"), 2000);
      })
      .catch((error) => {
        console.error("Error add new employee ", error);
        setStep(0);
      });
  };
  // -------------------------- MAIN ----------------------------
  const disabled = !areAllFieldsNotNull(userForm);

  return (
    <Box sx={{ padding: "10px 30px 0 30px", width: "calc(100vh - 240)" }}>
      <Typography
        sx={{
          padding: "5px 0",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "30px",
          lineHeight: "39px",
        }}
      >
        Thêm nhân viên mới
      </Typography>

      <Container
        sx={{
          backgroundColor: "white",
          padding: "15px",
        }}
      >
        <Box sx={{ width: "100%", paddingBottom: "15px" }}>
          <Stepper activeStep={step}>
            {stepName.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {step === stepName.length && isValid ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, fontSize: "20px" }}>
                Bạn đã hoàn thành các bước
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                {step === 0 && (
                  <NewAccount setUserForm={setUserForm} userForm={userForm} />
                )}
                {step === 1 && (
                  <NewStaff
                    setUserForm={setUserForm}
                    departments={departments}
                    userForm={userForm}
                  />
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
          )}
        </Box>
      </Container>
    </Box>
  );
}

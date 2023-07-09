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
import NewAccount from "./component/NewAccount";
import NewStaff from "./component/NewStaff";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  departmentSelectors,
  fetchDepartmentsAsync,
} from "../department/departmentSlice";
import NewContract from "./component/NewContract";
import { allowanceTypeSelectors, fetchAllowanceTypesAsync } from "../../app/store/allowanceType/allowanceTypeSlice";

export default function AddNewEmployee() {
  // -------------------------- VAR -----------------------------
  const stepName = ["Tạo tài khoản", "Thông tin cá nhân", "Lưu hợp đồng"];
  const dispatch = useAppDispatch();
  // -------------------------- STATE ---------------------------
  const [step, setStep] = useState(2);
  const [skipped, setSkipped] = useState(new Set<number>());
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
    departmentId: 0,
    isManager: false,
    bankAccount: "",
    bankAccountName: "",
    bank: "",
  });
  const [contractForm, setContractForm] = useState({
    startDate: "",
    endDate: "",
    taxableSalary: 0,
    salary: 0,
    workDatePerWeek: 0,
    note: "",
    noOfDependences: 0,
    contractTypeId: 0,
    salaryType: "",
    paidDateNote: "",
    contractFile: "",
    contractStatus: true,
  });
  const [allowanceForm, setAllowanceForm] = useState([
    { allowanceTypeId: 0, allowanceSalary: 0 },
  ]);
  // -------------------------- REDUX ---------------------------
  const departments = useAppSelector((state) =>
    departmentSelectors.selectAll(state)
  );
  const { departmentsLoaded } = useAppSelector(
    (state) => state.department
  );
  const { allowanceTypesLoaded } = useAppSelector((state) => state.allowanceType)
  console.log(departments);
  
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
    if (!allowanceTypesLoaded) dispatch(fetchAllowanceTypesAsync())
  }, [dispatch, departmentsLoaded, allowanceTypesLoaded]);
  // -------------------------- FUNCTION ------------------------
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

    let isInfoValid = false;
    switch (step) {
      case 0:
        if (userForm.username.trim() !== "") {
          isInfoValid = true;
        }
        break;
      case 1:
        if (userForm.address.trim() !== "") {
          isInfoValid = true;
        }
        break;
      default:
        isInfoValid = true;
        break;
    }

    if (isInfoValid) {
      setStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      alert("Bạn chưa hoàn thành bước 1");
    }
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {};
  // -------------------------- MAIN ----------------------------
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

          {step === stepName.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, fontSize: "20px" }}>
                Bạn đã hoàn thành các bước
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                {step === 0 && <NewAccount setUserForm={setUserForm} />}
                {step === 1 && (
                  <NewStaff
                    setUserForm={setUserForm}
                    departments={departments}
                  />
                )}
                {step === 2 && <NewContract setUserForm={setUserForm} allowanceForm={allowanceForm} setAllowanceForm={setAllowanceForm} />}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={step === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, fontSize: "20px" }}
                  >
                    Quay về
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button sx={{ fontSize: "20px" }} onClick={handleNext}>
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

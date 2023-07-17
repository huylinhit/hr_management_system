import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

// component
import LoadingComponent from "../../app/layout/LoadingComponent";
import DetailContractFooter from "./component/EditContractFooter";
import DetailContractInfo from "./component/EditContractInfo";
import DetailEmployeeInfo from "./component/EditEmployeeInfo";
import ConfirmSubmitDialog from "./dialog/ConfirmSubmitDialog";

// data
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  employeeSelectors,
  fetchEmployeeAsync,
} from "../../app/store/employee/employeeSlice";
import {
  contractSelectors,
  fetchContractAsync,
} from "../../app/store/contract/contractSlice";
import { allowanceTypeSelectors, fetchAllowanceTypesAsync } from "../../app/store/allowanceType/allowanceTypeSlice";

export default function EditContract() {
  // -------------------------- VAR -----------------------------
  const { id, staffid } = useParams();
  const dispatch = useAppDispatch();
  // -------------------------- REDUX ---------------------------
  const employee = useAppSelector((state) =>
    employeeSelectors.selectById(state, Number(staffid))
  );
  const { employeesLoaded } = useAppSelector((state) => state.employee);

  const contract = useAppSelector((state: any) =>
    contractSelectors.selectById(state, Number(staffid))
  );
  const { status, contractsLoaded } = useAppSelector((state) => state.contract);

  const allowanceUpdate = contract?.allowances.map((allowance) => {
    return {
      allowanceId: allowance.allowanceId,
      allowanceTypeId: allowance.allowanceTypeId,
      allowanceSalary: allowance.allowanceSalary,
    };
  });
  // -------------------------- STATE ---------------------------
  const [contractForm, setContractForm] = useState({
    startDate: contract?.startDate,
    endDate: contract?.endDate,
    taxableSalary: contract?.taxableSalary,
    salary: contract?.salary,
    workDatePerWeek: contract?.workDatePerWeek,
    note: contract?.note,
    noOfDependences: contract?.noOfDependences,
    contractTypeId: contract?.contractTypeId,
    salaryType: contract?.salaryType,
    paidDateNote: contract?.paidDateNote,
    contractFile: contract?.contractFile,
    contractStatus: contract?.contractStatus,
  });
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [allowanceForm, setAllowanceForm] =
    useState(allowanceUpdate);
  const { allowanceTypesLoaded } = useAppSelector((state) => state.allowanceType);
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!employeesLoaded) dispatch(fetchEmployeeAsync(Number(staffid)));
    if (!contractsLoaded) dispatch(fetchContractAsync(Number(staffid)));
  }, [dispatch, employeesLoaded, contractsLoaded]);

  useEffect(() => {
    if (!allowanceTypesLoaded) dispatch(fetchAllowanceTypesAsync());
  }, [dispatch, allowanceTypesLoaded]);
  // -------------------------- FUNCTION ------------------------
  if (status.includes("pending"))
    return <LoadingComponent message="Loading..." />;
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid container>
        <Typography
          sx={{
            padding: "5px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Chỉnh sửa hợp đồng
        </Typography>
      </Grid>

      <Container
        sx={{
          backgroundColor: "white",
          padding: "15px",
        }}
      >
        <Grid
          container
          sx={{
            borderRadius: "15px",
            border: "1px solid #E2E1E5",
            background: "#FFF",
            margin: "0 10px",
            maxWidth: "1085px",
            padding: "10px 20px",
          }}
        >
          <Grid item sx={{ width: "100%", paddingTop: "25px" }}>
            <DetailEmployeeInfo employee={employee} />
          </Grid>

          <Grid
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "25px" }}
          >
            <DetailContractInfo
              contract={contract}
              employee={employee}
              setContractForm={setContractForm}
              allowanceForm={allowanceForm}
              setAllowanceForm={setAllowanceForm}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            margin: "0 10px",
            padding: "30px 20px 0 30px",
          }}
        >
          <DetailContractFooter
            contract={contract}
            staffid={staffid}
            setOpenSubmitDialog={setOpenSubmitDialog}
          />
        </Grid>
      </Container>

      <ConfirmSubmitDialog
        open={openSubmitDialog}
        setOpen={setOpenSubmitDialog}
        contractId={contract?.contractId}
        staffId={contract?.staffId}
        item={contractForm}
        allowanceForm={allowanceForm}
      />
    </Box>
  );
}

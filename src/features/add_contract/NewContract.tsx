import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// component
import FormContent from "./component/FormContent";
import FormFooter from "./component/FormFooter";
import agent from "../../app/api/agent";

// data
import { fetchContractsAsync, setContractAdded } from "../../app/store/contract/contractSlice";
import { useAppDispatch } from "../../app/store/configureStore";

export default function NewContract() {
  // -------------------------- VAR -----------------------------
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useAppDispatch();
  // -------------------------- REDUX ---------------------------
  // -------------------------- STATE ---------------------------
  const [contractForm, setContractForm] = useState({
    startDate: "",
    endDate: "",
    taxableSalary: 0,
    salary: 0,
    workDatePerWeek: 0,
    note: "",
    noOfDependences: 0,
    contractTypeId: 1,
    salaryType: "Gross To Net",
    paidDateNote: "",
    contractFile: "",
    contractStatus: true,
  });
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const areAllFieldsNotNull = (object: any): boolean => {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] === "" || object[key] === 0) {
          if (
            key !== "paidDateNote" &&
            key !== "contractFile" &&
            key !== "note" &&
            key !== "noOfDependences"
          ) {
            if (!(key === "endDate" && contractForm.contractTypeId === 2))
              return false;
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    console.log(contractForm);
    agent.Contract.create(Number(id), contractForm)
      .then((response) => {
        console.log("Add new contract successfully: ", response);
        dispatch(fetchContractsAsync())
        toast.success("Đã thêm hợp đồng thành công");
        history(`/staffs`)
      })
      .catch((error) => {
        if (Array.isArray(error)) {
          error.forEach((errorMessage: string) => {
            toast.error(errorMessage);
            console.log(errorMessage);
          });
        }
      });
  };
  // -------------------------- MAIN ----------------------------
  const disabled = !areAllFieldsNotNull(contractForm);

  return (
    <Box sx={{ padding: "10px 40px 30px 40px", width: "calc(100vh - 240)" }}>
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
          Thêm hợp đồng
        </Typography>
      </Grid>

      <Grid
        container
        sx={{
          border: "solid 1px rgba(226, 225, 229, 1)",
          borderRadius: "10px",
          padding: "30px 0",
          marginTop: "20px",
        }}
      >
        <FormContent
          contractForm={contractForm}
          setContractForm={setContractForm}
        />
      </Grid>

      <Grid
        container
        sx={{
          padding: "30px 0",
        }}
      >
        <FormFooter
          id={Number(id)}
          handleSubmit={handleSubmit}
          disabled={disabled}
        />
      </Grid>
    </Box>
  );
}

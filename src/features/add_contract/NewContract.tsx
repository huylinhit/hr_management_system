import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// component
import FormContent from "./component/FormContent";
import FormFooter from "./component/FormFooter";
import agent from "../../app/api/agent";

export default function NewContract() {
  // -------------------------- VAR -----------------------------
  const { id } = useParams();
  const history = useNavigate();
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
    salaryType: "",
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
        setTimeout(() => history(`/staffs`), 2000);
      })
      .catch((error) => {
        console.error("Error add new contract ", error);
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

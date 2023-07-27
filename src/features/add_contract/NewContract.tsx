import { useState } from "react";
import { Box, Dialog, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// component
import FormContent from "./component/FormContent";
import FormFooter from "./component/FormFooter";
import agent from "../../app/api/agent";

// data
import {
  fetchContractsAsync,
  setContractAdded,
} from "../../app/store/contract/contractSlice";
import { useAppDispatch } from "../../app/store/configureStore";
interface Props {
  open: boolean;
  onClose: () => void;
}
export default function NewContract({ open, onClose }: Props) {
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
    workDatePerWeek: 5,
    note: "",
    noOfDependences: 0,
    contractTypeId: 1,
    salaryType: "Gross To Net",
    contractFile: "",
    createAt: "",
    responseId: 0,
    changeAt: "",
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
            if (!(key === "endDate" && contractForm.contractTypeId === 2)) return false;
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (contractForm.contractTypeId === 2) {
      setContractForm((prevForm: any) => ({
        ...prevForm,
        endDate: "",
      }))
    }
    // -----------
    const currentDateTime = new Date();
    const submitTime = currentDateTime.toLocaleString();
    setContractForm((prevFormData: any) => ({
      ...prevFormData,
      createAt: submitTime,
    }));
    // ------------
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
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <Box sx={{ width: "calc(100vh - 240)" }}>
        <Grid
          container
          sx={{
            padding: "30px 20px",
            marginTop: "20px",
          }}
        >
          <FormContent contractForm={contractForm} setContractForm={setContractForm} />
        </Grid>

        <Grid
          container
          sx={{
            paddingBottom: "30px",
          }}
        >
          <FormFooter id={Number(id)} handleSubmit={handleSubmit} 
          disabled={false} 
          />
        </Grid>
      </Box>
    </Dialog>
  );
}

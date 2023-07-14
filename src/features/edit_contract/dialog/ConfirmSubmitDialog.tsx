import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import agent from "../../../app/api/agent";
import { useNavigate } from "react-router-dom";

interface AllowanceField {
  allowanceId: number;
  allowanceTypeId: number;
  allowanceSalary: number;
}

interface Props {
  open: boolean;
  setOpen: Function;
  contractId: number | undefined;
  staffId: number | undefined;
  item: Object;
  allowanceForm: Array<AllowanceField> | undefined;
}

export default function ConfirmSubmitDialog({ open, setOpen, contractId, staffId, item, allowanceForm }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const history = useNavigate();

  const allowanceList: Array<AllowanceField> = allowanceForm!
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    allowanceList?.forEach((allowance) => {
      const allowanceUpdate = {allowanceTypeId: allowance.allowanceTypeId,
        allowanceSalary: allowance.allowanceSalary,}

      agent.Allowance.update(Number(allowance.allowanceId), Number(contractId), allowanceUpdate)
        .then((response) => console.log("Update allowance successfully: ", response))
        .catch((error) => {
          console.error("Error update allowance", error);
        });
    })
    
    agent.Contract.update(Number(contractId), Number(staffId), item)
        .then((response) => {
          console.log("Update contract successfully: ", response);
          history(`/detail-contract/${contractId}`)
        })
        .catch((error) => {
          console.error("Error update ", error);
        });

    setOpen(false);
  };
  // -------------------------- MAIN ----------------------------
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{ borderRadius: "10px", textAlign: "center" }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ fontSize: "25px", color: "#B9B9B9" }}
      >
        Bạn có chắc muốn lưu những thay đổi không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%" }}>
          <SaveSharpIcon sx={{ color: "#B9B9B9", fontSize: "70px" }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
        <Button
          variant="outlined"
          sx={{ margin: "0 10px" }}
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "0 10px" }}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import agent from "../../../app/api/agent";
import {
  useAppDispatch,
} from "../../../app/store/configureStore";
import { toast } from "react-toastify";
import {
  fetchContractAsync,
} from "../../../app/store/contract/contractSlice";

interface AllowanceList {
  allowanceId: number;
  allowanceTypeId: number;
  allowanceSalary: number;
  allowanceName: string | undefined;
}

interface AllowanceField {
  allowanceId: number;
  allowanceTypeId: number;
  allowanceSalary: number;
}

interface Props {
  open: boolean;
  setOpen: Function;
  allowanceForm: Array<AllowanceField> | undefined;
  setAllowanceForm: Function;
  allowanceDelete: Array<AllowanceField> | undefined
  setAllowanceDelete: Function
  allowanceDeleted: AllowanceList | undefined
}

export default function DeleteDialog({ open, setOpen, allowanceForm,
  setAllowanceForm,
  allowanceDelete,
  setAllowanceDelete,allowanceDeleted }: Props) {
  // -------------------------- VAR -----------------------------
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const allowanceDeleteList: AllowanceField[] = allowanceDelete || [];
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // Add to delete list
    const item = {allowanceId: allowanceDeleted?.allowanceId,
      allowanceTypeId: allowanceDeleted?.allowanceTypeId,
      allowanceSalary: allowanceDeleted?.allowanceSalary,}
    const newValue = [...allowanceDeleteList, item]
    setAllowanceDelete(newValue)

    // Delete allowance
    const updatedAllowanceForm = allowanceForm?.filter(
      (item) => item.allowanceId !== allowanceDeleted?.allowanceId
    );
    setAllowanceForm(updatedAllowanceForm)

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
        Bạn có chắc muốn xóa phụ cấp này không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%" }}>
          <DeleteSharpIcon sx={{ color: "#B9B9B9", fontSize: "70px" }} />
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
          onClick={handleDelete}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

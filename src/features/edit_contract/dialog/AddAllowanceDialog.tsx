import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import agent from "../../../app/api/agent";
import { useAppSelector } from "../../../app/store/configureStore";
import { allowanceTypeSelectors } from "../../../app/store/allowanceType/allowanceTypeSlice";
import Contract from "../../../app/models/contract";

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
}

export default function AddAllowanceDialog({
  open,
  setOpen,
  allowanceForm,
  setAllowanceForm
}: Props) {
  // -------------------------- VAR -----------------------------
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const allowanceList: Array<AllowanceField> = allowanceForm!
  // -------------------------- STATE ---------------------------
  const [form, setForm] = useState({ allowanceId: 0, allowanceTypeId: 0, allowanceSalary: 0 });
  // -------------------------- REDUX ---------------------------
  const allowanceType = useAppSelector((state) =>
    allowanceTypeSelectors.selectAll(state)
  ).filter(
    (type) =>
      !allowanceForm?.map((a) => a.allowanceTypeId).includes(type.allowanceTypeId)
  );
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const updatedAllowanceForm = [...allowanceList, form];

    // Set the new array to the state
    setAllowanceForm(updatedAllowanceForm);

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
        sx={{ fontSize: "25px", color: "#B9B9B9", padding: "20px 75px" }}
      >
        Thêm phụ cấp
      </DialogTitle>

      <DialogContent sx={{ padding: "auto 20px" }}>
        <Grid item>
          <TextField
            required
            select
            id="outlined-required"
            size="small"
            margin="dense"
            label="Loại phụ cấp"
            sx={{ width: "100%" }}
            defaultValue={0}
            onChange={(e) => setForm({ ...form, allowanceTypeId: Number(e.target.value) })}
          >
            {allowanceType.map((type) => (
              <MenuItem key={type.allowanceTypeId} value={type.allowanceTypeId}>{type.allowanceName}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            required
            id="outlined-required"
            size="small"
            margin="dense"
            label="Mức phụ cấp"
            type="number"
            sx={{ width: "100%" }}
            onChange={(e) => setForm({ ...form, allowanceSalary: Number(e.target.value) })}
          />
        </Grid>
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
          onClick={handleAdd}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

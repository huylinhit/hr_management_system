import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "../../../app/api/agent";

interface Props {
  open: boolean;
  setOpen: Function;
  id: number | undefined;
}

export default function AddSkillDialog({ open, setOpen, id }: Props) {
  // -------------------------- VAR -----------------------------
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // -------------------------- STATE ---------------------------
  const [form, setForm] = useState({ staffId: id, skillName: "", level: "" });
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    agent.StaffSkill.create(form)
      .then((response) => {
        console.log("Add new skill successfully: ", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error add new skill ", error);
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
        sx={{ fontSize: "25px", color: "#B9B9B9", padding: "20px 75px" }}
      >
        Thêm mới 1 kĩ năng
      </DialogTitle>

      <DialogContent sx={{ padding: "auto 20px" }}>
        <Grid item>
          <TextField
            required
            id="outlined-required"
            size="small"
            margin="dense"
            label="Tên kĩ năng"
            sx={{ width: "100%" }}
            onChange={(e) => setForm({ ...form, skillName: e.target.value })}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="outlined-required"
            size="small"
            margin="dense"
            label="Trình độ"
            sx={{ width: "100%" }}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
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

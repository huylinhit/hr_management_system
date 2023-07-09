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
import { UserInfor } from "../../../app/models/userInfor";
import agent from "../../../app/api/agent";

interface Props {
  open: boolean;
  setOpen: Function;
  item: UserInfor | undefined;
}

export default function DeleteDialog({ open, setOpen, item }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    agent.Employees.delete(Number(item?.staffId))
      .then((response) => {
        console.log("Delete employee successfully:", response);
      })
      .catch((error) => {
        console.error("Error delete employee:", error);
      });
      
    setOpen(false);
  };

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
        Bạn có chắc muốn xóa nhân viên {item?.fullName} này không?
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

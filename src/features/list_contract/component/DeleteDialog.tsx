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
import { Employee } from "../../../app/models/employee";

interface Props {
    open: boolean,
    setOpen: Function,
    item: Object,
}

export default function DeleteDialog ({ open, setOpen, item}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log(item);
    
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{ borderRadius:"10px", textAlign: "center"}}
    >
      <DialogTitle id="responsive-dialog-title" sx={{ fontSize: "25px", color: "#B9B9B9"}}>
        Bạn có chắc muốn xóa abc này không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%"}}>
          <DeleteSharpIcon sx={{ color: "#B9B9B9", fontSize: "70px" }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-around", paddingBottom:"15px" }}>
        <Button size="small" variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <Button size="small" variant="contained" onClick={handleDelete} >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

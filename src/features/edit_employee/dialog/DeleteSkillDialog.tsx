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
import { StaffSkill } from "../../../app/models/staffSkill";

interface Props {
    open: boolean,
    setOpen: Function,
    item: StaffSkill | undefined,
}

export default function DeleteSkillDialog ({ open, setOpen, item}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log(item);
    setOpen(false);
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
        Bạn có chắc muốn xóa kĩ năng {item?.skillName} không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%"}}>
          <DeleteSharpIcon sx={{ color: "#B9B9B9", fontSize: "70px" }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom:"15px" }}>
        <Button variant="outlined" sx={{ margin: "0 10px"}} onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" sx={{ margin: "0 10px"}} onClick={handleDelete} >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
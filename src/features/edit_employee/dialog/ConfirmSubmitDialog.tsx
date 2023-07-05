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
import { UserInfor } from "../../../app/models/userInfor";
import agent from "../../../app/api/agent";

interface Props {
  open: boolean;
  setOpen: Function;
  item: UserInfor | undefined;
}

export default function ConfirmSubmitDialog({ open, setOpen, item }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const submitObject = Object.entries(Object(item));
    submitObject.map((object) => {
      const submit = {
        operationType: 0,
        path: "/" + object[0],
        op: "replace",
        from: "",
        value: object[1],
      };
      console.log(submit);
      
      agent.Employees.patch(Number(item?.staffId), submit)
        .then((response) => {
          console.log("Update successfully: ", response);
        })
        .catch((error) => {
          console.error("Error update ", error);
        });
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
        Bạn có chắc muốn lưu những thay đổi không?
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
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

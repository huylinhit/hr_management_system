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
  allowanceTypeId: number;
  allowanceSalary: number;
}

interface Props {
  open: boolean;
  setOpen: Function;
  id: number | undefined;
  item: Object;
  allowanceForm: Array<AllowanceField> | undefined;
}

export default function ConfirmSubmitDialog({ open, setOpen, id, item, allowanceForm }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const history = useNavigate();
  console.log("***Submit");
  console.log(item);
  console.log(allowanceForm);
  
  
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    
    // skillForm.forEach((skill) => {
    //   agent.StaffSkill.update(skill)
    //   .then((response) => console.log("Update skill", skill.skillName, "successfully: ", response))
    //   .catch((error) => {
    //     console.error("Error update skill", error);
    //   });
    // })
    
    // agent.Employees.update(Number(id), item)
    //     .then((response) => {
    //       console.log("Update employee successfully: ", response);
    //       history(`/detail-employee/${id}`)
    //       // window.location.reload()
    //     })
    //     .catch((error) => {
    //       console.error("Error update ", error);
    //     });

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

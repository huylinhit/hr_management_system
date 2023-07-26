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
import Contract from "../../../app/models/contract";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  contractSelectors,
  fetchContractAsync,
  fetchContractsAsync,
  setContractUpdated,
} from "../../../app/store/contract/contractSlice";
import moment from "moment";

interface Props {
  open: boolean;
  setOpen: Function;
  item: Contract | undefined;
  prevpage: string | undefined;
}

export default function DeleteDialog({ open, setOpen, item, prevpage }: Props) {
  // -------------------------- REDUX ---------------------------
  const { user } = useAppSelector((state) => state.account);

  // const convertDateTime = (dateTimeString: string): string => {
  //   const [time, date] = dateTimeString.split(" ");
  //   const [day, month, year] = date.split("/").map(Number);
  //   const [hours, minutes, seconds] = time.split(":").map(Number);
  //   const newDate = new Date(year, month - 1, day, hours, minutes, seconds);
  //   const formattedDate = newDate.toISOString();

  //   return formattedDate;F
  // };
  // -------------------------- VAR -----------------------------
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const history = useNavigate();
  const dispatch = useAppDispatch();
  // -----------
  const currentDateTime = new Date();
  // const submitTime = convertDateTime(currentDateTime.toLocaleString());

  // -----------
  const newObj: Partial<Contract> | undefined = item
    ? {
        ...item,
        contractStatus: false,
        // changeAt: submitTime,
        responseId: user?.userInfor.staffId,
      }
    : undefined;
  const {
    startDate,
    endDate,
    taxableSalary,
    salary,
    workDatePerWeek,
    note,
    noOfDependences,
    contractTypeId,
    salaryType,
    contractFile,
    createAt,
    responseId,
    changeAt,
    contractStatus,
  } = newObj || {};

  const contractDeleted = {
    startDate,
    endDate,
    taxableSalary,
    salary,
    workDatePerWeek,
    note,
    noOfDependences,
    contractTypeId,
    salaryType,
    contractFile,
    createAt,
    responseId,
    changeAt,
    contractStatus,
  };
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const contractPatchDelete = [
    {
      path: "/contractStatus",
      op: "replace",
      value: false,
    },
    {
      path: "/responseId",
      op: "replace",
      value: `${user?.userInfor.staffId}`,
    },
  ];

  const handleDelete = async () => {
    let deleteStatus = false;

    const contractId = parseInt(String(item?.contractId!));
    const staffId = parseInt(String(item?.staffId!));

    agent.Contract.patch(contractId, staffId, contractPatchDelete)
      .then((response) => {
        dispatch(setContractUpdated(true));
        dispatch(fetchContractsAsync());
        setOpen(false);
        toast.success("Hủy hợp đồng thành công 😊");

        dispatch(fetchContractAsync(Number(item?.staffId)));
        history(`/contracts/${item?.contractId}/staffs/${item?.staffId}/${prevpage}}`);
      })
      .catch((error) => {
        toast.error("Lỗi khi hủy hợp đồng 😥");
      });
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
      <DialogTitle id="responsive-dialog-title" sx={{ fontSize: "25px", color: "#B9B9B9" }}>
        Bạn có chắc muốn hủy hợp đồng nhân viên này không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%" }}>
          <DeleteSharpIcon sx={{ color: "#B9B9B9", fontSize: "70px" }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
        <Button variant="outlined" sx={{ margin: "0 10px" }} onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" sx={{ margin: "0 10px" }} onClick={handleDelete}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

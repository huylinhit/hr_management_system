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
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import agent from "../../../app/api/agent";
import { useNavigate } from "react-router-dom";
import Contract from "../../../app/models/contract";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  fetchContractAsync,
  fetchContractsAsync,
  setContractAdded,
  setContractUpdated,
} from "../../../app/store/contract/contractSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";

interface AllowanceField {
  allowanceId: number;
  allowanceTypeId: number;
  allowanceSalary: number;
}

interface Props {
  open: boolean;
  setOpen: Function;
  contract: Contract | undefined;
  setContractForm: Function;
  initialContractForm: Object;
  staffId: number | undefined;
  item: Object;
  allowanceForm: Array<AllowanceField> | undefined;
  prevpage: string | undefined;
  allowanceDelete: Array<AllowanceField> | undefined;
}

export default function ConfirmSubmitDialog({
  open,
  setOpen,
  contract,
  setContractForm,
  initialContractForm,
  staffId,
  item,
  allowanceForm,
  allowanceDelete,
  prevpage,
}: Props) {
  // -------------------------- VAR -----------------------------
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const history = useNavigate();
  const dispatch = useAppDispatch();

  const deleteLength = Number(allowanceDelete?.filter((a) => a.allowanceId !== 0).length);
  const length = Number(contract?.allowances.length);

  const allowanceUpdate: Array<AllowanceField> = allowanceForm!
    ?.slice(0, length - deleteLength)
    ?.map(({ allowanceId, allowanceTypeId, allowanceSalary }) => ({
      allowanceId,
      allowanceTypeId,
      allowanceSalary,
    }));

  const allowanceAdd: Array<AllowanceField> = allowanceForm!
    ?.slice(length - deleteLength)
    ?.map(({ allowanceId, allowanceTypeId, allowanceSalary }) => ({
      allowanceId,
      allowanceTypeId,
      allowanceSalary,
    }));

  const allowanceDeleteList: Array<AllowanceField> = allowanceDelete!?.filter(
    (a) => a.allowanceId !== 0
  );

  const isChanged = !(JSON.stringify(item) === JSON.stringify(initialContractForm));
  // -------------------------- STATE ---------------------------
  const [isError, setIsError] = useState(false);
  // -------------------------- REDUX ---------------------------
  const currentUser = useAppSelector((state) => state.account);
  // -------------------------- FUNCTION ------------------------
  const handleClose = () => {
    setOpen(false);
  };

  const handleAllowance = () => {
    console.log("allowanceUpdate: ", allowanceUpdate);
    console.log("allowanceAdd: ", allowanceAdd);
    console.log("allowanceDelete: ", allowanceDeleteList);

    allowanceUpdate?.forEach((allowance) => {
      const allowanceUpdate = {
        allowanceTypeId: allowance.allowanceTypeId,
        allowanceSalary: allowance.allowanceSalary,
      };
      agent.Allowance.update(
        Number(allowance.allowanceId),
        Number(contract?.contractId),
        allowanceUpdate
      )
        .then((response) => {
          toast.success("Đã cập nhật phụ cấp thành công");
        })
        .catch((error) => {
          setIsError(true);
          toast.success("Lỗi khi cập nhật phụ cấp");
        });
    });

    allowanceAdd?.forEach((allowance) => {
      const allowanceAdd = {
        allowanceTypeId: allowance.allowanceTypeId,
        allowanceSalary: allowance.allowanceSalary,
      };

      agent.Allowance.create(Number(contract?.contractId), allowanceAdd)
        .then((response) => {
          //dispatch(fetchContractsAsync());
          toast.success("Đã thêm phụ cấp thành công");
        })
        .catch((error) => {
          setIsError(true);
          toast.error("Lỗi khi thêm phụ cấp");
        });
    });

    // ------------------------------

    allowanceDeleteList?.forEach((allowance) => {
      const allowanceAdd = {
        allowanceTypeId: allowance.allowanceTypeId,
        allowanceSalary: allowance.allowanceSalary,
      };

      agent.Allowance.delete(allowance.allowanceId)
        .then((response) => {
          console.log("Delete contract successfully:", response);
          // dispatch(fetchContractAsync(Number(contract?.staffId)))
          toast.success("Đã xóa phụ cấp thành công");
        })
        .catch((error) => {
          console.error("Error delete contract:", error);
          toast.error("Lỗi khi xóa phụ cấp");
        });
    });
    dispatch(fetchContractsAsync());
    // ------------------------------
  };

  const handleSubmit = () => {
    setIsError(false);

    // -----------
    const currentDateTime = new Date();
    const submitTime = currentDateTime.toLocaleString();
    setContractForm((prevFormData: any) => ({
      ...prevFormData,
      changeAt: submitTime,
      responseId: currentUser.user?.userInfor.staffId,
    }));
    // ------------

    if (isChanged) {
      agent.Contract.update(Number(contract?.contractId), Number(staffId), item)
        .then((response) => {
          toast.success("Đã cập nhật hợp đồng thành công");
          dispatch(setContractUpdated(true));
          handleAllowance();
        })
        .catch((error) => {
          console.error("Error update ", error);
          setIsError(true);
          toast.error("Lỗi khi cập nhật hợp đồng");
        });
    } else {
      handleAllowance();
    }

    if (!isError) {
      dispatch(fetchContractsAsync());
      dispatch(fetchContractAsync(Number(staffId)));
      dispatch(setContractAdded(true));
      history(`/contracts/${contract?.contractId}/staffs/${staffId}/${prevpage}}`);
    }
    setOpen(false);
    dispatch(fetchContractsAsync());
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
        Bạn có chắc muốn lưu những thay đổi không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%" }}>
          <SaveSharpIcon sx={{ color: "#B9B9B9", fontSize: "70px" }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
        <Button variant="outlined" sx={{ margin: "0 10px" }} onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" sx={{ margin: "0 10px" }} onClick={handleSubmit}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

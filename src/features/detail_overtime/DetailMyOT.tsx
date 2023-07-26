import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import { styled } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import {
  fetchLogOtsAsync,
  logOvertimeSelectors,
  setLogOvertimeAdded,
} from "../overlog/overtimeSlice";
import agent from "../../app/api/agent";
import ConfirmDialog from "../../app/layout/ConfirmDialog";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

const fontStyle = "Mulish";

const headerColor = {
  color: "#808080",
};
const headerStyle = {
  fontWeight: 600,
  fontFamily: fontStyle,
  width: "200px",
};
const infoStyle = {
  fontWeight: 600,
  fontFamily: fontStyle,
  fontSize: "15px",
  color: "#000000",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
  },
};
const verticalSpacing = {
  mb: "10px",
};

const BootstrapInput = styled(TextField)(({ theme, disabled }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 15,
    width: "100%  ",
    padding: "6px 8px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: "Mulish",
    "&:hover:not(:focus)": {
      backgroundColor: disabled ? null : "#E7E7E7",
    },
    "&:focus": {
      boxShadow: `0 2px 8px 0 rgba(0, 0, 0, 0.5)`, // Add vertical offset to boxShadow
      borderColor: "#505050",
      backgroundColor: "FFFFFF",
      "&:hover": {
        backgroundColor: "FFFFFF", // Remove hover effect when focused
      },
    },
    "&::placeholder": {
      color: "#000000", // Replace with your desired placeholder color
    },
    "&::disabled": {
      color: "#000000",
    },
  },
}));

const InforRow = (value: any) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{ ...verticalSpacing, ...headerColor }}
    >
      {value.icon}
      <Typography sx={headerStyle}>{value.header}</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <BootstrapInput
          disabled={value.disabled}
          InputProps={textFieldInputProps}
          defaultValue={value.defaultValue}
          value={value.value}
          type={value.type}
          variant="standard"
          placeholder="Trống"
          onChange={value.onChange}
          select={value.select}
          sx={{ ...infoStyle, width: "100% " }}
        />
      </Box>
    </Box>
  );
};

const textFieldInputProps = {
  disableUnderline: true,
  style: {
    ...infoStyle,
  },
};
export default function DetailMyOT({ open, handleClose, handleChange }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.account);
  const { id } = useParams<{ id: string; staffid: string }>();
  const staffId: number = user?.userInfor.staffId!;
  const overtimeId = parseInt(id!);
  const { logOtsLoaded, status: LogOtStatus } = useAppSelector(
    (state) => state.logot
  );
  const logot = useAppSelector((state) =>
    logOvertimeSelectors.selectById(state, overtimeId)
  );
  const [oneDaySalary, setOneDaySalary] = useState<number>(
    logot?.salaryPerDay!
  );
  const [hours, setHours] = useState<number>(logot?.logHours!);
  const [days, setDays] = useState(logot?.days);
  const [amountSalary, setAmountSalary] = useState<number>(logot?.amount!);
  const [minHours, setMinHours] = useState<number>(1);
  const [maxHours, setMaxHours] = useState<number>(logot?.logHours!);
  const [reason, setReason] = useState<string>("");
  const [salaryOneHour, setSalaryOneHour] = useState<number>(0);

  useEffect(() => {
    if (!logOtsLoaded) dispatch(fetchLogOtsAsync());
    setDays(logot?.days);
    setHours(logot?.logHours!);
    setOneDaySalary(logot?.salaryPerDay!);
    setAmountSalary(logot?.amount!);
    setMaxHours(logot?.days! * 8);
    setReason(logot?.reason!);
    setSalaryOneHour(logot?.amount! / logot?.logHours!);
  }, [logOtsLoaded]);

  const today = dayjs().startOf("day");
  const [startDate, setStartDate] = useState(logot?.logStart);
  const [endDate, setEndDate] = useState(logot?.logEnd);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [ticketChanged, setTicketChanged] = useState(false);
  const [processNote, setProcessNote] = useState(logot?.processNote);
  const location = useLocation();

  // console.log(`LOGLEAVE ID: ${id} STAFF ID: ${staffid}`);
  //#region ==============================USE EFFECT=====================================
  //Set header title
  useEffect(() => {
    if (logot) {
      dispatch(
        setHeaderTitle([
          { title: "Đơn tăng ca của tôi", path: "/own-log-overtimes" },
          { title: `Chỉnh sửa đơn`, path: "" },
        ])
      );
    }
  }, [dispatch, location, logot]);

  const handleDays = (e: any) => {
    setDays(e.target.value);
  };
  const handleHours = (e: any) => {
    const newValue = e.target.value.toString();

    let demo = hours;
    if (!isNaN(Number(newValue))) {
      demo = parseInt(newValue);
    } else {
    }

    if (minHours <= demo && demo <= maxHours) {
      setHours(demo);
      setAmountSalary((prev) => Math.floor(salaryOneHour * demo));
    }
  };

  //Get leave day detail
  //#endregion ==============================USE EFFECT=====================================

  //#region ===========================HANDLE ACTION======================================
  const debouncedProcessNoteInput = debounce((event: any) => {
    setProcessNote(event.target.value);
  }, 750);
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const debouncedDescriptionInput = debounce((event: any) => {
    setReason(event.target.value);
  }, 750);

  const handleLogOvertimeApprove = () => {
    const ticketUpdate = {
      patchDocument: [
        {
          op: "replace",
          path: "/logHours",
          value: hours,
        },
        {
          op: "replace",
          path: "/amount",
          value: amountSalary,
        },
        {
          op: "replace",
          path: "/reason",
          value: reason,
        },
      ],
    };

    agent.LogOt.patch(overtimeId, staffId, ticketUpdate.patchDocument)
      .then((response) => {
        setLogOvertimeAdded(true);
        toast.success("Cập nhật đơn thành công 😊");
      })
      .catch((error) => {
        // console.log("error: ",error);
      });
    navigate("/own-log-overtimes");
    handleCloseConfirm();
  };

  const handleCancelTicket = () => {
    const ticketCancel = {
      patchDocument: [
        {
          op: "replace",
          path: "/enable",
          value: false,
        },
        {
          op: "replace",
          path: "/status",
          value: "cancel",
        },
      ],
    };

    agent.LogOt.patch(parseInt(id!), staffId, ticketCancel.patchDocument)
      .then((response) => {
        console.log("Ticket cancelled successfully: ", response);
        setTicketChanged(true);
        toast.success("Hủy đơn thành công 😊");
        navigate("/own-log-overtimes");
      })
      .catch((error) => {
        console.log("Error cancelling ticket", error);
        toast.error("Xảy ra lỗi khi hủy đơn 😥");
      });
    handleCloseConfirm();
  };

  if (LogOtStatus.includes("pending"))
    return <LoadingComponent message="Đang Tải Đơn Làm Thêm Giờ..." />;

  //#endregion ===========================HANDLE ACTION======================================
  return (
    <>
      <Box sx={{ paddingLeft: "10%", mt: "0%", paddingRight: "10%" }}></Box>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <Grid container justifyContent={"space-between"}>
          <Typography
            sx={{ fontSize: "40px", fontWeight: "700", fontFamily: fontStyle }}
          >
            Đơn của {`${logot?.staff.lastName} ${logot?.staff.firstName}`}
          </Typography>
          <Box display={"flex"} alignItems={"flex-end"}>
            {logot?.enable === true ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ClearIcon />}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    fontFamily: fontStyle,
                    marginRight: "15px",
                  }}
                  disableElevation={true}
                  onClick={handleCancelTicket}
                >
                  Hủy đơn
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckIcon />}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    // color: "#007FFF",
                    fontFamily: fontStyle,
                  }}
                  disableElevation={true}
                  onClick={handleLogOvertimeApprove}
                >
                  Lưu
                </Button>
              </>
            ) : (
              <Typography />
            )}
            <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              title={`Hủy ${logot?.otType.typeName.toLowerCase()}`}
              content="Bạn sẽ không thể chỉnh sửa đơn này sau khi đã hủy"
              action={handleCancelTicket}
            />
            <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              title={`Hủy ${logot?.otType.typeName.toLowerCase()}`}
              content="Bạn sẽ không thể chỉnh sửa đơn này sau khi đã hủy"
              action={handleLogOvertimeApprove}
            />
          </Box>
        </Grid>

        <Box
          sx={{ borderBottom: "2px solid #333333", mb: "4%", mt: "1%" }}
        ></Box>

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã nhân viên"
          defaultValue={`STF-${logot?.staff.staffId
            .toString()
            .padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã đơn"
          defaultValue={`LE-${logot?.otLogId.toString().padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Tên nhân viên"
          defaultValue={`${logot?.staff.firstName} ${logot?.staff.lastName}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Người duyệt đơn"
          // defaultValue={`${logLeave?.respondenceName ? logLeave.respondenceName : ""}`}
          disabled={true}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Loại đơn"
          defaultValue={logot?.otType.typeName}
          disabled
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày bắt đầu"
          defaultValue={
            logot?.logStart
              ? `${moment(logot?.logStart).format("MMM Do, YYYY")}`
              : ""
          }
          disabled={true}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày kết thúc"
          defaultValue={
            logot?.logEnd
              ? `${moment(logot?.logEnd).format("MMM Do, YYYY")}`
              : ""
          }
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Lương Một Ngày"
          defaultValue={logot?.salaryPerDay.toLocaleString()}
          disabled
        />
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Tổng Lương"
          // defaultValue={logot?.amount.toLocaleString()}
          value={
            amountSalary
              ? amountSalary?.toLocaleString()
              : logot?.amount.toLocaleString()
          }
          disabled
        />
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Giờ"
          type="number"
          // defaultValue={logot?.logHours}
          value={hours ? hours : logot?.logHours}
          disabled={logot?.enable === false && true}
          onChange={handleHours}
        />
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày"
          defaultValue={`${logot?.days}`}
          onChange={handleDays}
          disabled
        />
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Nội dung đơn"
          defaultValue={`${logot?.reason}`}
          disabled={logot?.enable === false && true}
          onChange={debouncedDescriptionInput}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày gửi đơn"
          defaultValue={`${moment(logot?.createAt).format("MMM Do, YYYY")}`}
          disabled={true}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Thời gian thay đổi"
          defaultValue={
            logot?.changeStatusTime
              ? `${moment(logot?.changeStatusTime).format("MMM Do, YYYY")}`
              : ""
          }
          disabled={true}
        />

        <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing }}>
          <FormatListBulletedIcon
            sx={{ mr: "5px", ...headerColor }}
            fontSize="small"
          />
          <Typography sx={{ ...headerStyle, ...headerColor }}>
            Trạng thái
          </Typography>
          {logot?.status === "approved" ? (
            <Typography
              sx={{
                backgroundColor: "#D0F9E5",
                padding: "1px 10px ",
                fontFamily: fontStyle,
                borderRadius: "6px",
                fontWeight: 700,
                color: "#2B8465",
                alignItems: "center",
                display: "inline-block",
                width: "fit-content",
                ml: "5px",
              }}
            >
              Chấp nhận
            </Typography>
          ) : logot?.status === "pending" ? (
            <Typography
              sx={{
                backgroundColor: "#FFF5D1",
                padding: "1px 10px ",
                fontFamily: fontStyle,
                borderRadius: "6px",
                fontWeight: 700,
                color: "#FF9F28",
                alignItems: "center",
                display: "inline-block",
                width: "fit-content",
                ml: "5px",
              }}
            >
              Chờ duyệt
            </Typography>
          ) : logot?.status === "rejected" ? (
            <Typography
              sx={{
                backgroundColor: "#FFE7E7",
                padding: "1px 10px ",
                fontFamily: fontStyle,
                borderRadius: "6px",
                fontWeight: 700,
                color: "#D03D3D",
                alignItems: "center",
                display: "inline-block",
                width: "fit-content",
                ml: "5px",
              }}
            >
              Từ chối
            </Typography>
          ) : (
            <Typography
              sx={{
                backgroundColor: "#F4F6F7",
                padding: "1px 10px ",
                fontFamily: fontStyle,
                borderRadius: "6px",
                fontWeight: 700,
                color: "#9BA6B2",
                alignItems: "center",
                display: "inline-block",
                width: "fit-content",
                ml: "5px",
              }}
            >
              Đã hủy
            </Typography>
          )}
        </Box>

        <Box
          sx={{ borderBottom: "1px solid #C4C4C4", mt: "5%", mb: "1%" }}
        ></Box>

        <Grid item xs={9}>
          <InforRow
            icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
            header="Phản hồi đơn"
            defaultValue={
              logot?.processNote !== null ? `${logot?.processNote}` : "Trống"
            }
            disabled
          />
        </Grid>
      </Container>
    </>
  );
}

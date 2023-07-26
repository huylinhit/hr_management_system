import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import moment from "moment";
import { styled } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { ToastContainer, toast } from "react-toastify";
import {
  BaseSingleInputFieldProps,
  DatePicker,
  DatePickerProps,
  DateValidationError,
  FieldSection,
  LocalizationProvider,
  UseDateFieldProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import agent from "../../../app/api/agent";
import ConfirmDialog from "../../../app/layout/ConfirmDialog";
import { setHeaderTitle } from "../../../app/layout/headerSlice";
import { useAppSelector, useAppDispatch } from "../../../app/store/configureStore";
import { fetchLeaveDayDetailAsync } from "../../detail_leavelog/leaveDayDetailSlice";
import { logleaveSelectors, fetchLogLeaveAsync, setLogLeaveAdded } from "../../detail_leavelog/logleaveSlice";
import MyTicketDetailSkeleon from "../../othertypes/MyTicketDetailSkeleton";
import { fetchLogOtAsync, fetchLogOtsAsync, fetchLogOtsStaffAsync, logOvertimeSelectors, setLogOvertimeAdded } from "../../overlog/overtimeSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ChipCustome from "../../../app/components/Custom/Chip/ChipCustome";
const fontStyle = "Mulish";

const menuItemStyle = {
  fontStyle: fontStyle,
};
const navStyle = {
  fontSize: 25,
  fontWeight: 800,
  fontFamily: fontStyle,
  textTransform: "none",
  color: "#333333",
  borderRadius: "10px",
  padding: "0px 10px 0px 10px",
  "&:hover": {
    backgroundColor: "#F8F8F8", // Set the hover background color
  },
};
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
const styles = {
  marginBottom: "10px",
};
const BootstrapInput = styled(TextField)(({ theme, disabled }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    //border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 15,
    width: "100%  ",
    padding: "6px 8px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
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
const ProcessNoteInput = styled(TextField)(({ theme, disabled }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    fontSize: 15,
    width: "100%  ",
    padding: "6px 8px",
    // Use the system font instead of the default Roboto font.
    fontFamily: "Mulish",

    "&::disabled": {
      color: "#000000",
    },
  },
}));
interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
  BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, DateValidationError> {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      fullWidth
      variant="text"
      id={id}
      disabled={disabled}
      sx={{
        textTransform: "none",
        color: "#000000",
        backgroundColor: "white",
        borderColor: "#B8B8B8",
        "&:hover": {
          backgroundColor: "#E7E7E7",
          color: "#000000",
          borderColor: "#E7E7E7",
        },
        "&:active": {
          backgroundColor: "#DFDFDF",
          borderColor: "#DFDFDF",
          color: "#000000",
        },
        justifyContent: "flex-start",
        fontFamily: "Mulish",
        fontWeight: 600,
      }}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ?? "Pick a date"}
    </Button>
  );
}
function ButtonDatePicker(props: Omit<DatePickerProps<Dayjs>, "open" | "onOpen" | "onClose">) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

const InforRow = (value: any) => {
  return (
    <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
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
const fieldStyle = {
  flexGrow: 1,
  mb: "2%",
};
export default function DetailOvertime2({ open, handleClose, handleChange }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, staffid } = useParams<{ id: string; staffid: string }>();
  const { user } = useAppSelector(state => state.account);

  // const staffId = parseInt(staffid!);
  const overtimeId = parseInt(id!);
  const staffId = parseInt(staffid!);
  const { logOtsLoaded, status: LogOtStatus } = useAppSelector(state => state.logot);
  const logot = useAppSelector(state => logOvertimeSelectors.selectById(state, overtimeId));
  const [oneDaySalary, setOneDaySalary] = useState<number>(logot?.salaryPerDay!);
  const [hours, setHours] = useState<number>(logot?.logHours!);
  const [days, setDays] = useState(logot?.days);
  const [amountSalary, setAmountSalary] = useState<number>(logot?.amount!);
  const [minHours, setMinHours] = useState<number>(1);
  const [maxHours, setMaxHours] = useState<number>(logot?.logHours!);
  const [reason, setReason] = useState<string>("");
  // const salaryOneDays: number = logot!.salaryPerDay;
  const [salaryOneHour, setSalaryOneHour] = useState<number>(0);

  const today = dayjs().startOf("day");
  const minEndDate = today.add(1, "day").startOf("day");
  const [startDate, setStartDate] = useState(logot?.logStart);
  const [endDate, setEndDate] = useState(logot?.logEnd);
  const [status, setStatus] = useState(logot?.status);
  const [description, setDescription] = useState(logot?.reason);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [processNote, setProcessNote] = useState(logot?.processNote);
  const location = useLocation();

  useEffect(() => {
    if (!logOtsLoaded)
      dispatch(fetchLogOtsAsync());

    setDays(logot?.days)
    setHours(logot?.logHours!);
    setOneDaySalary(logot?.salaryPerDay!);
    setAmountSalary(logot?.amount!);
    setMaxHours(logot?.days! * 8);
    setReason(logot?.reason!);
    setSalaryOneHour(logot?.amount! / logot?.logHours!);  

  }, [logOtsLoaded, dispatch]);
  // console.log(`LOGLEAVE ID: ${id} STAFF ID: ${staffid}`);
  //#region ==============================USE EFFECT=====================================
  //Set header title
  useEffect(() => {
    if (logot) {
      dispatch(
        setHeaderTitle([
          { title: "Đơn tăng ca của nhân viên", path: "/log-overtimes" },
          { title: `Phản hồi đơn`, path: "" },
        ])
      );
    }
  }, [dispatch, location, logot]);

  const handleDays = (e: any) => {
    setDays(e.target.value)
  }

  const handleHours = (e: any) => {
    const newValue = e.target.value.toString();
    let demo = hours;
    if (!isNaN(Number(newValue))) {
      demo = parseInt(newValue);
    } else {
    }

    if (minHours <= demo && demo <= maxHours) {
      setHours(demo);
      setAmountSalary(prev => Math.floor(salaryOneHour * demo))
    }
  }

  //#endregion ==============================USE EFFECT=====================================

  //#region ===========================HANDLE ACTION======================================
  const debouncedProcessNoteInput = debounce((event: any) => {
    setProcessNote(event.target.value);
  }, 750);
  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleSetStartDate = (event: any) => {
    setStartDate(event);
    if (dayjs(endDate).isBefore(event, "day")) {
      setEndDate(event.add(1, "day"));
    }
  };
  const debouncedDescriptionInput = debounce((event: any) => {
    setDescription(event.target.value);
  }, 750);

  //Initially get ticket on Firebase
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const handleLogOvertimeApprove = () => {
    // console.log("Here: ", status);
    // console.log("Here: ", user?.userInfor.staffId);
    // console.log("Here: ", processNote);
    // console.log("Here: ", hours);
    // console.log("Here: ", amountSalary  );

    const ticketUpdate = {
      patchDocument: [
        {
          op: "replace",
          path: "/status",
          value: status,
        },
        {
          op: "replace",
          path: "/respondencesId",
          value: user?.userInfor.staffId,
        },
        {
          op: "replace",
          path: "/processNote",
          value: processNote,
        },
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
      ],
    };

    agent.LogOt.patch(overtimeId, staffId, ticketUpdate.patchDocument)
      .then((response) => {
        setLogOvertimeAdded(true);
        // console.log("Ticket updated successfully: ", response);
        toast.success("Duyệt đơn thành công 😊");
        navigate('/log-overtimes')
      })
      .catch((error) => {
        // console.log("Error updating ticket: ", error);
        // toast.error("Xảy ra lỗi khi duyệt đơn 😥");
      });
  };

  // if (!logLeave || !leaveDayDetail) {
  //   return <MyTicketDetailSkeleon />;
  // }


  if (LogOtStatus.includes('pending')) return <LoadingComponent message="Đang Tải Đơn Làm Thêm Giờ..." />

  //#endregion ===========================HANDLE ACTION======================================
  return (
    <>
      <Box sx={{ paddingLeft: "10%", mt: "0%", paddingRight: "10%" }}></Box>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <Grid container justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "40px", fontWeight: "700", fontFamily: fontStyle }}>
            Đơn của {`${logot?.staff.lastName} ${logot?.staff.firstName}`}
          </Typography>
          <Box display={"flex"} alignItems={"flex-end"}>
            {logot?.enable ? (
              <>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    color: "#007FFF",
                    fontFamily: fontStyle,
                  }}
                  disableElevation={true}
                  onClick={handleLogOvertimeApprove}
                >
                  Xác nhận
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
              action={handleLogOvertimeApprove}
            />
          </Box>
        </Grid>

        <Box sx={{ borderBottom: "2px solid #333333", mb: "4%", mt: "1%" }}></Box>

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã nhân viên"
          defaultValue={`STF-${logot?.staff.staffId.toString().padStart(5, "0")}`}
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
          value={logot?.respondencesId ? `STF-0000${logot?.respondencesId}` : "Trống"}
          // defaultValue={}
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
            logot?.logEnd ? `${moment(logot?.logEnd).format("MMM Do, YYYY")}` : ""
          }
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Lương Một Ngày (8 Tiếng)"
          defaultValue={logot?.salaryPerDay.toLocaleString()}
          disabled
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Tổng Lương"
          // defaultValue={logot?.amount.toLocaleString()}
          value={amountSalary ? amountSalary?.toLocaleString() : logot?.amount.toLocaleString()}
          disabled
        />
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Giờ"
          type='number'
          value={hours ? hours : logot?.logHours}
          disabled={logot?.enable === false && true}
          onChange={handleHours}
        /><InforRow
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
          disabled
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
          <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
          <Typography sx={{ ...headerStyle, ...headerColor }}>Trạng thái</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <BootstrapInput
              fullWidth
              defaultValue={logot?.status}

              InputProps={textFieldInputProps}
              variant="standard"
              onChange={handleStatusChange}
              select
            >
              <MenuItem value={"approved"}><ChipCustome status="payment" >Chấp Nhận</ChipCustome></MenuItem>
              <MenuItem value={"pending"}><ChipCustome status="pending">Chờ Duyệt</ChipCustome></MenuItem>
              <MenuItem value={"rejected"}><ChipCustome status="rejected">Từ Chối</ChipCustome></MenuItem>
            </BootstrapInput>
          </Box>
        </Box>

        <Box sx={{ borderBottom: "1px solid #C4C4C4", mt: "5%", mb: "1%" }}></Box>

        <Grid item xs={9}>
          <TextField
            sx={{
              width: "100%",
            }}
            variant="standard"
            multiline
            label="Nhập phản hồi..."
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: fontStyle },
            }}
            defaultValue={logot?.processNote}
            onChange={debouncedProcessNoteInput}
          />
        </Grid>
      </Container>
    </>
  );
}

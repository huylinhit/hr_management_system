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
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import agent from "../../app/api/agent";
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
import { storage } from "../../firebase";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { setHeaderTitle } from "../../app/layout/headerSlice";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../../app/layout/ConfirmDialog";
import { fetchLogLeaveAsync, logleaveSelectors, setLogLeaveAdded } from "./logleaveSlice";
import { fetchLeaveDayDetailAsync } from "./leaveDayDetailSlice";
import MyTicketDetailSkeleon from "../othertypes/MyTicketDetailSkeleton";
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
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
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
export default function LeaveApproval({ open, handleClose, handleChange }: any) {
  const { id, staffid } = useParams<{ id: string; staffid: string }>();
  const staffId = parseInt(staffid!);
  const logLeaveId = parseInt(id!);

  const logLeave = useAppSelector((state) => logleaveSelectors.selectById(state, id!));
  const { leaveDayDetail, leaveDayDetailLoaded } = useAppSelector((state) => state.leaveDayDetail);
  const { logleavesLoaded } = useAppSelector((state) => state.logleave);
  const today = dayjs().startOf("day");
  const minEndDate = today.add(1, "day").startOf("day");
  const [startDate, setStartDate] = useState(logLeave?.leaveStart);
  const [endDate, setEndDate] = useState(logLeave?.leaveEnd);
  const [status, setStatus] = useState(logLeave?.status);
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState(2);
  const [description, setDescription] = useState(logLeave?.description);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [ticketChanged, setTicketChanged] = useState(false);
  const [processNote, setProcessNote] = useState(logLeave?.processNote);
  const currentUser = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(`LOGLEAVE ID: ${id} STAFF ID: ${staffid}`);
  //#region ==============================USE EFFECT=====================================
  //Set header title
  useEffect(() => {
    if (logLeave) {
      dispatch(
        setHeaderTitle([
          { title: "Đơn nghỉ của nhân viên", path: "/log-leaves" },
          { title: `Phản hồi đơn`, path: "" },
        ])
      );
    }
  }, [dispatch, location, logLeave]);
  //Set default value when reload page
  useEffect(() => {
    if (logLeave) {
      setStatus(logLeave.status);
      setStartDate(logLeave.leaveStart);
      setEndDate(logLeave.leaveEnd);
      setSelectedLeaveTypeId(logLeave.leaveTypeId);
      setDescription(logLeave.description);
    }
  }, [logLeave]);

  //Get this ticket
  useEffect(() => {
    if (!currentUser.user) return;

    if ((!logLeave && id && staffId) || ticketChanged) {
      dispatch(fetchLogLeaveAsync({ logLeaveId, staffId }));
      setTicketChanged(false);
    }
  }, [id, logLeave, dispatch, ticketChanged]);

  //Get leave day detail
  useEffect(() => {
    if (staffId && !leaveDayDetailLoaded) dispatch(fetchLeaveDayDetailAsync(staffId));
  }, [dispatch, staffId]);
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

  const handleLeaveChange = (event: any) => {
    const selectedOption = leaveDayDetail!.find(
      (option) => option.leaveType.leaveTypeName === event.target.value
    );
    setSelectedLeaveTypeId(selectedOption!.leaveTypeId);
  };
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const handleLeaveApproval = () => {
    console.log(status);
    console.log(processNote);
    const ticketUpdate = {
      patchDocument: [
        {
          op: "replace",
          path: "/status",
          value: status,
        },
        {
          op: "replace",
          path: "/processNote",
          value: processNote,
        },
      ],
    };
    if (!logLeave) return;

    agent.LogLeave.patch(parseInt(id!), logLeave!.staffId, ticketUpdate.patchDocument)
      .then((response) => {
        setLogLeaveAdded(true);
        console.log("Ticket updated successfully: ", response);
        toast.success("Duyệt đơn thành công 😊");
      })
      .catch((error) => {
        console.log("Error updating ticket: ", error);
        toast.error("Xảy ra lỗi khi duyệt đơn 😥");
      });
  };

  if (!logLeave || !leaveDayDetail) {
    return <MyTicketDetailSkeleon />;
  }
  //#endregion ===========================HANDLE ACTION======================================
  return (
    <>
      <Box sx={{ paddingLeft: "10%", mt: "0%", paddingRight: "10%" }}></Box>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <Grid container justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "40px", fontWeight: "700", fontFamily: fontStyle }}>
            Đơn của {`${logLeave?.staff.lastName} ${logLeave?.staff.firstName}`}
          </Typography>
          <Box display={"flex"} alignItems={"flex-end"}>
            {logLeave?.enable ? (
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
                  onClick={handleLeaveApproval}
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
              title={`Hủy ${logLeave.leaveType.leaveTypeName.toLowerCase()}`}
              content="Bạn sẽ không thể chỉnh sửa đơn này sau khi đã hủy"
              action={handleLeaveApproval}
            />
          </Box>
        </Grid>

        <Box sx={{ borderBottom: "2px solid #333333", mb: "4%", mt: "1%" }}></Box>

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã nhân viên"
          defaultValue={`STF-${logLeave?.staff.staffId.toString().padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã đơn"
          defaultValue={`LE-${logLeave?.leaveLogId.toString().padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Tên nhân viên"
          defaultValue={`${logLeave?.staff.firstName} ${logLeave?.staff.lastName}`}
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
          defaultValue={logLeave.leaveType.leaveTypeName}
          disabled
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày bắt đầu"
          defaultValue={
            logLeave?.leaveStart
              ? `${moment(logLeave?.leaveStart).format("MMM Do, YYYY")}`
              : ""
          }
          disabled={true}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày kết thúc"
          defaultValue={
            logLeave?.leaveEnd ? `${moment(logLeave?.leaveEnd).format("MMM Do, YYYY")}` : ""
          }
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Nội dung đơn"
          defaultValue={`${logLeave?.description}`}
          disabled
          onChange={debouncedDescriptionInput}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày gửi đơn"
          defaultValue={`${moment(logLeave?.createAt).format("MMM Do, YYYY")}`}
          disabled={true}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Thời gian thay đổi"
          defaultValue={
            logLeave?.changeStatusTime
              ? `${moment(logLeave?.changeStatusTime).format("MMM Do, YYYY")}`
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
              defaultValue={logLeave?.status}
              InputProps={textFieldInputProps}
              variant="standard"
              onChange={handleStatusChange}
              select
            >
              <MenuItem value={"approved"}>
                <ChipCustome status="approved">Chấp nhận</ChipCustome>
              </MenuItem>
              <MenuItem value={"pending"}><ChipCustome status="pending">Chờ duyệt</ChipCustome></MenuItem>
              <MenuItem value={"rejected"}><ChipCustome status="rejected">Từ chối</ChipCustome></MenuItem>
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
            defaultValue={logLeave?.processNote}
            onChange={debouncedProcessNoteInput}
          />
        </Grid>
      </Container >
    </>
  );
}

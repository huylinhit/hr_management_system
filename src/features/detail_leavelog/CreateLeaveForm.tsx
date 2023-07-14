import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { debounce, Box, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { setLogLeaveAdded } from "./logleaveSlice";
import { fetchLeaveDayDetailAsync } from "./leaveDayDetailSlice";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs, { Dayjs } from "dayjs";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { styled } from "@mui/material/styles";
import { current } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import { fetchUserInforsAsync, userInforSelectors } from "../department/userInforSlice";

interface Props {
  isOwn?: boolean;
  open: boolean;
  onClose: () => void;
}

const fontStyle = "Mulish";
const headerColor = {
  color: "#808080",
};
const verticalSpacing = {
  mb: "10px",
};
const headerStyle = {
  fontWeight: 600,
  fontFamily: fontStyle,
  width: "250px",
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
  "& .MuiInputAdornment-root": {
    // Customize the Adornment styles as needed
    position: "absolute",
    right: 0,
    visibility: "hidden", // Set the initial visibility to visible
  },
  "& .MuiIconButton-root": {
    // Customize the IconButton styles as needed
    padding: theme.spacing(1),
    color: "#A9A9A9",
  },
  "&:focus-within .MuiInputAdornment-root": {
    visibility: "hidden", // Hide the button when the field or any of its descendants is focused
  },
  "&:hover .MuiInputAdornment-root": {
    visibility: "visible",
  },
}));
const textFieldInputProps = {
  disableUnderline: true,
  style: {
    ...infoStyle,
  },
};
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
export default function CreateLeaveForm({ isOwn, open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState(2);
  const [isTicketTypeEmpty, setIsTicketTypeEmpty] = useState(false);
  const [isReasonEmpty, setIsReasonEmpty] = useState(false);
  const [reason, setReason] = useState("");
  const { leaveDayDetail, leaveDayDetailLoaded } = useAppSelector((state) => state.leaveDayDetail);


  


  const today = dayjs().startOf("day");
  const minEndDate = today.add(1, "day").startOf("day");
  const [startDate, setStartDate] = useState<Date>(today.toDate());
  const [endDate, setEndDate] = useState<Date>(minEndDate.toDate());
  const currentUser = useAppSelector((state) => state.account);
  const users = useAppSelector(userInforSelectors.selectAll);
  const { userInforsLoaded, status } = useAppSelector((state) => state.userInfor);
  const [selectedUser, setSelectedUser] = useState<number>(1);
  useEffect(() => {
    if (!userInforsLoaded) dispatch(fetchUserInforsAsync());
  }, [userInforsLoaded]);

  useEffect(() => {
    if ((currentUser.user && !leaveDayDetailLoaded) || selectedUser) {
      if (isOwn) {
        dispatch(fetchLeaveDayDetailAsync(currentUser.user!.userInfor.staffId));
      } else {
        dispatch(fetchLeaveDayDetailAsync(selectedUser));
      }
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (!leaveDayDetail) return;
    // setSelectedLeaveTypeId(leaveDayDetail[0].leaveTypeId);
  }, [leaveDayDetail]);

  console.log(selectedLeaveTypeId);
  const handleLeaveChange = (event: any) => {
    const selectedOption = leaveDayDetail!.find(
      (option) => option.leaveType.leaveTypeName === event.target.value
    );
    setSelectedLeaveTypeId(selectedOption!.leaveTypeId);
    if (selectedOption) {
      setIsTicketTypeEmpty(false);
    }
  };

  const handleSelectedUser = (e: any) => {
    setSelectedUser(e.target.value);
  };

  const handleSetStartDate = (event: any) => {
    setStartDate(event);
    if (dayjs(endDate).isBefore(event, "day")) {
      setEndDate(event.add(1, "day"));
    }
  };
  const debouncedReasonInput = debounce((event: any) => {
    setReason(event.target.value);
    setIsReasonEmpty(false);
  }, 500);

  const handleCreateTicket = () => {
    console.log(selectedLeaveTypeId);
    console.log(startDate);
    console.log(endDate);
    console.log(reason);
    console.log(currentUser.user?.userInfor.staffId);
    const logLeaveCreate = {
      leaveTypeId: selectedLeaveTypeId,
      leaveStart: startDate,
      leaveEnd: endDate,
      description: reason,
    };

    if (selectedLeaveTypeId == 0) {
      setIsTicketTypeEmpty(true);
    }
    if (reason == "") {
      setIsReasonEmpty(true);
    }
    if (!currentUser.user) return;

    if (isOwn) {
      agent.LogLeave.create(currentUser.user?.userInfor.staffId, logLeaveCreate)
        .then((response) => {
          console.log("Ticket created successfully: ", response);
          toast.success("Tạo đơn thành công 😊");
          dispatch(setLogLeaveAdded(true));
        })
        .catch((error) => {
          toast.error("Xảy ra lỗi khi tạo đơn 😥");
          console.error("Error creating ticket: ", error);
        });
    } else {
      agent.LogLeave.create(selectedUser, logLeaveCreate)
        .then((response) => {
          console.log("Ticket created successfully: ", response);
          toast.success("Tạo đơn thành công 😊");
          dispatch(setLogLeaveAdded(true));
        })
        .catch((error) => {
          toast.error("Xảy ra lỗi khi tạo đơn 😥");
          console.error("Error creating ticket: ", error);
        });
    }
    onClose();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFileButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  if (!currentUser.user || !leaveDayDetail) return <></>;
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
        <DialogTitle
          sx={{ fontWeight: 700, fontSize: 22, fontFamily: "Mulish" }}
          display={"flex"}
          alignItems={"center"}
        >
          Tạo đơn nghỉ phép
        </DialogTitle>

        <DialogContent>
          <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
            <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
            {isOwn === true ? (
              <>
                <Typography sx={{ width: "172px" }}>Nhân viên</Typography>
              </>
            ) : (
              <>
                <Typography sx={{ ...headerStyle, ...headerColor }}>Nhân viên</Typography>
              </>
            )}
            {isOwn === true ? (
              <>
                <Typography>
                  {currentUser?.user.userInfor.lastName} {currentUser?.user.userInfor.firstName}{" "}
                  MSNV: {currentUser?.user.userInfor.staffId}
                </Typography>
              </>
            ) : (
              // <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
              <>
                {users.length !== 0 && (
                  <BootstrapInput
                    fullWidth
                    InputProps={textFieldInputProps}
                    variant="standard"
                    onChange={handleSelectedUser}
                    value={selectedUser}
                    select
                  >
                    {users.map((item) => (
                      <MenuItem key={item.staffId} value={item.staffId}>
                        {`${item.lastName} ${item.firstName} (MSNV: ${item.staffId})`}
                      </MenuItem>
                    ))}
                  </BootstrapInput>
                )}
              </>
              // </Box>
            )}
          </Box>

          <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
            <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
            <Typography sx={{ ...headerStyle, ...headerColor }}>Loại đơn</Typography>
            {leaveDayDetail ? (
              <BootstrapInput
                fullWidth
                InputProps={textFieldInputProps}
                // defaultValue={leaveDayDetail[0].leaveType.leaveTypeName.trim()}
                variant="standard"
                onChange={handleLeaveChange}
                select
              >
                {leaveDayDetail.map((option) => (
                  <MenuItem key={option.leaveDayDetailId} value={option.leaveType.leaveTypeName}>
                    {`${option.leaveType.leaveTypeName} (còn ${option.dayLeft} ngày)`}
                  </MenuItem>
                ))}
              </BootstrapInput>
            ) : (
              <></>
            )}
          </Box>

          <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
            <CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />
            <Typography sx={headerStyle}>Ngày bắt đầu</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ButtonDatePicker
                minDate={today}
                label={`${
                  dayjs(startDate) === null ? "Trống" : dayjs(startDate).format("MMM DD, YYYY")
                }`}
                value={dayjs(
                  new Date(
                    dayjs(startDate)
                      .toDate()
                      .setMinutes(
                        dayjs(startDate).toDate().getMinutes() +
                          dayjs(startDate).toDate().getTimezoneOffset()
                      )
                  )
                )}
                onChange={handleSetStartDate}
              />
            </LocalizationProvider>
          </Box>

          <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
            <CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />
            <Typography sx={headerStyle}>Ngày kết thúc</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ButtonDatePicker
                label={`${
                  dayjs(endDate) === null ? "Trống" : dayjs(endDate).format("MMM DD, YYYY")
                }`}
                minDate={dayjs(startDate).add(1, "day")}
                value={dayjs(
                  new Date(
                    dayjs(endDate)
                      .toDate()
                      .setMinutes(
                        dayjs(endDate).toDate().getMinutes() +
                          dayjs(endDate).toDate().getTimezoneOffset()
                      )
                  )
                )}
                onChange={(newValue: any) => setEndDate(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ borderBottom: "1px solid #C4C4C4", mt: "20px", mb: "1%" }}></Box>

          <TextField
            sx={{
              width: "100%",
            }}
            variant="standard"
            multiline
            label="Nhập lí do..."
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: fontStyle },
            }}
            onChange={debouncedReasonInput}
          />
          {/* <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Lí do
            </Typography>
            <TextField
              id="title"
              multiline
              defaultValue={""}
              variant="standard"
              sx={{ mt: 1, width: "72%" }}
              error={isReasonEmpty}
              onChange={debouncedReasonInput}
            />
          </Box> */}
          {/* {isTicketTypeEmpty ? (
            <Typography sx={{ mt: "5%" }} color={"error"}>
              *Nhập đầy đủ thông tin
            </Typography>
          ) : (
            ""
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={handleCreateTicket} autoFocus>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

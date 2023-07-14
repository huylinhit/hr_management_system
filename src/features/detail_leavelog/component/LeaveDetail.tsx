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
  import ArrowRightIcon from "@mui/icons-material/ArrowRight";
  import moment from "moment";
  import { styled } from "@mui/material/styles";
  import SubjectIcon from "@mui/icons-material/Subject";
  import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
  import React from "react";
  import PhoneIcon from "@mui/icons-material/Phone";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import NumbersIcon from "@mui/icons-material/Numbers";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import DownloadIcon from "@mui/icons-material/Download";
  import AttachFileIcon from "@mui/icons-material/AttachFile";
  import UploadFileIcon from "@mui/icons-material/UploadFile";
  
  import {ToastContainer, toast } from "react-toastify";
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
import MyTicketDetailSkeleon from "../../othertypes/MyTicketDetailSkeleton";
import { fetchLeaveDayDetailAsync } from "../leaveDayDetailSlice";
import { logleaveSelectors, fetchLogLeaveAsync, setLogLeaveAdded } from "../logleaveSlice";
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
  export default function LeaveDetail({ open, handleClose, handleChange }: any) {
    const { leaveId, staffId } = useParams();
  
    const logLeave = useAppSelector((state) => logleaveSelectors.selectById(state, leaveId!));

    console.log("here: ",logLeave);




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
    const currentUser = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const location = useLocation();
  
    //#region ==============================USE EFFECT=====================================
    //Set header title
    useEffect(() => {
      if (logLeave) {
        dispatch(
          setHeaderTitle([
            { title: "Đơn nghỉ phép của tôi", path: "/myleaves" },
            { title: "Chỉnh sửa đơn", path: "" },
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
  
      const logLeaveId = parseInt(leaveId!);
      const staffId = currentUser.user?.userInfor.staffId;
  
      if ((!logLeave && leaveId && staffId) || ticketChanged) {
        dispatch(fetchLogLeaveAsync({ logLeaveId, staffId }));
        setTicketChanged(false);
      }
    }, [leaveId, logLeave, dispatch, ticketChanged]);
  
    //Get leave day detail
    useEffect(() => {
      if (currentUser.user && !leaveDayDetailLoaded)
        dispatch(fetchLeaveDayDetailAsync(currentUser.user.userInfor.staffId));
    }, [dispatch]);
    //#endregion ==============================USE EFFECT=====================================
  
    //#region ===========================HANDLE ACTION======================================
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
  
  
    const handleTicketApproval = () => {
      console.log(selectedLeaveTypeId);
      console.log(startDate);
      console.log(endDate);
      console.log(description);
      const ticketUpdate = {
        patchDocument: [
          {
            op: "replace",
            path: "/leaveTypeId",
            value: selectedLeaveTypeId,
          },
          {
            op: "replace",
            path: "/leaveStart",
            value: startDate,
          },
          {
            op: "replace",
            path: "/leaveEnd",
            value: endDate,
          },
          {
            op: "replace",
            path: "/description",
            value: description,
          },
        ],
      };
      if (!currentUser.user) return;
  
      agent.LogLeave.patch(
        parseInt(leaveId!),
        currentUser.user?.userInfor.staffId,
        ticketUpdate.patchDocument
      )
        .then((response) => {
          setLogLeaveAdded(true);
          console.log("Ticket updated successfully: ", response);
          toast.success("Cập nhật đơn thành công 😊");
        })
        .catch((error) => {
          console.log("Error updating ticket: ", error);
          toast.error("Xảy ra lỗi khi cập nhật 😥");
        });
    };
  
    const handleCancelTicket = () => {
      const ticketCancel = {
        patchDocument: [
          {
            op: "replace",
            path: "/enable",
            value: false,
          },
        ],
      };
      if (!currentUser.user) return;
  
      agent.LogLeave.patch(
        parseInt(leaveId!),
        currentUser.user?.userInfor.staffId,
        ticketCancel.patchDocument
      )
        .then((response) => {
          console.log("Ticket cancelled successfully: ", response);
          setTicketChanged(true);
          toast.success("Hủy đơn thành công 😊");
        })
        .catch((error) => {
          console.log("Error cancelling ticket", error);
          toast.error("Xảy ra lỗi khi hủy đơn 😥");
        });
      handleCloseConfirm();
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
              Đơn của {`${logLeave?.staff.firstName} ${logLeave?.staff.lastName}`}
            </Typography>
            <Box display={"flex"} alignItems={"flex-end"}>
              {logLeave?.enable ? (
                <>
                  <Button
                    variant="text"
                    color="error"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      fontFamily: fontStyle,
                    }}
                    disableElevation={true}
                    onClick={handleClickOpenConfirm}
                  >
                    Hủy đơn
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "#007FFF",
                      fontFamily: fontStyle,
                    }}
                    disableElevation={true}
                    onClick={handleTicketApproval}
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
                action={handleCancelTicket}
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
  
          {/* <InforRow
            icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
            header="Người duyệt đơn"
            defaultValue={`${logLeave?.respondenceName ? logLeave.respondenceName : ""}`}
            disabled={true}
          /> */}
  
          <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
            <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
            <Typography sx={{ ...headerStyle, ...headerColor }}>Loại đơn</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <BootstrapInput
                fullWidth
                defaultValue={leaveDayDetail[0].leaveType.leaveTypeName.trim()}
                InputProps={textFieldInputProps}
                variant="standard"
                onChange={handleLeaveChange}
                select
                sx={{ ...infoStyle }}
              >
                {leaveDayDetail.map((option) => (
                  <MenuItem key={option.leaveDayDetailId} value={option.leaveType.leaveTypeName}>
                    {`${option.leaveType.leaveTypeName} (còn ${option.dayLeft} ngày)`}
                  </MenuItem>
                ))}
              </BootstrapInput>
            </Box>
          </Box>
  
          <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
            <CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />
            <Typography sx={headerStyle}>Ngày bắt đầu</Typography>
            <Box sx={{ flexGrow: 1 }}>
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
          </Box>
  
          <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
            <CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />
            <Typography sx={headerStyle}>Ngày kết thúc</Typography>
            <Box sx={{ flexGrow: 1 }}>
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
          </Box>
  
          <InforRow
            icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
            header="Nội dung đơn"
            defaultValue={`${logLeave?.description}`}
            disabled={logLeave?.status !== "Pending"}
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
  
          <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
            <SubjectIcon fontSize="small" sx={{ mr: "5px" }} />
            <Typography sx={headerStyle}>Trạng thái</Typography>
            {logLeave?.status === "Approved" ? (
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
                Approved
              </Typography>
            ) : logLeave?.status === "Pending" ? (
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
                Pending
              </Typography>
            ) : logLeave?.status === "Rejected" ? (
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
                Rejected
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
                Cancelled
              </Typography>
            )}
          </Box>
  
          <Box sx={{ borderBottom: "1px solid #C4C4C4", mt: "5%", mb: "1%" }}></Box>
  
          <Grid item xs={9}>
            <ProcessNoteInput
              sx={infoStyle}
              fullWidth
              variant="standard"
              multiline
              InputProps={{
                disableUnderline: true,
                style: { fontFamily: fontStyle },
              }}
              defaultValue={logLeave?.processNote ? `${logLeave?.processNote}` : ""}
              disabled
            />
          </Grid>
        </Container>
      </>
    );
  }
  
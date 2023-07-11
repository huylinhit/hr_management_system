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
import { fetchTicketAsync, ticketsSelectors } from "./ticketSlice";
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
import MyTicketDetailSkeleon from "./MyTicketDetailSkeleton";
import { fetchTicketTypesAsync } from "./ticketTypeSlice";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../../app/layout/ConfirmDialog";
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
export default function MyTicketDetails({ open, handleClose, handleChange }: any) {
  const { id } = useParams<{ id: string }>();

  const ticket = useAppSelector((state) => ticketsSelectors.selectById(state, id!));
  const { ticketTypes, ticketTypesLoaded } = useAppSelector((state) => state.ticketType);
  const [ticketStatus, setTicketStatus] = useState(ticket?.ticketStatus);
  const formattedTicketId = `TK-${ticket?.ticketId.toString().padStart(5, "0")}`;
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState(ticket?.ticketTypeId);
  const [ticketReason, setTicketReason] = useState(ticket?.ticketReason);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ticketFile, setTicketFile] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [ticketChanged, setTicketChanged] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const storageRef = ref(
    storage,
    `staffsTicketFile/STF${ticket?.staffId.toString().padStart(5, "0")}TK-${ticket?.ticketId
      .toString()
      .padStart(5, "0")}`
  );

  //#region ==============================USE EFFECT=====================================
  //Set header title
  useEffect(() => {
    if (ticket) {
      dispatch(
        setHeaderTitle([
          { title: "Đơn khác của tôi", path: "/mytickets" },
          { title: "Chỉnh sửa đơn", path: "" },
        ])
      );
    }
  }, [dispatch, location, ticket]);

  //Set default value when reload page
  useEffect(() => {
    if (ticket) {
      setTicketStatus(ticket.ticketStatus);
      setSelectedTicketTypeId(ticket.ticketTypeId);
      setTicketReason(ticket.ticketReason);
    }
  }, [ticket]);

  //Get ticket file
  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setTicketFile(url);
      })
      .catch((error) => {});
  }, [ticket]);
  console.log(ticketFile);

  //Get this ticket
  useEffect(() => {
    if ((!ticket && id) || ticketChanged) {
      dispatch(fetchTicketAsync(parseInt(id!)));
      setTicketChanged(false);
    }
  }, [id, ticket, dispatch, ticketChanged]);

  //Get ticket types
  useEffect(() => {
    if (!ticketTypes) {
      dispatch(fetchTicketTypesAsync());
    }
  }, [ticketTypesLoaded]);
  //#endregion ==============================USE EFFECT=====================================

  //#region ===========================HANDLE ACTION======================================
  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const files = event.dataTransfer.files;
    setSelectedFile(files[0]);
    // Handle the dropped files here
    console.log(files[0]);
  };
  const debouncedReasonInput = debounce((event: any) => {
    setTicketReason(event.target.value);
  }, 750);

  //Initially get ticket on Firebase

  const handleTicketChange = (event: any) => {
    const selectedOption = ticketTypes!.find((option) => option.ticketName === event.target.value);
    setSelectedTicketTypeId(selectedOption!.ticketTypeId);
  };
  const handleUploadFile = (id: number) => {
    if (selectedFile == null) return;
    const fileRef = ref(
      storage,
      `staffsTicketFile/STF${ticket?.staffId.toString().padStart(5, "0")}TK-${ticket?.ticketId
        .toString()
        .padStart(5, "0")}`
    );
    uploadBytes(fileRef, selectedFile).then(() => {
      console.log("GOOD");
    });
  };

  const handleTicketApproval = () => {
    console.log(selectedTicketTypeId);
    console.log(ticketReason);
    const ticketUpdate = {
      ticketTypeId: selectedTicketTypeId,
      ticketReason: ticketReason,
    };
    agent.Ticket.update(parseInt(id!), ticketUpdate)
      .then((response) => {
        handleUploadFile(response.staffId);
        setTicketChanged(true);
        console.log("Ticket updated successfully: ", response);
        toast.success("Cập nhật đơn thành công 😊");
      })
      .catch((error) => {
        console.log("Error updating ticket: ", error);
        toast.error("Xảy ra lỗi khi cập nhật 😥");
      });
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    console.log("Selected file:", file);
  };
  const handleAddFileButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDownload = async (event: any) => {
    event.stopPropagation();
    try {
      const downloadUrl = await getDownloadURL(storageRef);
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const handleCancelTicket = () => {
    agent.Ticket.cancel(parseInt(id!))
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
  if (!ticket || !ticketTypes) {
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
            Đơn của {ticket?.staffName}
          </Typography>
          <Box display={"flex"} alignItems={"flex-end"}>
            {ticket?.enable ? (
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
              title={`Hủy ${ticket.ticketName.toLowerCase()}`}
              content="Bạn sẽ không thể chỉnh sửa đơn này sau khi đã hủy"
              action={handleCancelTicket}
            />
          </Box>
        </Grid>

        <Box sx={{ borderBottom: "2px solid #333333", mb: "4%", mt: "1%" }}></Box>

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã nhân viên"
          defaultValue={`STF-${ticket?.staffId.toString().padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã đơn"
          defaultValue={`TK-${ticket?.ticketId.toString().padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Tên nhân viên"
          defaultValue={`${ticket?.staffName}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Người duyệt đơn"
          defaultValue={ticket?.responsdenceName ? `${ticket?.responsdenceName}` : ""}
          disabled={true}
        />

        <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
          <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
          <Typography sx={{ ...headerStyle, ...headerColor }}>Loại đơn</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <BootstrapInput
              fullWidth
              defaultValue={ticket?.ticketName.trim()}
              InputProps={textFieldInputProps}
              variant="standard"
              onChange={handleTicketChange}
              select
              sx={{ ...infoStyle }}
              disabled={ticket?.ticketStatus !== "Chờ duyệt"}
            >
              {ticketTypes?.map((option) => (
                <MenuItem key={option.ticketTypeId} value={option.ticketName.trim()}>
                  {option.ticketName}
                </MenuItem>
              ))}
            </BootstrapInput>
          </Box>
        </Box>

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Nội dung đơn"
          defaultValue={`${ticket?.ticketReason}`}
          disabled={ticket?.ticketStatus !== "Chờ duyệt"}
          onChange={debouncedReasonInput}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Ngày gửi đơn"
          defaultValue={`${moment(ticket?.createAt).format("MMM Do, YYYY")}`}
          disabled={true}
        />

        <InforRow
          icon={<CalendarMonthIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Thời gian thay đổi"
          defaultValue={
            ticket?.changeStatusTime
              ? `${moment(ticket?.changeStatusTime).format("MMM Do, YYYY")}`
              : ""
          }
          disabled={true}
        />

        <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
          <SubjectIcon fontSize="small" sx={{ mr: "5px" }} />
          <Typography sx={headerStyle}>Trạng thái</Typography>
          {ticket?.ticketStatus === "Chấp nhận" ? (
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
          ) : ticket?.ticketStatus === "Chờ duyệt" ? (
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
          ) : ticket?.ticketStatus === "Từ chối" ? (
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

        {ticket?.enable ? (
          <Box sx={{ ...fieldStyle, mt: "20px" }}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelected}
            />
            <Button
              fullWidth
              onClick={handleAddFileButton}
              sx={{
                textTransform: "none",
                color: "#A9A9A9",
                backgroundColor: "#F3F2F1",
                borderColor: "#B8B8B8",
                "&:hover": {
                  backgroundColor: "#D7D7D7",
                  color: "#979797",
                  borderColor: "#E2E2E2",
                },
                "&:active": {
                  backgroundColor: "#DFDFDF",
                  borderColor: "#DFDFDF",
                  color: "#858585",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "50px",
                  //border: `3px dashed ${dragging ? "green" : "#808080"}`,

                  borderRadius: "5px",
                  display: "flex",
                  //flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pl: "10px",
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Box
                  sx={{
                    display: "flex",
                    //flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <UploadFileIcon
                    sx={{
                      mr: "10px",
                      fontSize: "35px",
                      color: `${dragging ? "green" : "#808080"} `,
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "18px",
                      fontFamily: fontStyle,
                      color: "#808080",
                    }}
                  >
                    {ticketFile
                      ? "Tải File đính kèm hoặc đổi file khác"
                      : selectedFile
                      ? selectedFile.name
                      : "Kéo & thả File đính kèm vào đây"}
                  </Typography>
                </Box>
                {ticketFile ? (
                  <IconButton onClick={handleDownload}>
                    <DownloadIcon />
                  </IconButton>
                ) : (
                  <></>
                )}
              </Box>
            </Button>
          </Box>
        ) : (
          <></>
        )}

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
            defaultValue={ticket?.processNote ? `${ticket?.processNote}` : ""}
            disabled
          />
        </Grid>
      </Container>
    </>
  );
}

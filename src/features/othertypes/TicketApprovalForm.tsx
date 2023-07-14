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
import { ReactNode, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { ticketsSelectors } from "./ticketSlice";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import agent from "../../app/api/agent";
import moment from "moment";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import DownloadIcon from "@mui/icons-material/Download";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
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
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
};
const infoStyle = {
  fontWeight: 500,
  fontFamily: fontStyle,
  color: "#6D6D6D",
};
const verticalSpacing = {
  mb: "2%",
};
const styles = {
  marginBottom: "10px",
};

export default function TicketApprovalForm({ open, handleClose, handleChange }: any) {
  const { id } = useParams<{ id: string }>();
  const [processNote, setProcessNote] = useState("");
  const ticket = useAppSelector((state) => ticketsSelectors.selectById(state, id!));
  const [ticketStatus, setTicketStatus] = useState(ticket?.ticketStatus);
  const formattedTicketId = `TK-${ticket?.ticketId.toString().padStart(5, "0")}`;
  const dispatch = useAppDispatch();
  const [ticketFile, setTicketFile] = useState("");
  const location = useLocation();

  const storageRef = ref(
    storage,
    `staffsTicketFile/STF${ticket?.staffId.toString().padStart(5, "0")}TK-${ticket?.ticketId
      .toString()
      .padStart(5, "0")}`
  );
  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setTicketFile(url);
      })
      .catch((error) => {});
  }, [ticket]);
  console.log(ticketFile);
  
  useEffect(() => {
    dispatch(
      setHeaderTitle([
        { title: "Đơn khác của nhân viên", path: "/log-leaves" },
        { title: "Phản hồi đơn", path: "" },
      ])
    );
  }, [location, dispatch]);
  const debouncedReasonInput = debounce((event: any) => {
    setProcessNote(event.target.value);
  }, 750);

  useEffect(() => {}, [id]);

  const handleStatusChange = (event: any) => {
    setTicketStatus(event.target.value);
  };

  const handleTicketApproval = () => {
    console.log(ticketStatus);
    const ticketUpdate = {
      ticketStatus: ticketStatus,
      processNote: processNote,
    };
    agent.Ticket.updateStatus(parseInt(id!), ticketUpdate)
      .then((response) => {
        console.log("Ticket created successfully: ", response);
      })
      .catch((error) => {
        console.log("Error creating ticket: ", error);
      });
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
      })
      .catch((error) => {
        console.log("Error cancelling ticket", error);
      });
  };
  return (
    <Box sx={{ paddingLeft: "20%", mt: "20px", paddingRight: "20%" }}>
      {/* <Grid container spacing={0} alignContent="center">
        <Grid item>
          <Button
            variant="text"
            sx={navStyle}
            disableElevation={true}
            component={NavLink}
            to={`/otheruserstickets`}
            key={"/otheruserstickets"}
          >
            Danh sách đơn khác
          </Button>
        </Grid>

        <Grid item>
          <ArrowRightIcon sx={{ mt: 0.6, padding: 0 }} fontSize="large" />
        </Grid>

        <Grid item>
          <Button variant="text" sx={navStyle} disableElevation={true}>
            Phản hồi đơn
          </Button>
        </Grid>
      </Grid> */}
      <Grid container justifyContent={"space-between"}>
        <Typography sx={{ fontSize: "40px", fontWeight: "700", fontFamily: fontStyle }}>
          Đơn của {ticket?.staffName}
        </Typography>
        <Box display={"flex"} alignItems={"flex-end"}>
          <Button
            variant="text"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color: "#8A8A8A",
              fontFamily: fontStyle,
            }}
            disableElevation={true}
          >
            Quay lại
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
        </Box>
      </Grid>
      <Box sx={{ borderBottom: "2px solid #333333", mb: "4%", mt: "1%" }}></Box>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Mã đơn</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={infoStyle}>TK-{ticket?.ticketId.toString().padStart(5, "0")}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Mã số nhân viên</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={infoStyle}>STF-{ticket?.staffId.toString().padStart(5, "0")}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Tên nhân viên</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={infoStyle}>{ticket?.staffName}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Loại đơn</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={infoStyle}>{ticket?.ticketName}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Nội dung đơn</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={infoStyle}>{ticket?.ticketReason}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Ngày gửi đơn</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={infoStyle}>
            {moment(ticket?.changeStatusTime).format("MMM Do, YYYY, HH:mm")}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={verticalSpacing}>
        <Grid item xs={3}>
          <Typography sx={headerStyle}>Trạng thái</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            select
            sx={{ width: "20%", fontStyle: "Mulish" }}
            variant="standard"
            defaultValue={ticket?.ticketStatus}
            onChange={handleStatusChange}
          >
            <MenuItem sx={menuItemStyle} value={"Chờ duyệt"}>
              Chờ duyệt
            </MenuItem>
            <MenuItem sx={menuItemStyle} value={"Chấp nhận"}>
              Chấp nhận
            </MenuItem>
            <MenuItem sx={menuItemStyle} value={"Từ chối"}>
              Từ chối
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, mt: "20px" }}>
        <Button
          disabled={ticketFile === ""}
          fullWidth
          onClick={handleDownload}
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
          >
            <Box
              sx={{
                display: "flex",
                //flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DownloadIcon
                sx={{
                  mr: "10px",
                  fontSize: "35px",
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
                {ticketFile ? "Tải File đính kèm" : "Chưa có File đính kèm"}
              </Typography>
            </Box>
          </Box>
        </Button>
      </Box>
      <Box sx={{ borderBottom: "1px solid #C4C4C4", mt: "20px", mb: "1%" }}></Box>
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
          defaultValue={ticket?.processNote}
          onChange={debouncedReasonInput}
        />
      </Grid>
      {/* <Box display={"flex"} justifyContent={"flex-end"}>
          <Button onClick={handleClose} variant="outlined" sx={{ mr: "3%" }}>
            Hủy
          </Button>
          <Button onClick={handleClose} variant="contained">
            Xác nhận
          </Button>
        </Box> */}
    </Box>
  );
}

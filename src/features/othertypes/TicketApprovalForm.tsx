import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
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
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { ticketsSelectors } from "./ticketSlice";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import agent from "../../app/api/agent";
import moment from "moment";
import "../../app/layout/App.css";

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
 
  return (
    <Container maxWidth="xl" sx={{mt: "5%"}}>
      <Grid container spacing={0} alignContent="center">
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
          <Button
            variant="text"
            sx={navStyle}
            disableElevation={true}
          >
            Phản hồi đơn
          </Button>
        </Grid>
      </Grid>

      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
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
            <Typography sx={infoStyle}>
              TK-{ticket?.ticketId.toString().padStart(5, "0")}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={verticalSpacing}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Mã số nhân viên</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={infoStyle}>
              STF-{ticket?.staffId.toString().padStart(5, "0")}
            </Typography>
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
              {moment(ticket?.changeStatusTime).format("MMM Do, YYYY, HH:mm")};
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
              style: { fontFamily: fontStyle},
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
      </Container>
    </Container>
  );
}

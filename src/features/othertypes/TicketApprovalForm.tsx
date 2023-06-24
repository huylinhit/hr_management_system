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
const headerStyle = {
  fontWeight: "bold",
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
    <Container maxWidth="xl">
      <Box display={"flex"} alignItems={"center"} sx={{ mt: "6%", mb: "1%" }}>
        <Button
          variant="text"
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            textTransform: "none",
            color: "#333333",
            borderRadius: "10px",
            padding: "0px 10px 0px 10px",
            "&:hover": {
              backgroundColor: "#F8F8F8", // Set the hover background color
            },
          }}
          disableElevation={true}
          component={NavLink}
          to={`/otheruserstickets`}
          key={"/otheruserstickets"}
        >
          Danh sách đơn khác
        </Button>
        <ArrowRightIcon sx={{ padding: 0 }} fontSize="large" />
        <Button
          variant="text"
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            textTransform: "none",
            color: "#333333",
            borderRadius: "10px",
            padding: "0px 10px 0px 10px",
            "&:hover": {
              backgroundColor: "#F8F8F8", // Set the hover background color
            },
          }}
          disableElevation={true}
          component={NavLink}
          to={`/departments`}
          key={"/departments"}
        >
          Phản hồi đơn
        </Button>
      </Box>

      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <Grid container justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
            Đơn của {ticket?.staffName}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              variant="text"
              sx={{ fontWeight: "bold", textTransform: "none", color: "#8A8A8A" }}
              disableElevation={true}
            >
              Quay lại
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: "bold", textTransform: "none", color: "#007FFF" }}
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
            <Typography>TK-{ticket?.ticketId.toString().padStart(5, "0")}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={verticalSpacing}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Mã số nhân viên</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>STF-{ticket?.staffId.toString().padStart(5, "0")}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={verticalSpacing}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Tên nhân viên</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{ticket?.staffName}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={verticalSpacing}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Loại đơn</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{ticket?.ticketName}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={verticalSpacing}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Nội dung đơn</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{ticket?.ticketReason}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={verticalSpacing}>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Ngày gửi đơn</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              {moment(ticket?.changeStatusTime).format('MMM Do, YYYY, HH:mm')};
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
              sx={{ width: "20%" }}
              variant="standard"
              defaultValue={ticket?.ticketStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value={"Chờ duyệt"}>Chờ duyệt</MenuItem>
              <MenuItem value={"Chấp nhận"}>Chấp nhận</MenuItem>
              <MenuItem value={"Từ chối"}>Từ chối</MenuItem>
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

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { debounce, Box, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

export default function CreateTicketTypeForm() {
  const [open, setOpen] = React.useState(false);
  const [ticketName, setTicketName] = useState("");

  const debouncedTypeNameInput = debounce((event: any) => {
    setTicketName(event.target.value);
  }, 1000);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTicket = () => {
    console.log(ticketName);
    const ticketTypeCreate = {
      TicketName: ticketName,
    };
    agent.TicketType.create(ticketTypeCreate)
      .then((response) => {
        console.log("Ticket Type created successfully", response);
      })
      .catch((error) => {
        console.error("Error creating ticket type: ", error);
      });
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Tạo loại đơn
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 550, fontSize: 20 }} display={"flex"} alignItems={"center"}>
          Tạo mới loại đơn
        </DialogTitle>

        <DialogContent>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Tên đơn
            </Typography>
            <TextField
              id="ticketName"
              sx={{ mt: 1, width: "72%" }}
              variant="standard"
              onChange={debouncedTypeNameInput}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleCreateTicket} autoFocus>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

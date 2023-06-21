import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { debounce, Box, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";

export default function CreateTicketForm() {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitleName] = useState("");
  const [reason, setReason] = useState("");
  const currentUser = useAppSelector((state) => state.account);
  console.log(currentUser.user?.userInfor.staffId);
  const debouncedTitleInput = debounce((event: any) => {
    setTitleName(event.target.value);
  }, 1000);

  const debouncedReasonInput = debounce((event: any) => {
    setReason(event.target.value);
  }, 1000);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTicket = () => {
    console.log(title);
    console.log(reason);
    const ticketCreate = {};
  };
  const currencies = [
    {
      value: "type1",
      label: "Đơn xin tăng lương",
    },
    {
      value: "typ2",
      label: "Đơn kiến nghị",
    },
  ];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFileButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    console.log("Selected file:", file);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Ticket
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 550, fontSize: 20 }} display={"flex"} alignItems={"center"}>
          Tạo đơn khác
        </DialogTitle>

        <DialogContent>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Loại đơn
            </Typography>
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="EUR"
              sx={{mt:1,width:"72%"}}
              variant="standard"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Lí do
            </Typography>
            <TextField
              id="title"
              multiline
              variant="standard"
              sx={{ mt: 1, width: "72%" }}
              onChange={debouncedReasonInput}
            />
          </Box>

          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Grid display={"flex"} alignItems={"center"} sx={{ mt: "5%" }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "10px",
                  padding: "0px 10px 0px 10px",
                  mr: "3%",
                }}
                disableElevation={true}
                onClick={handleAddFileButton}
              >
                Thêm File
              </Button>
              <>{selectedFile && <Typography>Đã thêm: {selectedFile.name}</Typography>}</>
            </Grid>
          </>
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

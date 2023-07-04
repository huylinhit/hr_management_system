import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { debounce, Box, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchTicketTypesAsync } from "./ticketTypeSlice";
import { useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { setTicketAdded } from "./ticketSlice";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
interface Props {
  open: boolean;
  onClose: () => void;
}
export default function CreateTicketForm({ open, onClose }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState(0);
  const [isTicketTypeEmpty, setIsTicketTypeEmpty] = useState(false);
  const [isReasonEmpty, setIsReasonEmpty] = useState(false);
  const [reason, setReason] = useState("");
  const { ticketsLoaded } = useAppSelector((state) => state.ticket);
  const { ticketTypes, ticketTypesLoaded } = useAppSelector((state) => state.ticketType);
  const currentUser = useAppSelector((state) => state.account);
  console.log(currentUser.user?.userInfor.staffId);

  useEffect(() => {
    if (!ticketTypesLoaded) dispatch(fetchTicketTypesAsync());
  }, [dispatch, ticketTypesLoaded]);

  const handleTicketChange = (event: any) => {
    const selectedOption = ticketTypes!.find((option) => option.ticketName === event.target.value);
    setSelectedTicketTypeId(selectedOption!.ticketTypeId);
    if (selectedOption) {
      setIsTicketTypeEmpty(false);
    }
  };

  const debouncedReasonInput = debounce((event: any) => {
    setReason(event.target.value);
    setIsReasonEmpty(false);
  }, 500);

  const handleCreateTicket = () => {
    console.log(selectedTicketTypeId);
    console.log(reason);
    const ticketCreate = {
      ticketTypeId: selectedTicketTypeId,
      ticketReason: reason,
      ticketFile: "đơn xin",
    };

    if (selectedTicketTypeId == 0) {
      setIsTicketTypeEmpty(true);
    }
    if (reason == "") {
      setIsReasonEmpty(true);
    }
    if (!isTicketTypeEmpty && !isReasonEmpty) {
      agent.Ticket.create(ticketCreate)
        .then((response) => {
          handleUploadFile(response.staffId);
          console.log("Ticket created successfully: ", response);
          dispatch(setTicketAdded(true));
        })
        .catch((error) => {
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
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const handleUploadFile = (id: number) => {
    if (selectedFile == null) return;
    const fileRef = ref(storage, `staffFiles/${id}`);
    uploadBytes(fileRef, selectedFile).then(() => {
      console.log("GOOD");
    });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 550, fontSize: 20 }} display={"flex"} alignItems={"center"}>
          Tạo đơn khác
        </DialogTitle>

        <DialogContent>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Loại đơn
            </Typography>
            {ticketTypes ? (
              <TextField
                select
                sx={{ mt: 1, width: "72%" }}
                variant="standard"
                defaultValue={0}
                error={isTicketTypeEmpty}
                onChange={handleTicketChange}
              >
                {ticketTypes.map((option) => (
                  <MenuItem key={option.ticketTypeId} value={option.ticketName}>
                    {option.ticketName}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField />
            )}
          </Box>
          <Box display={"flex"} alignItems={"flex-end"}>
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
          </Box>
          {isTicketTypeEmpty ? (
            <Typography sx={{ mt: "5%" }} color={"error"}>
              *Nhập đầy đủ thông tin
            </Typography>
          ) : (
            ""
          )}

          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelected}
            />

            <Box display={"flex"} alignItems={"center"} sx={{ mt: "20px" }}>
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
              <Box>
                <>
                  {selectedFile && (
                    <Typography>
                      Đã thêm:{" "}
                      {selectedFile.name.length > 30
                        ? `${selectedFile.name.slice(0, 30)}...`
                        : selectedFile.name}
                    </Typography>
                  )}
                </>
              </Box>
            </Box>
          </>
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

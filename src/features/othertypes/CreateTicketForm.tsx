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
import { styled } from "@mui/material/styles";
import { storage } from "../../firebase";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SubjectIcon from "@mui/icons-material/Subject";
import { toast } from "react-toastify";
interface Props {
  open: boolean;
  onClose: () => void;
}
const fontStyle = "Mulish";
const infoStyle = {
  fontWeight: 600,
  fontFamily: fontStyle,
  fontSize: "15px",
  color: "#000000",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
  },
};
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
const textFieldInputProps = {
  disableUnderline: true,
  style: {
    ...infoStyle,
  },
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
export default function CreateTicketForm({ open, onClose }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState(1);
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
      toast.error("Bạn chưa điền đủ thông tin 😥");
      return;
    }
    if (!isTicketTypeEmpty && !isReasonEmpty) {
      agent.Ticket.create(ticketCreate)
        .then((response) => {
          handleUploadFile(response.staffId);
          console.log("Ticket created successfully: ", response);
          toast.success("Tạo đơn thành công 😊");
          dispatch(setTicketAdded(true));
        })
        .catch((error) => {
          toast.error("Tạo đơn thất bại 😥");
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
          <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
            <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
            <Typography sx={{ ...headerStyle, ...headerColor }}>Loại đơn</Typography>
            {ticketTypes ? (
              <BootstrapInput
                fullWidth
                InputProps={textFieldInputProps}
                defaultValue={"Đơn xin tăng lương"}
                variant="standard"
                error={isTicketTypeEmpty}
                onChange={handleTicketChange}
                select
              >
                {ticketTypes.map((option) => (
                  <MenuItem key={option.ticketTypeId} value={option.ticketName}>
                    {option.ticketName}
                  </MenuItem>
                ))}
              </BootstrapInput>
            ) : (
              <></>
            )}
          </Box>
          <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
            <SubjectIcon fontSize="small" sx={{ mr: "5px" }} />
            <Typography sx={headerStyle}>Lí do</Typography>
            <BootstrapInput
              fullWidth
              InputProps={textFieldInputProps}
              variant="standard"
              placeholder="Trống"
              error={isReasonEmpty}
              onChange={debouncedReasonInput}
              sx={infoStyle}
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

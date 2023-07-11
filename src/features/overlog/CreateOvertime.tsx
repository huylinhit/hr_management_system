import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  TextField,
  DialogActions,
  Button,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";

import axios, { Axios, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchLogOtsAsync } from "./overtimeSlice";
import { useNavigate } from "react-router-dom";

const headerStyle = {
  fontWeight: "bold",
};
let theme = createTheme();
theme = responsiveFontSizes(theme);
const styles = {
  borderBottom: "1px solid rgba(0, 0, 0)",
  marginBottom: "20px",
};

function CreateOvertime({ open, handleClose, handleChange }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState("");
  const [otTypeId, setOtTypeId] = useState("");
  const [amount, setAmount] = useState("");
  const [logHours, setLogHours] = useState("");
  const [reason, setReason] = useState("");
  const [logStart, setLogStart] = useState<Date | null>(null);
  const [logEnd, setLogEnd] = useState<Date | null>(null);

  const handleApi = async () => {
    if (logStart && logEnd) {
      const formData = new FormData();
      // if (otTypeId !== undefined) {
      //   formData.append("otTypeId", otTypeId);
      // }
      formData.append("logStart", format(logStart, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
      formData.append("logEnd", format(logEnd, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
      // formData.append("logHours", logHours);
      // formData.append("amount", amount);
      formData.append("reason", reason);
      formData.append("status", "pending");
      formData.append("processNote", "string");
      formData.append("respondencesId", "0");
      formData.append("createAt", "2023-07-05T09:48:19.936Z");
      formData.append("changeStatusTime", "2023-07-05T09:48:19.936Z");
      formData.append("enable", "true");

      await axios
        .post(`logots/staffs/${staffId}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setLogStart(null);
          setLogEnd(null);
          dispatch(fetchLogOtsAsync());
          handleClose();
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            console.error("Error Response:", error.response.data);
          } else {
            console.error("Error:");
          }
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <Button onClick={handleApi}>Handle Api</Button> */}
      <ThemeProvider theme={theme}>
        <DialogTitle
          variant="h5"
          sx={headerStyle}
          color="primary"
          style={styles}
        >
          Đơn làm thêm giờ
        </DialogTitle>
      </ThemeProvider>
      <DialogContent>
        <Grid container>
          <Grid item xs={24} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Nhân viên</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={staffId}
                  onChange={(e) => setStaffId(e?.target?.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Chọn ngày</Typography>
              </Grid>
              <Grid item xs={9}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    localeText={{ start: "Từ", end: "Đến" }}
                    value={[logStart, logEnd]}
                    onChange={(newValue: [Date | null, Date | null]) => {
                      if (newValue[0] && newValue[1]) {
                        setLogStart(parseISO(newValue[0].toISOString()));
                        setLogEnd(parseISO(newValue[1].toISOString()));
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Thời gian</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={logHours}
                  onChange={(e) => setLogHours(e?.target?.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Số ngày</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e?.target?.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid container>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Lý do</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={reason}
                  onChange={(e) => setReason(e?.target?.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} variant="outlined"
            sx={{ mr: "5px" }}>
            Hủy
          </Button>
          {/* <Button onClick={handleChange} variant="contained">
              Xác nhận
            </Button> */}
          <Button variant="contained" onClick={handleApi}
            sx={{ ml: "5px" }}>Xác nhận</Button>
        </Container>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOvertime;

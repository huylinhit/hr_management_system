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
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const headerStyle = {
  fontWeight: "bold",
};
const styles = {
  borderBottom: "1px solid rgba(0, 0, 0)",
  marginBottom: "20px",
};

function CreateLeave({ open, handleClose, handleChange }: any) {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={headerStyle} color="primary">
          {" "}
          <Typography variant="h4" sx={styles}>
            Đơn nghỉ phép
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Nhân viên</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <TextField label="" />
                    {/* <InputLabel id="demo-simple-select-label">Không</InputLabel> */}
                    {/* <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tăng ca thường"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Không</MenuItem>
                      <MenuItem value={20}>Tang ca thuong</MenuItem>
                      <MenuItem value={30}>Khong thuong</MenuItem>
                    </Select> */}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography sx={headerStyle}>Loại nghỉ phép</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <TextField label="" />
                    </FormControl>
                  </Grid>
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
                      localeText={{ start: "Check-in", end: "Check-out" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography sx={headerStyle}>Thời gian</Typography>
                </Grid>
                <Grid item xs={9}>
                  {/* <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  /> */}
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <TextField label="" />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Số ngày</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <TextField label="" />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ py: "8px", border: "4px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={headerStyle}>Lý do</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <TextField label="" />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Xác nhận
            </Button>
          </Container>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateLeave;

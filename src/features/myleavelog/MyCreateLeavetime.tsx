import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  responsiveFontSizes,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  DialogActions,
  Button,
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import axios from "axios";
import { url } from "inspector";
import { useEffect } from "react";

const headerStyle = {
  fontWeight: "bold",
};
let theme = createTheme();
theme = responsiveFontSizes(theme);

const styles = {
  borderBottom: "1px solid rgba(0, 0, 0)",
  marginBottom: "20px",
};
function MyCreateLeavetime({ open, handleClose, handleChange }: any) {

    
    return (
        <Dialog open={open} onClose={handleClose}>
            <ThemeProvider theme={theme}>
                <DialogTitle variant="h5" sx={headerStyle} color="primary" style={styles} >Đơn xin nghỉ phép của tôi</DialogTitle>
            </ThemeProvider>
            <DialogContent>
                <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}><Typography sx={headerStyle}>Loại nghỉ phép</Typography></Grid>
                        <Grid item xs={10}><Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Không</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tăng ca thường"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Đám cưới</MenuItem>
                                    <MenuItem value={20}>Tang</MenuItem>
                                    <MenuItem value={30}>Sinh</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Chọn ngày</Typography></Grid>
                            <Grid item xs={10}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateRangePicker localeText={{ start: 'Từ', end: 'Đến' }} />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Thời gian</Typography></Grid>
                            <Grid item xs={10}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Lý do</Typography></Grid>
                            <Grid item xs={10}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Container sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleClose} variant="outlined" >Hủy</Button>
                    <Button onClick={handleClose} variant="contained" >Xác nhận</Button>
                </Container>
            </DialogActions>
        </Dialog>
    );

}

export default MyCreateLeavetime;

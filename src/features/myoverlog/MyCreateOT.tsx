import { Dialog, DialogTitle, DialogContent, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Container, TextField, DialogActions, Button, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";



const headerStyle = {
    fontWeight: 'bold'
}
let theme = createTheme();
theme = responsiveFontSizes(theme);
const styles = {
    borderBottom: '1px solid rgba(0, 0, 0)',
    marginBottom: '20px',
};


function MyCreateOT({ open, handleClose, handleChange }: any) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <ThemeProvider theme={theme}>
                <DialogTitle variant="h5" sx={headerStyle} color="primary" style={styles} >Đơn làm thêm giờ</DialogTitle>
            </ThemeProvider>
            <DialogContent>

                <Grid container >
                    <Grid item xs={24} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><Typography sx={headerStyle}>Nhân viên</Typography></Grid>
                            <Grid item xs={9}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Typography sx={headerStyle}>Loại tăng ca</Typography></Grid>
                        <Grid item xs={9}><Grid item xs={9}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Không</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tăng ca thường"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Không</MenuItem>
                                    <MenuItem value={20}>Tang ca thuong</MenuItem>
                                    <MenuItem value={30}>Khong thuong</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><Typography sx={headerStyle}>Chọn ngày</Typography></Grid>
                            <Grid item xs={9}>
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
                            <Grid item xs={3}><Typography sx={headerStyle}>Thời gian</Typography></Grid>
                            <Grid item xs={9}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><Typography sx={headerStyle}>Số ngày</Typography></Grid>
                            <Grid item xs={9}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><Typography sx={headerStyle}>Lý do</Typography></Grid>
                            <Grid item xs={9}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

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

export default MyCreateOT;
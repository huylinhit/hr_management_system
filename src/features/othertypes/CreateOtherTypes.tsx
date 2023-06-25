import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes, Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Container, Button } from "@mui/material";

const headerStyle = {
    fontWeight: 'bold'
}
let theme = createTheme();
theme = responsiveFontSizes(theme);
const styles = {
    borderBottom: '1px solid rgba(0, 0, 0)',
    marginBottom: '15px',
};


function CreateOtherTypes({ open, handleClose, handleChange }: any) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <ThemeProvider theme={theme}>
                <DialogTitle variant="h5" sx={headerStyle} color="primary" style={styles} >Tạo đơn</DialogTitle>
            </ThemeProvider>
            <DialogContent>

                
                <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Typography sx={headerStyle}>Loại đơn</Typography></Grid>
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
                            <Grid item xs={3}><Typography sx={headerStyle}>Lý do gửi đơn</Typography></Grid>
                            <Grid item xs={9}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Container sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={handleClose} variant="outlined" >Hủy</Button>
                    <Button onClick={handleClose} variant="contained" >Xác nhận</Button>
                </Container>

            </DialogActions>
        </Dialog>
    );
}

export default CreateOtherTypes;
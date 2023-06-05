import { Button, Container, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


const headerStyle = {
    fontWeight: 'bold'
}
function CreateOvertime() {
    function handleChange(event: SelectChangeEvent<any>, child: ReactNode): void {
        
    }
    return (
        <>
            <Container component={Paper} maxWidth={false} sx={{ padding: '24px', py: '12px' }}>
                <Typography variant="h5" sx={headerStyle} color="primary">Yêu cầu tăng ca</Typography>

                <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}><Typography sx={headerStyle}>Loại tăng ca</Typography></Grid>
                        <Grid item xs={10}><Grid item xs={10}>
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
                            <Grid item xs={2}><Typography sx={headerStyle}>Chọn ngày</Typography></Grid>
                            <Grid item xs={10}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker']}>
                                        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
                                    </DemoContainer>
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
                    <Grid item xs={8}>
                        </Grid>
                        <Grid item xs={4}>
                        <Grid item xs={2}>
                            <List sx={{ display: "flex" }}>
                            <ListItem>
                                <Button variant='contained' fullWidth color="primary">Tạo</Button>
                            </ListItem>
                                <Grid item xs={2}>
                                    <List sx={{ display: "flex" }}>
                                        <ListItem>
                                            <Button variant="outlined">Đóng</Button>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </List>
                        </Grid>
                    </Grid>
                    </Grid>
            </Container>
        </>
    );
}

export default CreateOvertime;

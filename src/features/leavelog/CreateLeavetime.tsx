import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes, Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Container, DialogActions, Button } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import axios, { Axios, AxiosError,  } from "axios";
import { format, parseISO } from "date-fns";
import { useState } from "react";

const headerStyle = {
    fontWeight: 'bold'
}
let theme = createTheme();
theme = responsiveFontSizes(theme);

const styles = {
    borderBottom: '1px solid rgba(0, 0, 0)',
    marginBottom: '20px',
};

function CreateLeavetime({ open, handleClose, handleChange }: any) {
    const [staffId, setStaffId] = useState("");
    const [leaveTypeId, setleaveTypeId] = useState("");
    const [leaveDays, setleaveDays] = useState("");
    const [leaveStart, setleaveStart] = useState<Date | null>(null);

    const [leaveEnd, setleaveEnd] = useState<Date | null>(null);
    const [description, setdescription] = useState("");
    // const data = {
    //     leaveTypeId: 2,
    //     leaveStart: '2023-07-08T11:30:10.518Z',
    //     leaveEnd: '2023-07-08T11:30:10.518Z',
    //     leaveDays: 0,
    //     leaveHours: 0,
    //     description: 'string',
    //     status: 'pending',
    //     createAt: '2023-07-08T11:30:10.518Z',
    //     processNote: 'string',
    //     // respondencesId: 0,
    //     changeStatusTime: '2023-07-08T11:30:10.518Z',
    //     enable: true
    //   };

    //   axios.post('/log-leaves/staffs/2', data)
    //     .then((response: AxiosResponse) => {
    //       console.log('Request successful:', response.data);
    //     })
    //     .catch((error: any) => {
    //       console.error('Error occurred:', error);
    //     });


    const handleApi = () => {
        if (leaveStart && leaveEnd) {
            const formData = new FormData();
            if (leaveTypeId !== undefined) {
                formData.append("leaveTypeId", leaveTypeId);
            }

            formData.append("leaveStart", format(leaveStart, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
            formData.append("leaveEnd", format(leaveEnd, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
            formData.append("leaveDays", leaveDays);
            formData.append("description", description);
            formData.append("status", "pending");
            formData.append("createAt", "2023-07-05T09:48:19.936Z");
            formData.append("processNote", "string");
            formData.append("respondencesId", "0");
            formData.append("changeStatusTime", "2023-07-05T09:48:19.936Z");
            formData.append("enable", "true");

            axios
                .post(`log-leaves/staffs/${staffId}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("Response:", response.data);
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
            <Button onClick={handleApi}>Handle Api</Button>
            <ThemeProvider theme={theme}>
                <DialogTitle variant="h5" sx={headerStyle} color="primary" style={styles} >Đơn xin nghỉ phép</DialogTitle>
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
                                    onChange={(e: any) => setleaveTypeId(e?.target?.value)}
                                >
                                    <MenuItem value={1}>Nghỉ thai sản</MenuItem>
                                    <MenuItem value={2}>Nghỉ lý do khác</MenuItem>
                                    <MenuItem value={3}>Nghỉ không lương lý do khác</MenuItem>
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
                                    <DateRangePicker
                                        localeText={{ start: 'Từ', end: 'Đến' }} value={[leaveStart, leaveEnd]}
                                        onChange={(newValue: [Date | null, Date | null]) => {
                                            if (newValue[0] && newValue[1]) {
                                                setleaveStart(parseISO(newValue[0].toISOString()));
                                                setleaveEnd(parseISO(newValue[1].toISOString()));
                                            }
                                        }}
                                    /></LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Thời gian</Typography></Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-basic"
                                    label="Outlined"
                                    variant="outlined"
                                    onChange={(e) => setleaveDays(e?.target?.value)}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Lý do</Typography></Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-basic"
                                    label="Outlined"
                                    variant="outlined"
                                    onChange={(e) => setdescription(e?.target?.value)}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Container sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleClose} variant="outlined" >Hủy</Button>
                    <Button onClick={handleClose} id='submitButton' variant="contained" >Xác nhận</Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
}

export default CreateLeavetime;
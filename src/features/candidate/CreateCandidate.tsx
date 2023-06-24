
import { Avatar, Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, SelectChangeEvent, TextField, Typography, styled } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import React, { ReactNode, useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const headerStyle = {
    fontWeight: 'bold'
}
const styles = {
    marginBottom: '10px',
};

function CreateCandidate() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Xử lý file ở đây
            console.log("File selected:", file);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };
    function handleChange(event: SelectChangeEvent<unknown>, child: ReactNode): void {

    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Container >
                <Typography variant="h4" sx={headerStyle} style={styles}>
                    Thêm ứng viên
                </Typography>

                <Container component={Paper} maxWidth={false} sx={{ padding: '20px', borderRadius: '40px' }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: '12px' }}>
                        <Avatar sx={{ bgcolor: deepPurple[500], width: 100, height: 100 }}>A</Avatar>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileSelected}
                            />
                        <Button  color="primary" sx={{ mt: 2 }} onClick={handleUploadButtonClick}>
                            Thêm/ Sửa ảnh
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>

                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Họ"
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Tên"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <FormControl fullWidth>
                                    <FormLabel id="demo-row-radio-buttons-group-label" >Giới tính</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} sx={{ py: '12px', maxWidth: '100%' }}>


                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Ngày sinh" />
                                </LocalizationProvider>

                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Số điện thoại"
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Email"

                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="CCCD"

                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={1} columns={16}>
                            <Grid item xs={16} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="fullWidth"
                                    label="Địa chỉ"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ py: '12px' }}>

                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Vị trí ứng tuyển"
                                />

                            </Grid>
                            <Grid item xs={8} sx={{ py: '12px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Thu nhập mong muốn"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ py: '0px' }}>
                                <Typography variant="h6" sx={headerStyle} >Kỹ năng</Typography>
                                <TextField sx={{ py: '4px' }}
                                    fullWidth
                                    id="outlined"
                                    label="Nhập"
                                />
                                <TextField sx={{ py: '4px' }}
                                    fullWidth
                                    id="outlined"
                                    label="Nhập"
                                />
                                <TextField sx={{ py: '4px' }}
                                    fullWidth
                                    id="outlined"
                                    label="Nhập"
                                />
                                <TextField sx={{ py: '4px' }}
                                    fullWidth
                                    id="outlined"
                                    label="Nhập"
                                />
                            </Grid>

                            <Grid item xs={8} >
                                <Button variant="contained" onClick={handleClickOpen} sx={{ borderRadius: '40px' }}>
                                    Tải CV
                                </Button>

                            </Grid>
                        </Grid>
                    </Box>

                    <Container sx={{ display: "flex", justifyContent: "right"  }}>
                        <Button onClick={handleClose} variant="contained" sx={{borderRadius: '40px'}}>Thêm</Button>
                    </Container>

                </Container>
            </Container>
        </>
    );
}

export default CreateCandidate;
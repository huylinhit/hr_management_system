
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
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: '16px' }}>
                        <Avatar sx={{ bgcolor: deepPurple[500], width: 100, height: 100 }}>A</Avatar>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileSelected}
                        />
                        <Button color="primary" sx={{ mt: 2, py: '15px' }} onClick={handleUploadButtonClick}>
                            Thêm/ Sửa ảnh
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>

                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Họ"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField

                                    id="outlined"
                                    label="Tên"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <FormControl sx={{ width: '400px' }}>
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
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Ngày sinh"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Số điện thoại"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Email"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="CCCD"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={1} columns={16}>
                            <Grid item xs={16} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    fullWidth
                                    id="outlined"
                                    label="Địa chỉ"
                                    size="small"
                                    sx={{ width: '957px' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Vị trí ứng tuyển"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Thu nhập mong muốn"
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', py: '10px', textIndent: '70px' }} >Kỹ năng</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                <TextField
                                    id="outlined"
                                    label="Nhập..."
                                    size="small"
                                    sx={{ width: '400px' }}
                                />
                            </Grid>
                            <Grid item xs={8} sx={{textIndent: '70px'}} >
                                <Button variant="contained" onClick={handleClickOpen} sx={{ borderRadius: '40px' }}>
                                    Tải CV
                                </Button>

                            </Grid>
                        </Grid>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                    <TextField
                                        id="outlined"
                                        label="Nhập..."
                                        size="small"
                                        sx={{ width: '400px' }}
                                    />
                                </Grid>

                            </Grid>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                    <TextField
                                        id="outlined"
                                        label="Nhập..."
                                        size="small"
                                        sx={{ width: '400px' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', py: '35px' }}>
                                    <TextField
                                        id="outlined"
                                        label="Nhập..."
                                        size="small"
                                        sx={{ width: '400px' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>

                    <Container sx={{ display: "flex", justifyContent: "right" }}>
                        <Button onClick={handleClose} variant="contained" sx={{ borderRadius: '40px' }}>Thêm</Button>
                    </Container>

                </Container>
            </Container >
        </>
    );
}

export default CreateCandidate;
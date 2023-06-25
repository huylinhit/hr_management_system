import { Avatar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { deepPurple } from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const headerStyle = {
    fontWeight: 'bold'
}
const styles = {

    marginBottom: '15px',
};


function EditCandidate({ handleClose, handleOpen, handleChange }: any) {
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


    return (
        <>
            <Container >
                <Typography variant="h4" sx={headerStyle} style={styles} >
                    Chỉnh sửa thông tin nhân viên
                </Typography>
                <Container component={Paper} maxWidth={false} sx={{ padding: '12px', borderRadius: '40px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", py: '5px' }}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Avatar sx={{ bgcolor: deepPurple[500], width: 100, height: 100 }}>A</Avatar>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileSelected}
                                />
                            </Box>
                            <Button color="primary" sx={{ mt: 1, alignSelf: "flex-end" }} onClick={handleUploadButtonClick}>
                                Thêm/ Sửa ảnh
                            </Button>
                        </Grid>
                        <Grid item xs={10}>

                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <TextField id="outlined-basic" label="Nguyễn Minh" variant="outlined" sx={{ marginRight: '10px' }} />
                                    <TextField id="outlined-basic" label="Hoàng" variant="outlined" />
                                </Grid>
                                <Grid item xs={9}>
                                    <FormControl sx={{ m: 0, minWidth: 200 }} >
                                        <InputLabel id="demo-select-small-label">Chờ duyệt</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            label="Chờ duyệt"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Đạt</MenuItem>
                                            <MenuItem value={20}>Không đạt</MenuItem>
                                            <MenuItem value={30}>Chờ duyệt</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 2 , borderTopWidth: '1px', borderTopColor: 'black'}} />

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0066cc' }} style={styles} >
                                    Thông tin
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0066cc' }} style={styles} >
                                    Kỹ năng
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngày sinh</Typography>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box sx={{ width: '200px' }} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker label="DD/MM/YY" />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}> Giới tính</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl sx={{ m: 0, minWidth: 200 }} >
                                            <InputLabel id="demo-select-small-label">Chọn</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label="Chọn"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Nam</MenuItem>
                                                <MenuItem value={20}>Nữ</MenuItem>
                                                <MenuItem value={30}>Khác</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>.NET</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: '12px' }}>
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngày sinh</Typography>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box sx={{ width: '200px' }} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker label="DD/MM/YY" />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4} >
                                        <Typography sx={headerStyle}>Phòng ban</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl sx={{ m: 0, minWidth: 200, py: "10px" }} >
                                            <InputLabel id="demo-select-small-label">Chọn</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label="Chọn"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Phát triển sản phẩm</MenuItem>
                                                <MenuItem value={20}>APP</MenuItem>
                                                <MenuItem value={30}>Phát triển dự án</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Số điện thoại</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}  >
                                        <Button><AddCircleIcon /></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Email</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}  >
                                        <Button onClick={handleOpen} variant="outlined" >Xem CV</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Địa chỉ</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0066cc' }} style={styles} >
                                    Vị trí ứng tuyển
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Vị trí</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Lương mong muốn</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Container sx={{ display: "flex", justifyContent: "right" }}>
                        <Button onClick={handleClose} variant="contained" sx={{ borderRadius: '40px' }}>Lưu</Button>
                    </Container>

                </Container>
            </Container>
        </>
    );
}

export default EditCandidate;
import { Avatar, Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { deepPurple } from "@mui/material/colors";

import { Link } from "react-router-dom";

const headerStyle = {
    fontWeight: 'bold'
}
const styles = {

    marginBottom: '15px',
};


function Candidate({ handleClose, handleOpen, handleChange }: any) {
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

                        </Grid>
                        <Grid item xs={10}>

                            <Grid container spacing={2}>
                                <Grid item xs={10} sx={{ display: 'flex' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: '10px' }} style={styles}>Nguyễn Minh Hoàng</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Chip sx={{ width: "75px" }} label="Đạt" color="success" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10}>
                                    <Button onClick={handleOpen} variant="contained" sx={{ borderRadius: '40px' }}>Xem CV</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2, borderTopWidth: '1px', borderTopColor: 'black' }} />

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
                                        <Typography sx={headerStyle}> Giới tính</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <Typography>Nữ</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>.NET</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <Typography>6 tháng</Typography>
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
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <Typography>01/01/2000</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <Typography>Tiếng Nhật N1</Typography>
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
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <Typography>Phát triển sản phẩm</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={2} columns={8}>
                                    <Grid item xs={4}>
                                        <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }}>
                                        <Typography>Tiếng Anh IELTS 6.5</Typography>
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
                                        <Typography>0123456789</Typography>
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
                                        <Typography sx={headerStyle}>Email</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <Typography>hoangvm@gmail.com</Typography>
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
                                        <Typography sx={headerStyle}>Địa chỉ</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ py: "10px" }} >
                                        <Typography>abcdef không biết</Typography>
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
                                        <Typography>Phát triển sản phẩm</Typography>
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
                                        <Typography>20.000.000</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Container sx={{py:'15px', display: "flex", justifyContent: "space-between" }}>
                        <Button
                        sx={{ borderRadius: '40px' }}
                         variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            component={Link}
                            to="/viewcandidate/"
                        >
                            Quay về
                        </Button>
                        <Button
                            sx={{ borderRadius: '40px' }}
                            onClick={handleOpen}
                            variant="contained"

                            component={Link}
                            to="/editcandidate/"
                        >
                            Chỉnh sửa
                        </Button>
                    </Container>

                </Container>
            </Container>
        </>
    );
}

export default Candidate;
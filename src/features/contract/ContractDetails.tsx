import { Button, Container, Grid, List, ListItem, Paper, Typography } from "@mui/material";

const headerStyle = {
    fontWeight: 'bold'
}
function ContractDetails() {
    return (
        <>
            <Container component={Paper} maxWidth={false} sx={{ padding: '24px' }}>
                <Grid container >
                    <Grid item xs={8}>
                        <Typography variant="h5" sx={headerStyle} >Hợp đồng Nguyễn Huy Linh</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Grid item xs={2}>
                            <List sx={{ display: "flex" }}>
                                <ListItem>
                                    <Button variant="text">Sửa</Button>
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
                        <Grid container component={Paper}>
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Tên</Typography></Grid>
                            <Grid item xs={10}><Typography >Nguyễn Huy Linh</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Phòng ban</Typography></Grid>
                            <Grid item xs={10}><Typography >Product Development</Typography></Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Công ty</Typography></Grid>
                            <Grid item xs={10}><Typography >My Company</Typography></Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Ngày bắt đầu</Typography></Grid>
                            <Grid item xs={10}><Typography >05/01/2023</Typography></Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Ngày kết thúc</Typography></Grid>
                            <Grid item xs={10}><Typography >05/01/2024</Typography></Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Loại hợp đồng</Typography></Grid>
                            <Grid item xs={10}><Typography >Fulltime</Typography></Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} sx={{py: '8px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Lịch làm</Typography></Grid>
                            <Grid item xs={10}><Typography >24 ngày/tháng</Typography></Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                
                </Grid>   
          
            </Container>
        </>);
}

export default ContractDetails;
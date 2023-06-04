import { Button, Container, Grid, List, ListItem, Paper, Typography } from "@mui/material";

const headerStyle = {
    fontWeight: 'bold'
}

function OvertimeLog() {
    return (
        <>
            <Container component={Paper} maxWidth={false} sx={{ padding: '12px' }}>
                <Typography variant="h5" sx={{ mb: '4px' }}>Minh Hoàng tăng ca ngày lễ</Typography>

                <Grid container component={Paper}>
                    <Grid item xs={10} sx={{py: '12px', border: '4px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Loại tăng ca</Typography></Grid>
                            <Grid item xs={10}><Typography >Ngày lễ</Typography></Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={2}><Typography sx={headerStyle}>Từ</Typography></Grid>
                            <Grid item xs={10}><Typography>Từ 12/12/2012 Đến 13/12/2012</Typography></Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={2}><Typography sx={headerStyle}>Thời gian</Typography></Grid>
                            <Grid item xs={10}><Typography>3:00</Typography></Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <List>
                            <ListItem>
                                <Button variant='contained' fullWidth color="primary">Chấp nhận</Button>
                            </ListItem>
                            <ListItem>
                                <Button variant='outlined' fullWidth color="error">Từ chối</Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default OvertimeLog;
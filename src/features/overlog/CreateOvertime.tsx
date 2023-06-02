import { Button, Container, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ReactNode } from "react";

const headerStyle = {
    fontWeight: 'bold'
}
function CreateOvertime() {
    function handleChange(event: SelectChangeEvent<any>, child: ReactNode): void {
        throw new Error("Function not implemented.");
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
                                    onChange={handleChange}>
                                    <MenuItem value={10}>Không</MenuItem>
                                    <MenuItem value={10}>Tăng ca thường</MenuItem>
                                    <MenuItem value={20}>Tăng ca không thường</MenuItem>
                                    <MenuItem value={30}>Ét ô ét</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Từ</Typography></Grid>
                            <Grid item xs={10}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Không</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Tăng ca thường"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Không</MenuItem>
                                        <MenuItem value={20}></MenuItem>
                                        <MenuItem value={30}></MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Đến</Typography></Grid>
                            <Grid item xs={10}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Không</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Tăng ca thường"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Không</MenuItem>
                                        <MenuItem value={20}></MenuItem>
                                        <MenuItem value={30}></MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}><Typography sx={headerStyle}>Thời gian</Typography></Grid>
                            <Grid item xs={10}><Typography>00:00</Typography></Grid>

                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
}

export default CreateOvertime;
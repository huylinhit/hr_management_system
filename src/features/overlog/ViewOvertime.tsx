import { Button, Container, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ReactNode } from "react";

const headerStyle = {
    fontWeight: 'bold'
}
function ViewOvertime() {
    return ( 
        <>
        <Container component={Paper} maxWidth={false} sx={{ padding: '24px', py: '12px' }}>
                <Typography variant="h5"  color="primary">Tạo yêu cầu tăng ca</Typography>

                </Container>
        </>
     );
}

export default ViewOvertime;
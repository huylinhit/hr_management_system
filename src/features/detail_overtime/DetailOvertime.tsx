import { Box, Container, Grid, Typography } from "@mui/material";

//style
import "./DetailOvertime.css"

// component
import DetailOvertimeContent from "./component/DetailOvertimeContent";
import DetailOvertimeFooter from "./component/DetailOvertimeFooter";


export default function DetailOvertime () {
    return (
        <Box className="page-container">
            <Grid container className="page-title">
                <Typography>
                    Phản hồi đơn làm thêm giờ
                </Typography>
            </Grid>
            <Grid container className="page-content" >
                <Grid item sx={{ width: "100%", padding: "10px 50px"}}>
                    <DetailOvertimeContent />
                </Grid>
                <Grid item sx={{ width: "100%"}}>
                    <DetailOvertimeFooter/>
                </Grid>
            </Grid>
        </Box>
    )
}
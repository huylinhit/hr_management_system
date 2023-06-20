import { Avatar, Grid } from "@mui/material";

export default function DetailAva () {
    return (
        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid item xs={6}>
                <Avatar sx={{ bgcolor: "deepOrange", width: "120px", height: "120px" }} />
            </Grid>
            <Grid item xs={6}>

            </Grid>
        </Grid>
    )
}
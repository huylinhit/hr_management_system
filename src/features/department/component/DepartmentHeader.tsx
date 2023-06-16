
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Button, IconButton, TextField } from '@mui/material';


export default function DepartmentHeader () {
    return (
        <Grid container sx={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <Grid item>
                <Button variant="outlined" size="small">
                    Tạo phòng ban mới
                </Button>
            </Grid>
            <Grid item>
                <IconButton aria-label="search" sx={{ marginTop: "10px" }}>
                    <SearchIcon />
                </IconButton>
                <TextField variant="standard" label="Search..." type="search" />
            </Grid>
        </Grid>
    )
}
import { Button, Container,  Divider,  Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return ( 
        <Container component={Paper} sx={{height: 400}}>
            <Typography variant="h4" >Trang không tồn tại</Typography>
            
            <Divider/>

            <Button centerRipple component={Link} to='/' fullWidth>Quay về trang chủ</Button>
            

        </Container>
     );
}

export default NotFound;
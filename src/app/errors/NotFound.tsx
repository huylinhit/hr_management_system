import { Button, Container,  Divider,  Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return ( 
        <Container component={Paper} sx={{height: 400}}>
            <Typography variant="h4" >Opps - we could not find what your are looking for!</Typography>
            
            <Divider/>

            <Button centerRipple component={Link} to='/' fullWidth>Go Back To Home Page</Button>
            

        </Container>
     );
}

export default NotFound;
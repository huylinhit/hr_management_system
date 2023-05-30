import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function ServerErrorPage() {
    const { state } = useLocation();

    return (
        <Container component={Paper}>

            {state?.error ? (
                <>
                    <Typography gutterBottom color='secondary' variant="h3">{state.error.title}</Typography>

                    <Divider />

                    <Typography >{state.error.detail}</Typography>
                </>

            ):(
                <Typography variant="h3">Server Error</Typography>
            )}





        </Container>
    );
}

export default ServerErrorPage;
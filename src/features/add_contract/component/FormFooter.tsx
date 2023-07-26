import { Grid, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

// interface
interface Props {
  id: number;
  handleSubmit: Function;
  disabled: boolean;
}

export default function FormFooter({ id, handleSubmit, disabled }: Props) {
  return (
    <Container maxWidth="md">
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Grid item>
        </Grid>
        <Grid item>
          <Button
            disabled={disabled}
            variant="contained"
            sx={{
              borderRadius: "20px",
              padding: "auto",
              width:"80px"
            }}
            onClick={() => handleSubmit()}
          >
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

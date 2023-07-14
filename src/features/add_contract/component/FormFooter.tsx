import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

// interface
interface Props {
  id: number;
    handleSubmit: Function
    disabled: boolean
}

export default function FormFooter ({ id, handleSubmit, disabled } : Props) {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Grid item>
        <Button
          variant="outlined"
          sx={{
            border: "1.5px solid #007FFF",
            borderRadius: "20px",
            padding: "auto",
          }}
          component={Link}
          to={`/staffs/${id}`}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item>
        <Button
        disabled={disabled}
          variant="contained"
          sx={{
            borderRadius: "20px",
            padding: "auto",
          }}
          onClick={() => handleSubmit()}
        >
          Lưu
        </Button>
      </Grid>
    </Grid>
  );
}

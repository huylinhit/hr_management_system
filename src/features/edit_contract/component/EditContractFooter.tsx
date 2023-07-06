import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {}

export default function EditContractFooter({}: Props) {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Grid item >
        <Button
          variant="outlined"
          sx={{
            border: "1.5px solid #007FFF",
            borderRadius: "20px",
            padding: "auto",
          }}
          startIcon={<ArrowBackIcon />}
          // component={Link}
          //           to={`/detail-employee/${employee.staffId}`}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item >
        <Button
          sx={{
            borderRadius: "20px",
            padding: "auto",
          }}
        >
          
        </Button>
      </Grid>
    </Grid>
  );
}

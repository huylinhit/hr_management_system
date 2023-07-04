import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

interface Props {}

export default function DetailEmployeeFooter({}: Props) {
  const handleFinish = () => {};

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "50px 40px 10px 40px",
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
          startIcon={<ArrowBackIcon />}
          component={Link}
          to={"/employeelist"}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

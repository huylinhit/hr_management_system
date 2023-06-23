import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {}

export default function DetailLeaveFooter({}: Props) {
  const handleFinish = () => {};

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "30px 50px",
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
        >
          Quay về
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{
            border: "1.5px solid #007FFF",
            borderRadius: "20px",
            padding: "auto",
          }}
          type="submit"
        >
          Cập nhật
        </Button>
      </Grid>
    </Grid>
  );
}

import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  setFinish: Function;
}

export default function DetailLeaveFooter({ setFinish }: Props) {
  const handleFinish = () =>{
    setFinish(true)
  }

  return (
    <Grid container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Grid item className="footer-btn">
        <Button variant="outlined" 
            startIcon={<ArrowBackIcon />}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item className="footer-btn">
        <Button variant="contained" 
          onChange={handleFinish}
        >
          Cập nhật 
        </Button>
      </Grid>
    </Grid>
  );
}

import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  
}

export default function DetailLeaveFooter({  }: Props) {
  const handleFinish = () =>{
    
  }

  return (
    <Grid container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding:"30px 50px"
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
          type="submit"
        >
          Cập nhật 
        </Button>
      </Grid>
    </Grid>
  );
}

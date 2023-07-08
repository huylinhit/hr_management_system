import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// data
import { LeaveLog } from "../../../app/models/leaveLog";
import { FORMSTATUS } from "../../../app/store/data";

// interface
interface Props {
  logLeave: LeaveLog | undefined;
}

export default function DetailLeaveFooter({logLeave}: Props) {
  const handleFinish = () => {};

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "20px 30px 10px 30px",
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
        >
          Quay về
        </Button>
      </Grid>

      <Grid item >
        {logLeave?.status === FORMSTATUS.pending ? (
          <Button
          variant="contained"
          type="submit"
          sx={{
            border: "1.5px solid #007FFF",
            borderRadius: "20px",
            padding: "auto",
          }}
        >
          Cập nhật
        </Button>
        ) : null}
        
      </Grid>
    </Grid>
  );
}

import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// data
// import { LogOT } from "../../../app/models/LogOT";
import { LogOvertime } from "../../../app/models/logOvertime";

// interface
interface Props {
  logOt: LogOvertime;
}

export default function DetailOvertimeFooter({ logOt }: Props) {
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
          type="submit"
          sx={{
            border: "1.5px solid #007FFF",
            borderRadius: "20px",
            padding: "auto",
          }}
        >
          Cập nhật
        </Button>
      </Grid>
    </Grid>
  );
}

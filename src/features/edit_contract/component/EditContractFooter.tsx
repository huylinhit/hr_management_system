import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Contract from "../../../app/models/contract";

interface Props {
  contract: Contract | undefined
  setOpenSubmitDialog: Function
}

export default function EditContractFooter({ contract, setOpenSubmitDialog }: Props) {
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
          component={Link}
                    to={`/detail-contract/${contract?.contractId}`}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item >
        <Button
        variant="contained"
          sx={{
            borderRadius: "20px",
            padding: "auto",
          }}
          onClick={() => setOpenSubmitDialog(true)}
        >
          Lưu
        </Button>
      </Grid>
    </Grid>
  );
}

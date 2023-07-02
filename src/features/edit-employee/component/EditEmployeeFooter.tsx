import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { UserInfor } from "../../../app/models/userInfor";

interface Props {
  employee: UserInfor | undefined;
}

export default function EditEmployeeFooter({ employee }: Props) {
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
          to={`/detail-employee/${employee?.staffId}`}
        >
          Quay về
        </Button>
      </Grid>
      <Grid item>
      <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            padding: "auto",
          }}
        >
          Lưu
        </Button>
      </Grid>
    </Grid>
  );
}

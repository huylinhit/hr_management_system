
// data

import { Grid, Avatar, Typography, Button } from "@mui/material";
import { Employee } from "../../../app/models/employee";
import { UserInfor } from "../../../app/models/userInfor";
import { Link } from "react-router-dom";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function DetailAva({ employee }: Props) {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        maxWidth: "100%",
      }}
    >
      <Grid
        item
        xs={9}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Grid item xs={2}>
          <Avatar
            sx={{ bgcolor: "deepOrange", width: "120px", height: "120px" }}
          />
        </Grid>
        <Grid item xs={9} sx={{ paddingLeft: "10px" }}>
          <Typography variant="h5">
            {employee?.lastName} {employee?.firstName}
          </Typography>
          <Typography>{employee?.staffId}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={3} sx={{ maxWidth: "100%" }}>
        <Button variant="outlined" component={Link} to={"/detail-contract"}>
          Xem hợp đồng nhân viên
        </Button>
      </Grid>
    </Grid>
  );
}

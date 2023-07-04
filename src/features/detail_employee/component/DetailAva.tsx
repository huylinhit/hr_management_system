
// data

import { Grid, Avatar, Typography, Button } from "@mui/material";
import { Employee } from "../../../app/models/employee";

// interface
interface Props {
  staff: Employee;
}

export default function DetailAva({ staff }: Props) {
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
        <Grid item xs={9} sx={{ paddingLeft: "10px"}}>
          <Typography variant="h5">{staff.lastName} {staff.firstName}</Typography>
          <Typography>{staff.staffId}</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ maxWidth: "100%" }}
      >
        <Button variant="outlined">Xem hợp đồng nhân viên</Button>
      </Grid>
    </Grid>
  );
}

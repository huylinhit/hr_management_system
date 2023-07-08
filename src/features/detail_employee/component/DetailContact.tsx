import { Box, Grid, Typography } from "@mui/material";

// data
import { Employee } from "../../../app/models/employee";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function DetailContact({ employee }: Props) {
  return (
    <Box sx={{ padding: "0 10px 20px 10px"}}>
      <Grid>
        <Typography variant="h5" sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}>
          Liên lạc
        </Typography>
      </Grid>

      <Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Số điện thoại:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>{employee?.phone}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px"
          }}
        >
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Mail:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>{employee?.email}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px"
          }}
        >
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Địa chỉ:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400" }}>{employee?.address}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

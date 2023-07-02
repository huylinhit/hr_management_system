import { Box, Grid, TextField, Typography } from "@mui/material";

// data
import { Employee } from "../../../app/models/employee";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function EditContact({ employee }: Props) {
  return (
    <Box sx={{ padding: "0 10px 20px 10px" }}>
      <Grid>
        <Typography
          variant="h5"
          sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}
        >
          Liên lạc
        </Typography>
      </Grid>

      <Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Số điện thoại:</Typography>
          </Grid>
          <Grid item xs={7}><TextField
            required
            id="outlined-required"
            label="Số điện thoại"
            size="small"
            margin="dense"
            defaultValue={employee?.phone}
          />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Mail:</Typography>
          </Grid>
          <Grid item xs={7}><TextField
            required
            id="outlined-required"
            label="Mail"
            size="small"
            margin="dense"
            defaultValue={employee?.email}
          />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px",
          }}
        >
          <Grid item xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Địa chỉ:</Typography>
          </Grid>
          <Grid item xs={7}><TextField
            required
            id="outlined-required"
            label="Địa chỉ"
            size="small"
            margin="dense"
            defaultValue={employee?.address}
          /> 
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

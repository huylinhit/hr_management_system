import { Button, Grid, Typography } from "@mui/material";

// data
import Contract from "../../../app/models/contract";

// interface
interface Props {
  contract: Contract |undefined;
}

export default function DetaiNote({ contract }: Props) {
  return (
    <Grid>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        3. Thời gian làm việc và ghi chú
      </Typography>

      <Grid>
      <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Số ngày làm việc một tuần:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {contract?.workDatePerWeek}
            </Typography>
          </Grid>
        </Grid>
        
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>Ghi chú:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {contract?.note}
            </Typography>
          </Grid>
        </Grid>

        <Grid sx={{
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}>
            <Button variant="contained" size="small" sx={{ borderRadius:"10px" }}>Xem file</Button>
          </Grid>
      </Grid>
    </Grid>
  );
}

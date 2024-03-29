import { Grid, Typography } from "@mui/material";

// data
import Contract from "../../../app/models/contract";

// interface
interface Props {
  contract: Contract | undefined;
}
const fontStyle = "Mulish";
const gridStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  maxWidth: "100%",
  mb: "10px",
};
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  fontSize: "16px",
};
const infoStyle = {
  fontFamily: fontStyle,
  fontWeight: 500,
  fontSize: "16px",
};

export default function DetaiNote({ contract }: Props) {
  return (
    <Grid>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",

          fontFamily: fontStyle,
        }}
      >
        3. Thời gian làm việc và ghi chú
      </Typography>

      <Grid>
        <Grid container sx={gridStyle}>
          <Grid item xs={4}>
            <Typography sx={headerStyle}>Số ngày làm việc một tuần:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{contract?.workDatePerWeek}</Typography>
          </Grid>
        </Grid>

        <Grid container sx={gridStyle}>
          <Grid item xs={4}>
            <Typography sx={headerStyle}>Số người phụ thuộc:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{contract?.noOfDependences}</Typography>
          </Grid>
        </Grid>

        <Grid container sx={gridStyle}>
          <Grid item xs={4}>
            <Typography sx={headerStyle}>Ghi chú:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{contract?.note}</Typography>
          </Grid>
        </Grid>

        <Grid
          sx={{
            maxWidth: "100%",
          }}
        >
        </Grid>
      </Grid>
    </Grid>
  );
}

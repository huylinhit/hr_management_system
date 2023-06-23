import { Box, Grid, Typography } from "@mui/material";

// component
import DetailJob from "./DetailJob";
import DetailSalary from "./DetailSalary";
import DetaiNote from "./DetilNote";

export default function DetailContractInfo() {
  return (
    <Box sx={{ padding: "0 35px" }}>
      <Grid>
        <Typography
          sx={{
            color: "#246DD6",
            fontWeight: "600",
            fontSize: "25px",
            marginBottom: "5px",
          }}
        >
          Hợp đồng lao động 
        </Typography>
      </Grid>

      <Grid>
        <DetailJob />
        <DetailSalary />
        <DetaiNote />
      </Grid>
    </Box>
  );
}

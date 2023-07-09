import { Box, Grid, Typography } from "@mui/material";

// component
import DetailJob from "./DetailJob";
import DetailSalary from "./DetailSalary";
import DetaiNote from "./DetailNote";

// model
import Contract from "../../../app/models/contract";
import { Employee } from "../../../app/models/employee";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
}

export default function DetailContractInfo({ contract, employee }: Props) {
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
        <DetailJob contract={contract} employee={employee}/>
        <DetailSalary contract={contract} employee={employee}/>
        <DetaiNote contract={contract}/>
      </Grid>
    </Box>
  );
}

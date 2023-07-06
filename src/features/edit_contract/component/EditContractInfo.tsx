import { Box, Grid, Typography } from "@mui/material";

// component
import EditJob from "./EditJob";
import EditSalary from "./EditSalary";
import EditNote from "./EditNote";

// model
import { Contract } from "../../../app/models/contract";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
}

export default function EditContractInfo({ contract, employee }: Props) {
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
        <EditJob contract={contract} employee={employee}/>
        <EditSalary contract={contract} employee={employee}/>
        <EditNote contract={contract}/>
      </Grid>
    </Box>
  );
}

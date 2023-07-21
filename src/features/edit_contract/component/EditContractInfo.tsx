import { Box, Grid, Typography } from "@mui/material";

// component
import EditJob from "./component/EditJob";
import EditSalary from "./component/EditSalary";
import EditNote from "./component/EditNote";

// model
import Contract from "../../../app/models/contract";
import { UserInfor } from "../../../app/models/userInfor";

//
interface AllowanceField {
  allowanceId: number;
  allowanceTypeId: number;
  allowanceSalary: number;
}

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
  setContractForm: Function;
  allowanceForm: Array<AllowanceField> | undefined;
  setAllowanceForm: Function;
  allowanceDelete: Array<AllowanceField> | undefined
  setAllowanceDelete: Function
}

export default function EditContractInfo({
  contract,
  employee,
  setContractForm,
  allowanceForm,
  setAllowanceForm,
  allowanceDelete,
  setAllowanceDelete
}: Props) {
  return (
    <Box sx={{ padding: "0 35px" }}>
      <Grid>
        <Typography
          sx={{
            color: "#246DD6",
            fontWeight: "600",
            fontSize: "30px",
            fontFamily: "Mulish",
            marginBottom: "5px",
          }}
        >
          Hợp đồng lao động
        </Typography>
      </Grid>

      <Grid>
        <EditJob contract={contract} employee={employee} setContractForm={setContractForm} />
        <EditSalary
          contract={contract}
          employee={employee}
          setContractForm={setContractForm}
          allowanceForm={allowanceForm}
          setAllowanceForm={setAllowanceForm}
          allowanceDelete={allowanceDelete}
              setAllowanceDelete={setAllowanceDelete}
        />
        <EditNote contract={contract} setContractForm={setContractForm} />
      </Grid>
    </Box>
  );
}

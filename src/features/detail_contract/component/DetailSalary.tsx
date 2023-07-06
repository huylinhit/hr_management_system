import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

// data
import { ALLOWANCE, ALLOWANCETYPE } from "../../../app/store/data";
import { Contract } from "../../../app/models/contract";
import { Employee } from "../../../app/models/employee";
import { AllowanceType } from "../../../app/models/allowanceType";
import { Allowance } from "../../../app/models/allowance";

// interface
interface Props {
  contract: Contract;
  employee: Employee;
}

export default function DetailSalary({ contract, employee }: Props) {
  // // -------------------------- VAR -----------------------------
  // // -------------------------- STATE ---------------------------
  // const [allowanceTypes, setAllowanceTypes] =
  //   useState<AllowanceType[]>(ALLOWANCETYPE);
  // const [allowances, setAllowances] = useState<Allowance[]>(ALLOWANCE);
  // // -------------------------- REDUX ---------------------------
  // // -------------------------- EFFECT --------------------------
  // // -------------------------- FUNCTION ------------------------
  // const allowanceList = allowances.filter(
  //   (a) => a.contractId === contract.contractId
  // );

  return (
    <Grid sx={{ paddingBottom: "10px" }}>
      {/* <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        2. Lương, phụ cấp và các khoản bổ sung khác
      </Typography>

      <Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Lương căn bản:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {contract.salary}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Lương tính thuế:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {contract.taxableSalary}
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
            padding: "0 30px 0 30px",
          }}
        >
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Các phụ cấp (mỗi tháng):
            </Typography>
          </Grid>
          <Grid item xs={7}></Grid>
        </Grid>
        {allowanceList?.map((a) => (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              maxWidth: "100%",
              padding: "0 30px 5px 30px",
            }}
          >
            <Grid item xs={3}>
              {allowanceTypes.map((type) => {
                if (type.allowanceTypeId === a.allowanceTypeId) {
                  return (
                    <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                      {type.allowanceName}:
                    </Typography>
                  );
                }
              })}
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                {a?.allowanceSalary}
              </Typography>
            </Grid>
          </Grid>
        ))}

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 0 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Hình thức trả lương:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              Chuyển khoản
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
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
              Số tài khoản ngân hàng:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee.bankAccount}
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
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
              Chủ tài khoản:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee.bankAccountName}
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
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
              Ngân hàng:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee.bank}
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}

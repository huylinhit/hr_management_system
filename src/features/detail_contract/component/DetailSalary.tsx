import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

// data
import { ALLOWANCE, ALLOWANCETYPE } from "../../../app/store/data";
import Contract from "../../../app/models/contract";
import { Employee } from "../../../app/models/employee";
import { AllowanceType } from "../../../app/models/allowanceType";
import { Allowance } from "../../../app/models/allowance";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
}

export default function DetailSalary({ contract, employee }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  return (
    <Grid sx={{ paddingBottom: "10px" }}>
      <Typography
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
              {contract?.salary}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Lương tính thuế:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {contract?.taxableSalary}
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
        {contract?.allowances.map((a) => (
          <Grid
            container
            key={a.allowanceId}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              maxWidth: "100%",
              padding: "0 30px 5px 30px",
            }}
          >
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                {a.allowanceType.allowanceName}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                {a.allowanceSalary}
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
              {employee?.bankAccount}
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
              {employee?.bankAccountName}
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
              {employee?.bank}
            </Typography>
          </Grid>
        </Grid>
      </Grid> 
    </Grid>
  );
}

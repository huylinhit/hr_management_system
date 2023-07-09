import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

// model
import Contract from "../../../app/models/contract";
import { Department } from "../../../app/models/departments";
import { Employee } from "../../../app/models/employee";

// data
import { CONTRACTTYPE, DEPARTMENT } from "../../../app/store/data";
import { ContractType } from "../../../app/models/contractType";
import { UserInfor } from "../../../app/models/userInfor";
import moment from "moment";


// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
}

export default function DetailJob({ contract, employee }: Props) {
  // -------------------------- VAR -----------------------------  
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Grid sx={{ paddingBottom: "10px"}}>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        1. Công việc, phòng ban và thời hạn hợp đồng
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
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Phòng ban công tác:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.departmentName}
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
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Loại hợp đồng:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {contract?.contractType?.name} 
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
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Từ ngày:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {moment(contract?.startDate).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              -
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Đến ngày:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {moment(contract?.endDate).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

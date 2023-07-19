import { Grid, Typography } from "@mui/material";

// data
import Contract from "../../../app/models/contract";
import { UserInfor } from "../../../app/models/userInfor";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
}
const fontStyle = "Mulish";

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

          fontFamily: fontStyle,
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
          }}
        >
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Lương căn bản:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={infoStyle}>{contract?.salary}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Lương tính thuế:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={infoStyle}>{contract?.taxableSalary}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
          }}
        >
          <Grid item xs={4}>
            <Typography sx={headerStyle}>Các phụ cấp (mỗi tháng):</Typography>
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
            }}
          >
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                {a.allowanceType.allowanceName}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={infoStyle}>{a.allowanceSalary}</Typography>
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
          }}
        >
          <Grid item xs={3}>
            <Typography sx={headerStyle}>Hình thức trả lương:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={infoStyle}>Chuyển khoản</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Số TK ngân hàng:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{employee?.bankAccount}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Chủ tài khoản:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{employee?.bankAccountName}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Ngân hàng:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{employee?.bank}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

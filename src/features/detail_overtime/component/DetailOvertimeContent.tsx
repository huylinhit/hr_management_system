import { Container, Grid, Typography } from "@mui/material";

export default function DetailOvertimeContent() {
  // -------------------------- VAR -----------------------------
  const formField = [
    "Mã đơn: ",
    "Mã số nhân viên: ",
    "Tên nhân viên: ",
    "Loại đơn: ",
    "Từ: ",
    "Đến: ",
    "Số giờ làm: ",
    "Nội dung đơn: ",
    "Trạng thái: ",
    "Ngày gửi đơn: ",
    "Phản hồi: ",
  ];
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Grid container 
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Grid item xs={4} className="form-title">
        {formField.map((field) => (
          <Typography>{field}</Typography>
        ))}
      </Grid>
      <Grid item xs={8} className="form-content">
        <Typography>abc</Typography>
      </Grid>
    </Grid>
  );
}

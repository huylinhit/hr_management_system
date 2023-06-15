import {
  Container,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

// api
import { UserInfor } from "../../../app/models/userInfor";
import { LogOT } from "../../../app/models/LogOT";
import { OtType } from "../../../app/models/otType";

// interface
interface Props {
  staff: UserInfor;
  logOt: LogOT;
  types: OtType[];
}

export default function DetailOvertimeContent({ staff, logOt, types }: Props) {
  // -------------------------- VAR -----------------------------
  console.log(logOt);
  console.log(staff);
  const type = types.find((type) => type.otTypeId === logOt.otTypeId);
  const ticketStatus = ["Chờ duyệt", "Đồng ý", "Từ chối"];
  // -------------------------- STATE ---------------------------
  const [disable, setDisable] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
  };
  // -------------------------- MAIN ----------------------------
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Mã đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.otLogId}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Mã số nhân viên: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.staffId}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Tên nhân viên: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>
            {staff.lastName} {staff.firstName}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Loại đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{type?.typeName}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Từ: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.logStart}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Đến: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.logEnd}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Số giờ làm: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.logHours}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Nội dung đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.reason}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Ngày gửi đơn: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <Typography>{logOt.createAt}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Trạng thái: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedType}
              label="Status"
              onChange={handleChange}
            >
              {ticketStatus.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Phản hồi: </Typography>
        </Grid>
        <Grid item xs={8} className="form-content">
          <TextField
            id="outlined-multiline-flexible"
            label="Nhập phản hồi..."
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </>
  );
}

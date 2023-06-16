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
  Box,
} from "@mui/material";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

// api
import { UserInfor } from "../../../app/models/userInfor";
import { LogOT } from "../../../app/models/LogOT";
import { OtType } from "../../../app/models/otType";
import DetailForm from "./DetailForm";

// interface
interface Props {
  staff: UserInfor;
  logOt: LogOT;
  types: OtType[];
  setFormValue: Function;
  formValue: Object;
  finish: boolean;
}

export default function DetailLeaveContent({
  staff,
  logOt,
  types,
  formValue,
  setFormValue,
  finish,
}: Props) {
  // -------------------------- VAR -----------------------------
  const ticketStatus = ["Chờ duyệt", "Đồng ý", "Từ chối"];
  // -------------------------- STATE ---------------------------
  const [disable, setDisable] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const handleSelect = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
  };

  const handleChange = (event: Object) => {
    console.log(event);
  };
  // -------------------------- MAIN ----------------------------
  return (
    <>
      <DetailForm logOt={logOt} staff={staff} types={types} />

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
        {logOt.status === "Chờ duyệt" ? (
          <Grid item xs={8} className="form-content">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedType}
                label="Status"
                onChange={handleSelect}
              >
                {ticketStatus.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={8} className="form-content">
            <Box
              sx={{
                backgroundColor: "#F14668",
                padding: "10px",
                width: "110px",
                borderRadius: "20px",
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "500" }}>
                {logOt.status}
              </Typography>
            </Box>
          </Grid>
        )}
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
        {logOt.status === "Chờ duyệt" ? (
          <Grid item xs={8} className="form-content">
            <TextField
              id="outlined-multiline-flexible"
              label="Nhập phản hồi..."
              multiline
              rows={4}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={8} className="form-content">
            <Typography>{logOt.processNote}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

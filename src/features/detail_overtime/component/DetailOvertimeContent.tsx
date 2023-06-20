import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormControl,
  Box,
  Chip,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material/Select";

// data
import { FORMSTATUS } from "../../../app/store/data";

// api
import { UserInfor } from "../../../app/models/userInfor";
import { LogOT } from "../../../app/models/LogOT";
import { OtType } from "../../../app/models/otType";

// component
import DetailForm from "./DetailForm";


// interface
interface Props {
  staff: UserInfor;
  logOt: LogOT;
  types: OtType[];
}

export default function DetailOvertimeContent({ staff, logOt, types }: Props) {
  // -------------------------- VAR -----------------------------
  const { id } = useParams<{ id: string }>()
  const { register } = useForm();
  // -------------------------- STATE ---------------------------
  const [selectedType, setSelectedType] = useState("");
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    
  }, [ id ])
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
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Trạng thái: </Typography>
        </Grid>
        {logOt.status === FORMSTATUS.pending ? (
          <Grid item xs={8} className="form-content">
            <FormControl fullWidth size="small">
              <InputLabel>Chọn</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedType}
                label="Status"
                // onChange={handleSelect}
                {...register("status")}
              >
                <MenuItem value={FORMSTATUS.pending}>{FORMSTATUS.pending}</MenuItem>
                <MenuItem value={FORMSTATUS.agree}>{FORMSTATUS.agree}</MenuItem>
                <MenuItem value={FORMSTATUS.disagree}>{FORMSTATUS.disagree}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={8} className="form-content">
            <Chip
              label={logOt.status}
              color={
                logOt.status === FORMSTATUS.agree ? 
                  "info" : "error"
              }
            />
          </Grid>
        )}
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} className="form-title">
          <Typography>Phản hồi: </Typography>
        </Grid>
        {logOt.status === FORMSTATUS.pending ? (
          <Grid item xs={8} className="form-content">
            <TextField
              id="outlined-multiline-flexible"
              label="Nhập phản hồi..."
              fullWidth
              multiline
              rows={2}
              {...register("processNote", { required: "Không để trống phần phản hồi" })}
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

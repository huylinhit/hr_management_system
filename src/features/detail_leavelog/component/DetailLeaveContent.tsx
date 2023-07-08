import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormControl,
  Chip,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// data
import { FORMSTATUS } from "../../../app/store/data";

// api
import { Employee } from "../../../app/models/employee";

// component
import DetailForm from "./DetailForm";
import { LeaveLog } from "../../../app/models/leaveLog";
import { LeaveType } from "../../../app/models/leaveType";


// interface
interface Props {
  staff: Employee;
  logLeave: LeaveLog | undefined;
  types: LeaveType[];
}

export default function DetailLeaveContent({ staff, logLeave, types }: Props) {
  // -------------------------- VAR -----------------------------
  const { id } = useParams<{ id: string }>()
  const { register } = useForm();
  // -------------------------- STATE ---------------------------
  const [selectedType, setSelectedType] = useState("");
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  useEffect(() => {}, [id]);
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
      <DetailForm 
      logLeave={logLeave} 
      staff={staff} 
      types={types} />

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "22px",
            marginBottom: "15px",
          }}>Trạng thái: </Typography>
        </Grid>
        {logLeave?.status === FORMSTATUS.pending ? (
          <Grid item xs={8}>
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
          <Grid item xs={8}>
            <Chip
              label={logLeave?.status}
              color={
                logLeave?.status === FORMSTATUS.agree ? 
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
        <Grid item xs={4}>
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "22px",
            marginBottom: "15px",
          }}>Phản hồi: </Typography>
        </Grid>
        {logLeave?.status === FORMSTATUS.pending ? (
          <Grid item xs={8}>
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
          <Grid item xs={8}>
            <Typography sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}>{logLeave?.processNote}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

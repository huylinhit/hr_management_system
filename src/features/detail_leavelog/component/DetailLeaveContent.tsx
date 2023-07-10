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
  Button,
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
import axios from "axios";
import moment from "moment";


// interface
interface Props {
  staff: Employee;
  logLeave: LeaveLog | undefined;
  types: LeaveType[];
}

export default function DetailLeaveContent({ staff, logLeave, types }: Props) {
  const type = types.find((type) => type.leaveTypeId === logLeave?.leaveTypeId);
  const [processNote, setProcessNote] = useState("");
  const [status, setStatus] = useState(logLeave?.status);

  const [editedProcessNote, setEditedProcessNote] = useState(logLeave?.processNote);

  const handleProcessNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProcessNote = event.target.value;
    setEditedProcessNote(updatedProcessNote);
  };

 
  const handleStatusChange = (event: SelectChangeEvent<any>) => {
    const updatedStatus = event.target.value as string;
    setStatus(updatedStatus);
  };
 
  const handleUpdateInfo = () => {
    if ( status !== logLeave?.status|| editedProcessNote !== logLeave?.processNote) {
      axios
        .put(`logots/${logLeave?.leaveLogId}/staffs/${logLeave?.staffId}`, {
        
          status: status,
          processNote: editedProcessNote,
        })
        .then((response) => {
          console.log("Sửa đổi thành công:");
        })
        .catch((error) => {
          console.error("Lỗi khi sửa đổi:", error);
        });
    } else {
      console.log("Không có sự thay đổi. Không gọi API.");
    }
  };


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
  const textField = register("processNote", {
    required: "Không để trống phần phản hồi",
  });
  // -------------------------- MAIN ----------------------------
  return (
    <>
    <Button onClick={handleUpdateInfo}>hello</Button>
      {/* <DetailForm 
      logLeave={logLeave} 
      staff={staff} 
      types={types} /> */}
 <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>
            Mã đơn: {" "}
            </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave?.leaveLogId}
          </Typography>
        </Grid>
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
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Mã số nhân viên: {" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave?.staffId}
          </Typography>
        </Grid>
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
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Tên nhân viên: {" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
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
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Loại đơn: {" "}
           </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {type?.leaveTypeName}
          </Typography>
        </Grid>
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
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Từ: {" "}  
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {moment(logLeave?.leaveStart).format("DD-MM-YYYY")}
           
          </Typography>
        </Grid>
        <Grid item xs={1} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>
            -
            </Typography>
        </Grid>
        <Grid item xs={2} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Đến: {" "}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {moment(logLeave?.leaveEnd).format("DD-MM-YYYY")}
          </Typography>
        </Grid>
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
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Số ngày nghỉ: {" "}
           </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave?.leaveDays} ngày
          </Typography>
        </Grid>
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
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Nội dung đơn: {" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logLeave?.description}
          </Typography>
        </Grid>
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
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Ngày gửi đơn: {" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
           sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {moment(logLeave?.createAt).format("DD-MM-YYYY")}
            
          </Typography>
        </Grid>
      </Grid>
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
          }}>
            Trạng thái:{" "}
             </Typography>
        </Grid>
        {/* {logLeave?.status === FORMSTATUS.pending ? (
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
        )} */}
        <Grid item xs={8}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> {logLeave?.status}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Trạng thái" 
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value={'rejected'}>rejected</MenuItem>
          <MenuItem value={'pending'}>pending</MenuItem>
          <MenuItem value={'accepted'}>accepted</MenuItem>
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
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "22px",
            marginBottom: "15px",
          }}>
            Phản hồi:{" "}
             </Typography>
        </Grid>
        {/* {logLeave?.status === FORMSTATUS.pending ? (
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
            <Typography 
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
            >
              {logLeave?.processNote}
              </Typography>
          </Grid>
        )} */}
        <Grid item xs={8}>
          <TextField
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
            defaultValue={logLeave?.processNote}
            onChange={handleProcessNoteChange}
          ></TextField>
        </Grid>
      </Grid>
    </>
  );
}

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
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// data
import { FORMSTATUS } from "../../../app/store/data";

// api
import { Employee } from "../../../app/models/employee";

import { OtType } from "../../../app/models/otType";

// component
import DetailForm from "./DetailForm";
import { LogOvertime } from "../../../app/models/logOvertime";
import axios, { AxiosError } from "axios";
import { type } from "@testing-library/user-event/dist/type";
import moment from "moment";

// interface
interface Props {
  staff: Employee;
  logOt: LogOvertime;
  types: OtType[];
}

export default function DetailOvertimeContent({ staff, logOt, types }: Props) {
  const type = types.find((type) => type.otTypeId === logOt.otTypeId);

  const [processNote, setProcessNote] = useState("");

  const [status, setStatus] = useState(logOt.status);
  // const [logHours, setLogHours] = useState(logOt.logHours);
  const [editedLogHours, setEditedLogHours] = useState(Number(logOt.logHours));
  const [editedProcessNote, setEditedProcessNote] = useState(logOt.processNote);

  const handleProcessNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedProcessNote = event.target.value;
    setEditedProcessNote(updatedProcessNote);
  };

  const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLogHours = Number(event.target.value);
    setEditedLogHours(updatedLogHours);
  };
  const handleStatusChange = (event: SelectChangeEvent<any>) => {
    const updatedStatus = event.target.value as string;
    setStatus(updatedStatus);
  };

  const handleUpdateInfo = () => {
    if (
      editedLogHours !== logOt.logHours ||
      status !== logOt.status ||
      editedProcessNote !== logOt.processNote
    ) {
      axios
        .put(`logots/${logOt.otLogId}/staffs/${logOt.staffId}`, {
          logHours: editedLogHours,
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
  const { id } = useParams<{ id: string }>();
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
  console.log(processNote);

  // -------------------------- MAIN ----------------------------
  return (
    <>
      {/* <DetailForm
        // staffId={staffId}
        logOt={logOt}
        staff={staff}
        types={types}
      /> */}

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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Mã đơn:{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logOt.otLogId}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Mã số nhân viên:{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logOt.staffId}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Tên nhân viên:{" "}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Loại đơn:{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {type?.typeName}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Từ:{" "}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {moment(logOt.logStart).format("DD-MM-YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            -
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Đến:{" "}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {moment(logOt.logEnd).format("DD-MM-YYYY")}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Số giờ làm:{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
            defaultValue={logOt.logHours}
            onChange={handleChangeInfo}
          ></TextField>
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Nội dung đơn:{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {logOt.reason}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "550",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Ngày gửi đơn:{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {moment(logOt.createAt).format("DD-MM-YYYY")}
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Trạng thái:{" "}
          </Typography>
        </Grid>
        {/* {logOt.status === FORMSTATUS.pending ? (
          <Grid
            item
            xs={8}
            sx={{ fontStyle: "normal", fontƯeight: "400", fontSize: "20px " }}
          >
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
                <MenuItem value={FORMSTATUS.pending}>
                  {FORMSTATUS.pending}
                </MenuItem>
                <MenuItem value={FORMSTATUS.agree}>{FORMSTATUS.agree}</MenuItem>
                <MenuItem value={FORMSTATUS.disagree}>
                  {FORMSTATUS.disagree}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={8}>
            <Chip
              label={logOt.status}
              color={logOt.status === FORMSTATUS.agree ? "info" : "error"}
            />
          </Grid>
        )} */}
        <Grid item xs={8}>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {logOt.status}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tăng ca thường"
              onChange={handleStatusChange}
            >
              <MenuItem value={"rejected"}>rejected</MenuItem>
              <MenuItem value={"pending"}>pending</MenuItem>
              <MenuItem value={"accecpted"}>accecpted</MenuItem>
            </Select>
          </FormControl> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {" "}
              {logOt.status}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Trạng thái"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value={"rejected"}>rejected</MenuItem>
              <MenuItem value={"pending"}>pending</MenuItem>
              <MenuItem value={"approved"}>approved</MenuItem>
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
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Phản hồi:{" "}
          </Typography>
        </Grid>
        {/* {logOt.status === "pending" ? (
          <Grid item xs={8}>
            <TextField
              id="outlined-multiline-flexible"
              label="Nhập phản hồi..."
              fullWidth
              multiline
              {...textField}
              onChange={(e) => setProcessNote(e.target.value)}

              // rows={2}
              // {...register("processNote", {
              //   required: "Không để trố.valueng phần phản hồi",
              // }
              // )}
            />
          </Grid>
        ) : (
          <Grid item xs={8}>
            <Typography
              sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "20px " }}
            >
              {logOt.processNote}
            </Typography>
          </Grid>
        )} */}
        <Grid item xs={8}>
          <TextField
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
            defaultValue={logOt.processNote}
            onChange={handleProcessNoteChange}
          ></TextField>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "30px 50px",
        }}
      >
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              border: "1.5px solid #007FFF",
              borderRadius: "20px",
              padding: "auto",
            }}
            startIcon={<ArrowBackIcon />}
          >
            Quay về
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            type="submit"
            sx={{
              border: "1.5px solid #007FFF",
              borderRadius: "20px",
              padding: "auto",
            }}
            onClick={handleUpdateInfo}
          >
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

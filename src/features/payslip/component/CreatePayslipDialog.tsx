import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, IconButton, Button, Container, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme, responsiveFontSizes, Box, Checkbox, FormControlLabel, Link, SelectChangeEvent } from "@mui/material";
import { blue } from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DateRangePicker } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import moment from "moment";
import agent from "../../../app/api/agent";
import { useNavigate } from "react-router-dom";
const emails = ['username@gmail.com', 'user02@gmail.com'];
export interface Props {
  open: boolean;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface Time {
  id: number,
  month: number,
  year: number
}

const time: Time[] = [];

for (let id = 1; id <= 12; id++) {
  const month = id;
  const year = moment().year();

  time.push({ id, month, year });
}

function CreatePayslipDialog({ open, handleClose }: any) {
  const [type, setTypes] = useState('');
  const [month, setMonth] = useState<Time>();
  console.log(time);
  const navigate = useNavigate();
  const types = [
    "Tạo bảng lương cho toàn bộ nhân viên",
    "Tạo bảng lương theo phòng ban",
    "Tạo bảng lương cho một cá nhân"
  ]
  const handleChange = (event: SelectChangeEvent) => {
    setTypes(event.target.value as string);
  };

  const handleMonth = (e: any) => {
    setMonth(e.target.value as Time)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(month)
    agent.Payslip.createAllStaff(
      { month: month, year: 2023 }
    )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      }
      )
    navigate('/payslips ');
  }


  return (
    <Dialog open={open} onClose={handleClose} sx={{ height: "100vh", width: "100%" }}>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Chọn cách tạo bảng lương"
            onChange={handleChange}
          >
            {types.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>{item}</MenuItem>
              )
            })}
          </Select>

          <Select
            fullWidth
            value={month}
            label="Tạo bảng lương theo tháng"
            onChange={handleMonth}
          >
            {time.map((item) => (
              <MenuItem key={item.id} value={item.month}>
                {item.month}/{item.year}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
          >
            Tạo bảng lương
          </Button>

        </Box>
      </DialogContent>
    </Dialog>

  );
}
export default CreatePayslipDialog;

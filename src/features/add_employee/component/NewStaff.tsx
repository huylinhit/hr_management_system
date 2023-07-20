import {
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Department } from "../../../app/models/department";
import { User } from "../model/user";
import dayjs from "dayjs";

// interface
interface Props {
  setUserForm: Function;
  departments: Department[];
  userForm: User;
}
const fontStyle = "Mulish";
const verticalSpacing = {
  marginBottom: "10px",
};
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  mb: "5px",
};
const validateCitizenID = (citizenID: any) => {
  const citizenIDRegex = /^\d{12}$/;
  return citizenIDRegex.test(citizenID);
};

export default function NewStaff({ setUserForm, departments, userForm }: Props) {
  return (
    <Grid container sx={{ mt: "50px" }}>
      <Grid container spacing={2} sx={{ ...verticalSpacing }}>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Họ</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.lastName === "" ? "Nhập họ" : ""}
            defaultValue={userForm.lastName === "" ? "" : userForm.lastName}
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                lastName: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Tên</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.firstName === "" ? "Nhập tên" : ""}
            defaultValue={userForm.firstName === "" ? "" : userForm.firstName}
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                firstName: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ ...verticalSpacing }}>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Giới tính</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            value={userForm.gender}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                gender: e.target.value,
              }))
            }
          >
            <FormControlLabel value={false} control={<Radio />} label="Nữ" />
            <FormControlLabel value={true} control={<Radio />} label="Nam" />
          </RadioGroup>
        </Grid>

        <Grid item xs={6}>
          <Typography sx={headerStyle}>Quốc tịch</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.country === "" ? "Nhập quốc tịch" : ""}
            defaultValue={userForm.country === "" ? "" : userForm.country}
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                country: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ ...verticalSpacing }}>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Số điện thoại</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.phone === "" ? "Nhập số điện thoại" : ""}
            defaultValue={userForm.phone === "" ? "" : userForm.phone}
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                phone: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Ngày sinh</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(userForm.dob)}
              onChange={(e: any) =>
                setUserForm((prevForm: any) => ({
                  ...prevForm,
                  dob: e?.format("YYYY-MM-DD"),
                }))
              }
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Typography sx={headerStyle}>Địa chỉ</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.address === "" ? "Nhập địa chỉ" : ""}
            defaultValue={userForm.address === "" ? "" : userForm.address}
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                address: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ ...verticalSpacing }}>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Phòng ban</Typography>
          <TextField
            select
            required
            type="text"
            sx={{ width: "100%", marginBottom: "20px" }}
            name="departmentId"
            value={userForm.departmentId}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                departmentId: e.target.value,
              }))
            }
          >
            {departments.map((department, index) => (
              <MenuItem key={index} value={department.departmentId}>
                {department.departmentName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>CCCD|CMND</Typography>
          <TextField
            required
            error={!validateCitizenID(userForm.citizenId)}
            helperText={!validateCitizenID(userForm.citizenId) ? "CCCD|CMND phải có 12 số" : ""}
            type="text"
            placeholder={userForm.citizenId === "" ? "Nhập CCCD|CMND" : ""}
            defaultValue={userForm.citizenId === "" ? "" : userForm.citizenId}
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                citizenId: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ ...verticalSpacing }}>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Tên tài khoản ngân hàng</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.bankAccountName === "" ? "Nhập tên tài khoản ngân hàng" : ""}
            defaultValue={userForm.bankAccountName === "" ? "" : userForm.bankAccountName}
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                bankAccountName: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={headerStyle}>Số tài khoản ngân hàng</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.bankAccount === "" ? "Nhập số tài khoản ngân hàng" : ""}
            defaultValue={userForm.bankAccount === "" ? "" : userForm.bankAccount}
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                bankAccount: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Typography sx={headerStyle}>Ngân hàng</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.bank === "" ? "Nhập ngân hàng" : ""}
            defaultValue={userForm.bank === "" ? "" : userForm.bank}
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                bank: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

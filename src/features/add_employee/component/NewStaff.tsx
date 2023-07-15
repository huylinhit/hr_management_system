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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Department } from "../../../app/models/department";
import { User } from "../model/user";
import dayjs from "dayjs";

// interface
interface Props {
  setUserForm: Function;
  departments: Department[];
  userForm: User;
}

export default function NewStaff({
  setUserForm,
  departments,
  userForm,
}: Props) {
  return (
    <Container
      sx={{
        margin: "20px 0",
        border: "solid 1px rgba(226, 225, 229, 1)",
        borderRadius: "10px",
        padding: "30px 0",
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Họ</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.lastName === "" ? "Nhập họ" : ""}
            defaultValue={userForm.lastName === "" ? "" : userForm.lastName}
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                lastName: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Tên</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.firstName === "" ? "Nhập firstName" : ""}
            defaultValue={userForm.firstName === "" ? "" : userForm.firstName}
            size="small"
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

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Giới tính</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={userForm.gender}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                gender: e.target.value,
              }))
            }
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value={true} control={<Radio />} label="Male" />
          </RadioGroup>
        </Grid>

        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Quốc tịch</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.country === "" ? "Nhập quốc tịch" : ""}
            defaultValue={userForm.country === "" ? "" : userForm.country}
            size="small"
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

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Số điện thoại</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.phone === "" ? "Nhập số điện thoại" : ""}
            defaultValue={userForm.phone === "" ? "" : userForm.phone}
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                phone: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Ngày sinh</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(e: any) =>
                  setUserForm((prevForm: any) => ({
                    ...prevForm,
                    dob: e?.format("YYYY-MM-DD"),
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0 45px",
        }}
      >
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Địa chỉ</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.address === "" ? "Nhập địa chỉ" : ""}
            defaultValue={userForm.address === "" ? "" : userForm.address}
            size="small"
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

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>CCCD|CMND</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.citizenId === "" ? "Nhập CCCD|CMND" : ""}
            defaultValue={userForm.citizenId === "" ? "" : userForm.citizenId}
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                citizenId: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Phòng ban</Typography>
          <TextField
            select
            required
            type="text"
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            defaultValue={userForm.departmentId}
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
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Chức vụ</Typography>
          <TextField
            select
            disabled
            required
            type="text"
            defaultValue="false"
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                isManager: e.target.value,
              }))
            }
          >
            <MenuItem value="false">Không</MenuItem>
            <MenuItem value="true">Quản lý</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>
            Tên tài khoản ngân hàng
          </Typography>
          <TextField
            required
            type="text"
            placeholder={
              userForm.bankAccountName === ""
                ? "Nhập tên tài khoản ngân hàng"
                : ""
            }
            defaultValue={
              userForm.bankAccountName === "" ? "" : userForm.bankAccountName
            }
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                bankAccountName: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>
            Số tài khoản ngân hàng
          </Typography>
          <TextField
            required
            type="text"
            placeholder={
              userForm.bankAccount === "" ? "Nhập số tài khoản ngân hàng" : ""
            }
            defaultValue={
              userForm.bankAccount === "" ? "" : userForm.bankAccount
            }
            size="small"
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

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0 45px",
        }}
      >
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Ngân hàng</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.bank === "" ? "Nhập ngân hàng" : ""}
            defaultValue={userForm.bank === "" ? "" : userForm.bank}
            size="small"
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
    </Container>
  );
}

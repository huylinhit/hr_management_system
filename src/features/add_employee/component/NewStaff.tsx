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

// interface
interface Props {
  setUserForm: Function;
  departments: Department[];
}

export default function NewStaff({ setUserForm, departments }: Props) {
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
          <Typography sx={{ fontSize: "18px" }}>Họ</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập họ"
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
          <Typography sx={{ fontSize: "18px" }}>Tên</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập tên"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                firstname: e.target.value,
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
          <Typography sx={{ fontSize: "18px" }}>Giới tính</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
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
          <Typography sx={{ fontSize: "18px" }}>Quốc tịch</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập quốc tịch"
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
          <Typography sx={{ fontSize: "18px" }}>Số điện thoại</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập số điện thoại"
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
          <Typography sx={{ fontSize: "18px" }}>Ngày sinh</Typography>
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
          <Typography sx={{ fontSize: "18px" }}>Địa chỉ</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập địa chỉ"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
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
          <Typography sx={{ fontSize: "18px" }}>CCCD|CMND</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập CCCD|CMND"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
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
          <Typography sx={{ fontSize: "18px" }}>Phòng ban</Typography>
          <TextField
            select
            required
            type="text"
            placeholder="Nhập phòng ban"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            defaultValue={0}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                departmentId: e.target.value,
              }))
            }
          >
            {departments.map((department, index) => (
                <MenuItem value={index+1}>{department.departmentName}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "18px" }}>Chức vụ</Typography>
          <TextField
            select
            required
            type="text"
            placeholder="Nhập chức vụ"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            defaultValue="false"
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
          <Typography sx={{ fontSize: "18px" }}>
            Tên tài khoản ngân hàng
          </Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập tên tài khoản ngân hàng"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                bankAccountName: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "18px" }}>
            Số tài khoản ngân hàng
          </Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập số tài khoản ngân hàng"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
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
          <Typography sx={{ fontSize: "18px" }}>Ngân hàng</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập ngân hàng"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
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

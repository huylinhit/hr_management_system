import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Grid, Typography, TextField, MenuItem, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Contract } from "../model/contract";

// interface
interface Props {
  contractForm: Contract;
  setContractForm: Function;
}

const fontStyle = "Mulish";
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  mb: "5px",
};
const verticalSpacing = {
  mb: "15px",
};
export default function FormContent({ contractForm, setContractForm }: Props) {
  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2} sx={{ ...verticalSpacing }}>
          <Grid item xs={12}>
            <Typography sx={{ ...headerStyle, fontSize: "30px", mb: "50px" }}>
              Tạo mới hợp đồng
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Loại hợp đồng</Typography>
            <TextField
              required
              select
              id="outlined-required"
              sx={{ width: "100%", marginBottom: "20px" }}
              name="contractTypeId"
              value={contractForm.contractTypeId}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  contractTypeId: e.target.value,
                }))
              }
            >
              <MenuItem value={1}>Hợp đồng xác định thời hạn</MenuItem>
              <MenuItem value={2}>Hợp đồng không xác định thời hạn</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Loại lương</Typography>
            <TextField
              required
              select
              placeholder="Loại lương"
              sx={{ width: "100%", marginBottom: "20px" }}
              name="salaryType"
              value={contractForm.salaryType}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  salaryType: e.target.value,
                }))
              }
            >
              <MenuItem value="Gross To Net">Gross To Net</MenuItem>
              <MenuItem value="Net To Gross">Net To Gross</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: "30px" }}>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Ngày bắt đầu hợp đồng</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                onChange={(e: any) =>
                  setContractForm((prevForm: any) => ({
                    ...prevForm,
                    startDate: e?.format("YYYY-MM-DD"),
                  }))
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Ngày kết thúc hợp đồng</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={contractForm.contractTypeId === 1 ? false : true}
                onChange={(e: any) =>
                  setContractForm((prevForm: any) => ({
                    ...prevForm,
                    endDate: e?.format("YYYY-MM-DD"),
                  }))
                }
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ...verticalSpacing }}>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Lương căn bản</Typography>
            <TextField
              required
              type="number"
              placeholder={"Nhập lương căn bản"}
              sx={{ width: "100%", marginBottom: "20px" }}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  salary: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Lương tính thuế</Typography>
            <TextField
              required
              type="number"
              placeholder={"Nhập lương tính thuế"}
              sx={{ width: "100%", marginBottom: "20px" }}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  taxableSalary: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ...verticalSpacing }}>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Số ngày làm một tuần</Typography>
            <TextField
              required
              type="number"
              placeholder="Nhập ngày"
              sx={{ width: "100%", marginBottom: "20px20px" }}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  workDatePerWeek: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Ghi chú</Typography>
            <TextField
              type="text"
              placeholder="Nhập ghi chú"
              sx={{ width: "100%", marginBottom: "20px20px" }}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  note: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

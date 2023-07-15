import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Contract } from "../model/contract";

// interface
interface Props {
  contractForm: Contract;
  setContractForm: Function;
}

export default function FormContent({ contractForm, setContractForm }: Props) {
  return (
    <>
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
          <Typography sx={{ fontSize: "16px" }}>Loại hợp đồng</Typography>
          <TextField
            required
            select
            id="outlined-required"
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            defaultValue={1}
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
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "16px" }}>Loại lương</Typography>
          <TextField
            required
            select
            placeholder="Loại lương"
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            defaultValue="Gross To Net"
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

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "16px" }}>
            Ngày bắt đầu hợp đồng
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                disablePast
                onChange={(e: any) =>
                  setContractForm((prevForm: any) => ({
                    ...prevForm,
                    startDate: e?.format("YYYY-MM-DD"),
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "16px" }}>
            Ngày kết thúc hợp đồng
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                disablePast
                onChange={(e: any) =>
                  setContractForm((prevForm: any) => ({
                    ...prevForm,
                    endDate: e?.format("YYYY-MM-DD"),
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
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "16px" }}>Lương căn bản</Typography>
          <TextField
            required
            type="number"
            placeholder={"Nhập lương căn bản"}
            size="small"
            sx={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) =>
              setContractForm((prevForm: any) => ({
                ...prevForm,
                salary: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "16px" }}>Lương tính thuế</Typography>
          <TextField
            required
            type="number"
            placeholder={"Nhập lương tính thuế"}
            size="small"
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
          <Typography sx={{ fontSize: "16px" }}>
            Số ngày làm một tuần
          </Typography>
          <TextField
            required
            type="number"
            placeholder="Nhập ngày"
            size="small"
            sx={{ width: "100%", marginBottom: "20px20px" }}
            onChange={(e) =>
              setContractForm((prevForm: any) => ({
                ...prevForm,
                workDatePerWeek: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "16px" }}>Ghi chú</Typography>
          <TextField
            type="text"
            placeholder="Nhập ghi chú"
            size="small"
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
    </>
  );
}

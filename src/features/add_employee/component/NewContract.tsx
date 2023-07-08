import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppSelector } from "../../../app/store/configureStore";
import { allowanceTypeSelectors } from "../../../app/store/allowanceType/allowanceTypeSlice";

// interface
interface AllowanceField {
  allowanceTypeId: number;
  allowanceSalary: number;
}

interface Props {
  setUserForm: Function;
  allowanceForm: Array<AllowanceField>;
  setAllowanceForm: Function;
}

export default function NewContract({
  setUserForm,
  allowanceForm,
  setAllowanceForm,
}: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- REDUX ---------------------------
  const allowanceType = useAppSelector((state) =>
    allowanceTypeSelectors.selectAll(state)
  ).filter(
    (type) =>
      !allowanceForm
        .map((a) => a.allowanceTypeId)
        .includes(type.allowanceTypeId)
  );
  console.log(allowanceType);
  // -------------------------- STATE ---------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Container
      sx={{
        margin: "20px",
        border: "solid 1px rgba(226, 225, 229, 1)",
        borderRadius: "10px",
        padding: "30px 0",
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
          <Typography sx={{ fontSize: "18px" }}>Loại hợp đồng</Typography>
          <TextField
            required
            select
            id="outlined-required"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            defaultValue={1}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                lastName: e.target.value,
              }))
            }
          >
            <MenuItem value={1}>Hợp đồng xác định thời hạn</MenuItem>
            <MenuItem value={2}>Hợp đồng không xác định thời hạn</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "18px" }}>Loại lương</Typography>
          <TextField
            required
            select
            placeholder="Loại lương"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            defaultValue={1}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                contractTypeId: e.target.value,
              }))
            }
          >
            <MenuItem value={1}>Gross To Net</MenuItem>
            <MenuItem value={2}>Net To Gross</MenuItem>
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
            Ngày bắt đầu hợp đồng
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(e: any) =>
                  setUserForm((prevForm: any) => ({
                    ...prevForm,
                    startDate: e?.format("YYYY-MM-DD"),
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontSize: "18px" }}>
            Ngày kết thúc hợp đồng
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(e: any) =>
                  setUserForm((prevForm: any) => ({
                    ...prevForm,
                    EncodedVideoChunkDate: e?.format("YYYY-MM-DD"),
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
          <Typography sx={{ fontSize: "18px" }}>Lương căn bản</Typography>
          <TextField
            required
            type="number"
            placeholder="Nhập lương căn bản"
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
          <Typography sx={{ fontSize: "18px" }}>Lương tính thuế</Typography>
          <TextField
            required
            type="number"
            placeholder="Nhập lương tính thuế"
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
          <Typography sx={{ fontSize: "18px" }}>
            Số ngày làm một tuần
          </Typography>
          <TextField
            required
            type="number"
            placeholder="Số ngày"
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
          <Typography sx={{ fontSize: "18px" }}>Ghi chú</Typography>
          <TextField
            type="text"
            placeholder="Nhập ghi chú"
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
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 45px",
        }}
      >
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "18px" }}>Phụ cấp</Typography>
        </Grid>
        {allowanceForm.map((allowance, index) => (
          <Grid
            item
            key={allowance.allowanceTypeId}
            xs={12}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item xs={5.5}>
              <TextField
                required
                select
                type="text"
                placeholder="Phụ cấp"
                size="small"
                sx={{ width: "100%", marginBottom: "15px" }}
                defaultValue={0}
                onChange={(e) => {
                  const updateField = [...allowanceForm];
                  updateField[index].allowanceTypeId = Number(e.target.value);
                  setAllowanceForm(updateField);
                }}
              >
                {allowanceType.map((type) => (
                  <MenuItem value={type.allowanceTypeId}>
                    {type.allowanceName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Typography>-</Typography>
            </Grid>
            <Grid item xs={5.5}>
              <TextField
                required
                type="number"
                placeholder="Nhập phụ cấp"
                size="small"
                sx={{ width: "100%", marginBottom: "15px" }}
                onChange={(e) => {
                  const updateField = [...allowanceForm];
                  updateField[index].allowanceSalary = Number(e.target.value);
                  setAllowanceForm(updateField);
                }}
              />
            </Grid>
          </Grid>
        ))}
        <IconButton
          aria-label="delete"
          onClick={() =>
            setAllowanceForm([
              ...allowanceForm,
              { allowanceTypeId: 0, allowanceSalary: 0 },
            ])
          }
        >
          <AddCircleIcon sx={{ color: "#007FFF", fontSize: "35px" }} />
        </IconButton>
      </Grid>
    </Container>
  );
}

import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// model
import Contract from "../../../../app/models/contract";

// data
import { UserInfor } from "../../../../app/models/userInfor";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
  setContractForm: Function;
}

export default function EditJob({
  contract,
  employee,
  setContractForm,
}: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Grid sx={{ paddingBottom: "10px" }}>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        1. Công việc, phòng ban và thời hạn hợp đồng
      </Typography>

      <Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Phòng ban công tác:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.departmentName}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Loại hợp đồng:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              select
              id="outlined-required"
              label="Loại hợp đồng"
              size="small"
              margin="dense"
              defaultValue={contract?.contractType?.contractTypeId}
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
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Từ ngày:
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  value={dayjs(
                    moment(contract?.startDate).format("YYYY-MM-DD")
                  )}
                  onChange={(e) =>
                    setContractForm((prevForm: any) => ({
                      ...prevForm,
                      startDate: e?.format("YYYY-MM-DD"),
                    }))
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={0.5}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              -
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Đến ngày:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  value={dayjs(moment(contract?.endDate).format("DD-MM-YYYY"))}
                  onChange={(e) =>
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
      </Grid>
    </Grid>
  );
}

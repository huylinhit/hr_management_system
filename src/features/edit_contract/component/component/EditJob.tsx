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
import { addMonths } from "date-fns";
import { useEffect } from "react";

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
  setContractForm: Function;
}
const fontStyle = "Mulish";

const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  fontSize: "16px",
};
const infoStyle = {
  fontFamily: fontStyle,
  fontWeight: 500,
  fontSize: "16px",
};
export default function EditJob({ contract, employee, setContractForm }: Props) {
  // -------------------------- VAR -----------------------------
  const disabledEndDate = contract?.contractTypeId == 2 ? true : false;
  const disabledStartDate = contract?.contractStatus == true ? true : false;
  const formatDate: string = contract?.startDate!;
  const date = new Date(formatDate);
  const maxDate = dayjs(addMonths(date, 3));

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
          fontFamily: fontStyle,
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
            <Typography sx={headerStyle}>Phòng ban công tác:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={infoStyle}>{employee?.departmentName}</Typography>
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
            <Typography sx={headerStyle}>Loại hợp đồng:</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              select
              id="outlined-required"
              label="Loại hợp đồng"
              size="small"
              margin="dense"
              defaultValue={Number(contract?.contractType?.contractTypeId)}
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
            <Typography sx={headerStyle}>Từ ngày:</Typography>
          </Grid>
          <Grid item xs={3.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  disabled={disabledStartDate}
                  value={dayjs(moment(contract?.startDate).format("YYYY-MM-DD"))}
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
            <Typography sx={infoStyle}>-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Đến ngày:</Typography>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  disabled={contract?.contractTypeId === 1 ? false : true}
                  minDate={maxDate}
                  // maxDate={maxDate}
                  value={dayjs(moment(contract?.endDate).format("YYYY-MM-DD"))}
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

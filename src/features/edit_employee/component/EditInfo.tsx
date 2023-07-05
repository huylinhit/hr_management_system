import { useEffect } from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import moment from "moment";

// data
import { UserInfor } from "../../../app/models/userInfor";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  departmentSelectors,
  fetchDepartmentsAsync,
} from "../../department/departmentSlice";

// interface
interface Props {
  employee: UserInfor | undefined;
  setForm: Function;
}

export default function EditInfo({ employee, setForm }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const dispatch = useAppDispatch();
  const departments = useAppSelector(departmentSelectors.selectAll);
  const { departmentsLoaded, staffsLoaded, filtersLoaded } = useAppSelector(
    (state) => state.department
  );
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
  }, [dispatch, departmentsLoaded]);
  // -------------------------- FUNCTION ------------------------
  return (
    <Box sx={{ padding: "0 10px" }}>
      <Grid>
        <Typography
          variant="h5"
          sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}
        >
          Thông tin
        </Typography>
      </Grid>

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
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Giới tính:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              select
              id="outlined-required"
              sx={{ width: "160px" }}
              size="small"
              label="Giới tính"
              defaultValue={Number(employee?.gender)}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  gender: e.target.value,
                }))
              }
            >
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={0}>Nữ</MenuItem>
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
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngày sinh:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Ngày sinh"
              size="small"
              margin="dense"
              defaultValue={moment(employee?.dob).format("DD-MM-YYYY")}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  dob: e.target.value,
                }))
              }
            />
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
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Phòng ban:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              select
              id="outlined-required"
              label="Phòng ban"
              sx={{ width: "160px" }}
              size="small"
              margin="dense"
              defaultValue={employee?.departmentName}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  departmentId: e.target.value,
                }))
              }
            >
              {departments.map((department) => (
                <MenuItem value={department.departmentId}>{department.departmentName}</MenuItem>
              ))}
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
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngày vào làm:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Ngày vào làm"
              size="small"
              margin="dense"
              defaultValue={moment(employee?.hireDate).format("DD-MM-YYYY")}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  hireDate: e.target.value,
                }))
              }
            />
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
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Quốc tịch:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Quốc tịch"
              size="small"
              margin="dense"
              defaultValue={employee?.country}
              onChange={(e) =>
                setForm((prevForm: any) => ({
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>CMND|CCCD:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="CMND|CCCD"
              size="small"
              margin="dense"
              defaultValue={employee?.citizenId}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  citizenId: e.target.value,
                }))
              }
            />
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
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Số năm làm việc:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Số năm làm việc"
              size="small"
              margin="dense"
              defaultValue={employee?.workTimeByYear}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  workTimeByYear: e.target.value,
                }))
              }
            />
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
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Tk ngân hàng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Tk ngân hàng"
              size="small"
              margin="dense"
              defaultValue={employee?.bankAccount}
              onChange={(e) =>
                setForm((prevForm: any) => ({
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Tên tài khoản:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Tên tài khoản"
              size="small"
              margin="dense"
              defaultValue={employee?.bankAccountName}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  bankAccountName: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "600" }}>Ngân hàng:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Ngân hàng"
              size="small"
              margin="dense"
              defaultValue={employee?.bank}
              onChange={(e) =>
                setForm((prevForm: any) => ({
                  ...prevForm,
                  bank: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

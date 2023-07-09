import { useEffect } from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import moment from "moment";

// data
import { UserInfor } from "../../../app/models/userInfor";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { departmentSelectors, fetchDepartmentsAsync } from "../../department/departmentSlice";
import { styled } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// interface
interface Props {
  employee: UserInfor | undefined;
  setForm: Function;
}
const fontStyle = "Mulish";

const BootstrapInput = styled(TextField)(({ theme, disabled }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    //border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 15,
    width: "100%  ",
    padding: "6px 8px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: "Mulish",
    "&:hover:not(:focus)": {
      backgroundColor: disabled ? null : "#E7E7E7",
    },
    "&:focus": {
      boxShadow: `0 2px 8px 0 rgba(0, 0, 0, 0.5)`, // Add vertical offset to boxShadow
      borderColor: "#505050",
      backgroundColor: "FFFFFF",
      "&:hover": {
        backgroundColor: "FFFFFF", // Remove hover effect when focused
      },
    },
    "&::placeholder": {
      color: "#000000", // Replace with your desired placeholder color
    },
    "&::disabled": {
      color: "#000000",
    },
  },
  "& .MuiInputAdornment-root": {
    // Customize the Adornment styles as needed
    position: "absolute",
    right: 0,
    visibility: "hidden", // Set the initial visibility to visible
  },
  "& .MuiIconButton-root": {
    // Customize the IconButton styles as needed
    padding: theme.spacing(1),
    color: "#A9A9A9",
  },
  "&:focus-within .MuiInputAdornment-root": {
    visibility: "hidden", // Hide the button when the field or any of its descendants is focused
  },
  "&:hover .MuiInputAdornment-root": {
    visibility: "visible",
  },
}));
const headerColor = {
  color: "#808080",
};
const headerStyle = {
  fontWeight: 600,
  fontFamily: fontStyle,
  width: "250px",
};
const infoStyle = {
  fontWeight: 600,
  fontFamily: fontStyle,
  fontSize: "15px",
  color: "#000000",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
  },
};
const verticalSpacing = {
  mb: "10px",
};
const textFieldInputProps = {
  disableUnderline: true,
  style: {
    ...infoStyle,
  },
};
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
  const department = departments.find(
    (department) => department.departmentId === employee?.departmentId
  );

  return (
    <Box sx={{ padding: "0px" }}>
      <Grid>
        <Typography variant="h5" sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}>
          Thông tin
        </Typography>
      </Grid>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Giới tính</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={employee?.gender ? 1 : 0}
          InputProps={textFieldInputProps}
          variant="standard"
          onChange={(e) =>
            setForm((prevForm: any) => ({
              ...prevForm,
              gender: Number(e.target.value) === 0 ? false : true,
            }))
          }
          select
        >
          <MenuItem value={1}>Nam</MenuItem>
          <MenuItem value={0}>Nữ</MenuItem>
        </BootstrapInput>
      </Box>

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
                  gender: Number(e.target.value) === 0 ? false : true,
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
            <Typography sx={{ fontWeight: "400" }}>{department?.departmentName}</Typography>
            {/* <TextField
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
            </TextField> */}
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
            <Typography sx={{ fontWeight: "400" }}>
              {moment(employee?.hireDate).format("DD-MM-YYYY")}
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
            <Typography sx={{ fontWeight: "400" }}>{employee?.workTimeByYear}</Typography>
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

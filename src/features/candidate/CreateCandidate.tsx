import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  TextField,
  Typography,
  debounce,
  styled,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { ReactNode, useRef, useState } from "react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { FileDownloadDoneSharp } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const fontStyle = "Mulish";
const navStyle = {
  fontSize: 25,
  fontWeight: 800,
  fontFamily: fontStyle,
  textTransform: "none",
  color: "#333333",
  borderRadius: "10px",
  padding: "0px 10px 0px 10px",
  "&:hover": {
    backgroundColor: "#F8F8F8", // Set the hover background color
  },
};
const styles = {
  marginBottom: "10px",
};
const fieldStyle = {
  flexGrow: 1,
  mb: "2%",
};
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  mb: "5px",
};
const textFieldStyle = {};

export default function CreateCandidate() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(true);
  const [dob, setDob] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [expectedSalary, setExpectedSalary] = useState(0);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(true);
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [skillCount, setSkillCount] = useState(0);
  const [fields, setFields] = useState([{ skill: "", level: "" }]);

  const debouncedFirstNameInput = debounce((event: any) => {
    setFirstName(event.target.value);
    setIsFirstNameEmpty(false);
  }, 500);

  const debouncedLastNameInput = debounce((event: any) => {
    setLastName(event.target.value);
    setIsLastNameEmpty(false);
  }, 500);

  const debouncedEmailInput = debounce((event: any) => {
    setEmail(event.target.value);
    setIsEmailEmpty(false);
  }, 500);

  const debouncedGenderInput = debounce((event: any) => {
    setGender(event.target.value);
  }, 500);

  const debouncedDobInput = debounce((date: Date | null) => {
    setDob(date);
  }, 500);

  const debouncedPhoneInput = debounce((event: any) => {
    setPhoneNumber(event.target.value);
  }, 500);

  const debouncedAddressInput = debounce((event: any) => {
    setAddress(event.target.value);
  }, 500);

  const debouncedExpectedSalaryInput = debounce((event: any) => {
    setExpectedSalary(event.target.value);
  }, 500);
  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Xử lý file ở đây
      console.log("File selected:", file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };
  function handleChange(event: SelectChangeEvent<unknown>, child: ReactNode): void {}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAddField = () => {
    setFields([...fields, { skill: "", level: "" }]);
  };
  const handleSkillChange = debounce((index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].skill = value;
    setFields(updatedFields);
  }, 500);

  const debounceLevelChange = debounce((index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].level = value;
    setFields(updatedFields);
  }, 500);
  const handleCreateCandidate = () => {
    const candidateCreate = {
      name: firstName + lastName,
      email: email,
      phone: phoneNumber,
      dob: dob,
      gender: gender,
      address: address,
      expectedSalary: expectedSalary,
    };

    agent.Candidate.create(candidateCreate)
      .then((response) => {
        const candidateId = response.candidateId;
        fields.forEach((candidateSkill) => {
          const candidateSkillCreate = {
            candidateId: candidateId,
            skillName: candidateSkill.skill,
            level: candidateSkill.level,
          };
          agent.CandidateSkill.create(candidateSkillCreate);
        });
        console.log(response.candidateId);
        console.log("Candidate created successfuly", response);
        toast.success("Đã thêm ứng viên 😊");
      })
      .catch((error) => {
        console.log("error creating staff skill: ", error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ paddingLeft: "10%", mt: "5%", paddingRight: "5%" }}>
        <Grid container spacing={0} alignContent="center">
          <Grid item>
            <Button
              variant="text"
              sx={navStyle}
              disableElevation={true}
              component={NavLink}
              to={`/otheruserstickets`}
              key={"/otheruserstickets"}
            >
              Danh sách ứng viên
            </Button>
          </Grid>
          <Grid item>
            <ArrowRightIcon sx={{ mt: 0.6, padding: 0 }} fontSize="large" />
          </Grid>

          <Grid item>
            <Button variant="text" sx={navStyle} disableElevation={true}>
              Tạo ứng viên mới
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg" sx={{ padding: "20px", borderRadius: "40px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "12px" }}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 100, height: 100 }}>A</Avatar>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelected}
          />
          <Button color="primary" sx={{ mt: 2 }} onClick={handleUploadButtonClick}>
            Thêm/ Sửa ảnh
          </Button>
        </Box>
        <Typography sx={{ fontFamily: "Mulish", fontSize: "40px", fontWeight: 800, mb: "20px" }}>
          Thông tin
        </Typography>
        <Box sx={fieldStyle}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8} sx={{ py: "12px" }}>
              <Typography sx={headerStyle}>Họ</Typography>
              <TextField
                placeholder="Nhập họ..."
                onChange={debouncedLastNameInput}
                id="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={8} sx={{ py: "12px" }}>
              <Typography sx={headerStyle}>Tên</Typography>
              <TextField
                placeholder="Nhập tên..."
                onChange={debouncedFirstNameInput}
                fullWidth
                id="outlined"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={fieldStyle}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8} sx={{ py: "12px" }}>
              <FormControl fullWidth>
                <Typography sx={headerStyle}>Giới tính</Typography>
                <RadioGroup
                  onChange={debouncedGenderInput}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value={"false"} control={<Radio />} label="Female" />
                  <FormControlLabel value={"true"} control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={8} sx={{ py: "12px", maxWidth: "100%" }}>
              <Typography sx={headerStyle}>Ngày sinh</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={debouncedDobInput} value={dob} />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>

        <Box sx={fieldStyle}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8} sx={{ py: "12px" }}>
              <Typography sx={headerStyle}>Số điện thoại</Typography>
              <TextField
                onChange={debouncedPhoneInput}
                fullWidth
                id="outlined"
                placeholder="Nhập số điện thoại..."
              />
            </Grid>
            <Grid item xs={8} sx={{ py: "12px" }}>
              <Typography sx={headerStyle}>Email</Typography>
              <TextField
                onChange={debouncedEmailInput}
                fullWidth
                id="outlined"
                placeholder="Nhập email..."
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={fieldStyle}>
          <Grid container spacing={1} columns={16}>
            <Grid item xs={16} sx={{ py: "12px" }}>
              <Typography sx={headerStyle}>Địa chỉ</Typography>
              <TextField
                onChange={debouncedAddressInput}
                fullWidth
                id="fullWidth"
                placeholder="Nhập địa chỉ..."
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={fieldStyle}>
          <Grid container spacing={1} columns={16}>
            <Grid item xs={8} sx={{ py: "12px" }}>
              <Typography sx={headerStyle}>Thu nhập mong muốn</Typography>
              <TextField
                onChange={debouncedExpectedSalaryInput}
                fullWidth
                id="outlined"
                placeholder="Nhập thu nhập mong muốn..."
              />
            </Grid>
          </Grid>
        </Box>
        <Typography
          sx={{ fontFamily: "Mulish", fontSize: "40px", fontWeight: 800, mb: "1%", mt: "5%" }}
        >
          Kỹ năng
        </Typography>
        <Box sx={fieldStyle}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={12} sx={{ py: "12px" }}></Grid>
            {fields.map((field, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6} sx={{ py: "2px" }}>
                  <TextField
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    label="Kỹ năng"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} sx={{ py: "2px" }}>
                  <TextField
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    label="Trình độ"
                    fullWidth
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={16}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleAddField}
                sx={{
                  color: "#A9A9A9",
                  backgroundColor: "white",
                  borderColor: "#B8B8B8",
                  "&:hover": {
                    backgroundColor: "#E2E2E2",
                    color: "#A9A9A9",
                    borderColor: "#E2E2E2",
                  },
                  "&:active": {
                    backgroundColor: "#DFDFDF",
                    borderColor: "#DFDFDF",
                    color: "#858585",
                  },
                }}
              >
                Thêm kỹ năng
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Container sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={handleCreateCandidate} variant="contained" sx={{ borderRadius: "40px" }}>
            Thêm
          </Button>
        </Container>
      </Container>
    </>
  );
}

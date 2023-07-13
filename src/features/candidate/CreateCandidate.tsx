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
  Input,
  debounce,
  styled,
  Dialog,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { ReactNode, useRef, useState } from "react";
import agent from "../../app/api/agent";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { FileDownloadDoneSharp } from "@mui/icons-material";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../app/store/configureStore";
import { setCandidateAdded } from "./candidateSlice";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
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
interface Props {
  open: boolean;
  onClose: () => void;
}
export default function CreateCandidate({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarTemp, setAvatarTemp] = useState<string | ArrayBuffer | null>(null);
  const [skillCount, setSkillCount] = useState(0);
  const [fields, setFields] = useState([{ skill: "", level: "" }]);
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const files = event.dataTransfer.files;
    setSelectedFile(files[0]);
    // Handle the dropped files here
    console.log(files[0]);
  };

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

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    console.log("Selected file:", file);
  };
  const handleAvatarSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarTemp(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(file);
  };
  const handleAddAvatarButton = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };
  const handleAddFileButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = (candidateId: number) => {
    if (avatar == null) return;
    const avatarRef = ref(storage, `candidatesAvatar/${candidateId}`);
    uploadBytes(avatarRef, avatar).then(() => {
      console.log("GOOD");
    });
  };
  const handleUploadFile = (id: number) => {
    if (selectedFile == null) return;
    const fileRef = ref(storage, `candidatesFile/${id}`);
    uploadBytes(fileRef, selectedFile).then(() => {
      console.log("GOOD");
    });
  };
  const handleAddField = () => {
    setFields([...fields, { skill: "", level: "" }]);
  };
  const debouncedSkillChange = debounce((index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].skill = value;
    setFields(updatedFields);
  }, 500);

  const debouncedLevelChange = debounce((index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].level = value;
    setFields(updatedFields);
  }, 500);
  const handleCreateCandidate = () => {
    const candidateCreate = {
      name: lastName + " " + firstName,
      email: email,
      phone: phoneNumber,
      dob: dob,
      gender: gender,
      address: address,
      expectedSalary: expectedSalary,
    };

    agent.Candidate.create(candidateCreate)
      .then((response) => {
        handleUploadImage(response.candidateId);
        handleUploadFile(response.candidateId);
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
        dispatch(setCandidateAdded(true));
      })
      .catch((error: any) => {
        console.log("error creating staff skill: ", error);
        toast.error("Xảy ra lỗi khi thêm 😥");
      });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="lg">
        <Container maxWidth="md" sx={{ padding: "20px", borderRadius: "40px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: "12px",
              mt: "50px",
            }}
          >
            <Avatar
              src={avatarTemp as string}
              sx={{ bgcolor: deepPurple[500], width: 150, height: 150 }}
            >
              A
            </Avatar>
            <input
              type="file"
              ref={avatarInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarSelected}
            />
            <Button color="primary" sx={{ mt: 2 }} onClick={handleAddAvatarButton}>
              Thêm / Sửa ảnh
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

          {/* File Upload */}
          <Box sx={fieldStyle}>
            <Box
              sx={{
                width: "100%",
                height: "250px",
                border: `2px dashed ${dragging ? "green" : "gray"}`,
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CloudUploadOutlinedIcon
                sx={{ fontSize: "80px", color: `${dragging ? "green" : "gray"} ` }}
              />
              <Typography
                sx={{ fontWeight: 600, fontSize: "22px", fontFamily: fontStyle, color: "#6A6A78" }}
              >
                {selectedFile ? selectedFile.name : "Kéo & thả vào đây"}
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelected}
              />
              <Button
                variant="outlined"
                sx={{
                  fontSize: "15px",
                  mt: "10px",
                  textTransform: "none",
                  borderRadius: "10px",
                }}
                disableElevation={true}
                onClick={handleAddFileButton}
              >
                Thêm File
              </Button>
            </Box>
          </Box>
          {/* File Upload */}
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
                      onChange={(e) => debouncedSkillChange(index, e.target.value)}
                      label="Kỹ năng"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} sx={{ py: "2px" }}>
                    <TextField
                      onChange={(e) => debouncedLevelChange(index, e.target.value)}
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
            <Button
              onClick={handleCreateCandidate}
              variant="contained"
              sx={{ borderRadius: "40px" }}
            >
              Thêm
            </Button>
          </Container>
        </Container>
      </Dialog>
    </>
  );
}

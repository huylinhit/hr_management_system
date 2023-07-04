import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import agent from "../../app/api/agent";
import moment from "moment";
import "../../app/layout/App.css";
import { deepPurple } from "@mui/material/colors";
import { candidatesSelectors } from "./candidateSlice";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { departmentSelectors, fetchDepartmentsAsync } from "../department/departmentSlice";
import { ToastContainer, toast } from "react-toastify";
import { candidateSkillsSelectors } from "./candidateSkillSlice";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const fontStyle = "Mulish";

const menuItemStyle = {
  fontStyle: fontStyle,
};
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
const styles = {
  marginBottom: "10px",
};
const HeaderInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    //border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 40,
    fontWeight: 800,
    width: "100%  ",
    padding: "6px 8px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: "Mulish",
    "&:hover:not(:focus)": {
      backgroundColor: "#E7E7E7",
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
  },
}));
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
}));

const InforRow = (value: any) => {
  return (
    <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
      {value.icon}
      <Typography sx={headerStyle}>{value.header}</Typography>
      <BootstrapInput
        fullWidth
        disabled={value.disabled}
        InputProps={textFieldInputProps}
        defaultValue={value.defaultValue}
        variant="standard"
        placeholder="Trống"
        onChange={value.onChange}
        select={value.select}
        sx={infoStyle}
      />
    </Box>
  );
};

const textFieldInputProps = {
  disableUnderline: true,
  style: {
    ...infoStyle,
  },
};

function CurrencyFormatter(value: any) {
  const formattedValue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value.value);
  return <span>{formattedValue}</span>;
}

export default function CandidateDetails({ open, handleClose, handleChange }: any) {
  const { id } = useParams<{ id: string }>();
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>("");
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const candidate = useAppSelector((state) => candidatesSelectors.selectById(state, id!));
  const { departmentsLoaded } = useAppSelector((state) => state.department);
  const departments = useAppSelector(departmentSelectors.selectAll);
  const dispatch = useAppDispatch();
  const avatarStorageRef = ref(storage, `candidatesAvatar/${candidate?.candidateId}`);
  const fileStorageRef = ref(storage, `candidatesFile/${candidate?.candidateId}`);
  const [processNote, setProcessNote] = useState("");
  const [name, setName] = useState(candidate?.name);
  const [email, setEmail] = useState(candidate?.email);
  const [phone, setPhone] = useState(candidate?.phone);
  const [dob, setDob] = useState(candidate?.dob);
  const [gender, setGender] = useState(candidate?.gender);
  const [address, setAddress] = useState(candidate?.address);
  const [department, setDepartment] = useState(candidate?.department);
  const [expectedSalary, setExpectedSalary] = useState(candidate?.expectedSalary);
  const [resumeFile, setResumeFile] = useState(candidate?.resumeFile);
  const [result, setResult] = useState(candidate?.result);
  const [ticketFile, setTicketFile] = useState("");
  const candidateSkillsByCandidateId = useAppSelector((state) =>
    candidateSkillsSelectors.selectAll(state).filter((s) => s.candidateId == parseInt(id!))
  );
  const location = useLocation();
  const [fields, setFields] = useState([{ skill: "", level: "" }]);
  const [updatedSkills, setUpdatedSkills] = useState(
    [...candidateSkillsByCandidateId].map((skill) => ({
      id: skill.uniqueId,
      skill: skill.skillName,
      level: skill.level,
    }))
  );
  console.log(updatedSkills);

  console.log(candidateSkillsByCandidateId);
  
  //#region Handle Drag File
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
  //#endregion
  
  const { candidateSkillsLoaded, candidateSkillAdded } = useAppSelector(
    (state) => state.candidateSkill
  );

  const handleAddField = () => {
    setFields([...fields, { skill: "", level: "" }]);
  };
  useEffect(() => {
    dispatch(
      setHeaderTitle([
        { title: "Toàn bộ ứng viên", path: "/candidates" },
        { title: candidate?.name, path: "" },
      ])
    );
  }, [dispatch, location]);

  useEffect(() => {
    getDownloadURL(fileStorageRef)
      .then((url) => {
        setTicketFile(url);
      })
      .catch((error) => {});
  }, [candidate]);
  console.log(ticketFile);

  //Load all departments
  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
  }, [dispatch, departmentsLoaded]);

  //Get avatar
  useEffect(() => {
    getDownloadURL(avatarStorageRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch((error) => {});
  }, [candidate]);

  //#region debouncedInput
  const debouncedNameInput = debounce((event: any) => {
    setName(event.target.value);
  }, 750);
  const debouncedEmailInput = debounce((event: any) => {
    setEmail(event.target.value);
  }, 750);
  const debouncedPhoneInput = debounce((event: any) => {
    setName(event.target.value);
  }, 750);
  const debouncedDobInput = debounce((event: any) => {
    setDob(event.target.value);
  }, 750);
  const debouncedGenderInput = debounce((event: any) => {
    setGender(event.target.value);
  }, 750);
  const debouncedAddressInput = debounce((event: any) => {
    setAddress(event.target.value);
  }, 750);
  const debouncedDepartmentInput = debounce((event: any) => {
    setDepartment(event.target.value);
  }, 750);
  const debouncedExpectedSalaryInput = debounce((event: any) => {
    setName(event.target.value);
  }, 750);
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
  const debouncedUpdatedSkillChange = debounce((index: number, value: string) => {
    const updatedFields = [...updatedSkills];
    updatedFields[index].skill = value;
    console.log(updatedFields[index].skill);
    setUpdatedSkills(updatedFields);
  }, 500);
  const debouncedUpdatedLevelChange = debounce((index: number, value: string) => {
    const updatedFields = [...updatedSkills];
    updatedFields[index].level = value;
    setUpdatedSkills(updatedFields);
  }, 500);
  //#endregion

  const handleAddAvatarButton = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleAvatarSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(`FILE ${file}`);
  };

  const handleUploadImage = () => {
    if (avatarFile == null) return;
    const avatarRef = ref(storage, `candidatesAvatar/${id}`);
    uploadBytes(avatarRef, avatarFile).then(() => {
      console.log("GOOD");
    });
  };

  const handleAddFileButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    console.log("Selected file:", file);
  };
  const handleDownload = async (event: any) => {
    event.stopPropagation();
    try {
      const downloadUrl = await getDownloadURL(fileStorageRef);
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const handleCandidateUpdate = () => {
    const candidateUpdate = {
      name: name,
      email: email,
      phone: phone,
      dob: dob,
      gender: gender,
      address: address,
      department: department?.trim(),
      expectedSalary: expectedSalary,
      result: result,
    };
    agent.Candidate.update(parseInt(id!), candidateUpdate)
      .then((response) => {
        //Update old skills
        updatedSkills.forEach((candidateSkill) => {
          const candidateSkillUpdate = {
            uniqueId: candidateSkill.id,
            skillName: candidateSkill.skill.trim(),
            level: candidateSkill.level.trim(),
          };
          agent.CandidateSkill.update(candidateSkillUpdate);
        });
        //Add more skills
        fields.forEach((candidateSkill) => {
          const candidateSkillCreate = {
            candidateId: parseInt(id!),
            skillName: candidateSkill.skill,
            level: candidateSkill.level,
          };
          agent.CandidateSkill.create(candidateSkillCreate);
        });
        handleUploadImage();
        console.log("Candidate updated successfully: ", response);
        toast.success("Cập nhật ứng viên thành công 😊");
      })
      .catch((error) => {
        console.log("Error updating candidate: ", error);
      });
  };

  return (
    <Box sx={{ minHeight: "1200px" }}>
      {/* <Box sx={{ paddingLeft: "10%", mt: "5%", paddingRight: "10%" }}>
        <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
        <Grid container spacing={0} alignContent="center">
          <Grid item>
            <Button
              variant="text"
              sx={navStyle}
              disableElevation={true}
              component={NavLink}
              to={`/candidates`}
              key={"/candidates"}
            >
              Danh sách ứng viên
            </Button>
          </Grid>

          <Grid item>
            <ArrowRightIcon sx={{ mt: 0.6, padding: 0 }} fontSize="large" />
          </Grid>

          <Grid item>
            <Button variant="text" sx={navStyle} disableElevation={true}>
              {candidate?.name}
            </Button>
          </Grid>
        </Grid>
      </Box> */}

      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <input
          type="file"
          ref={avatarInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarSelected}
        />
        <IconButton onClick={handleAddAvatarButton}>
          <Avatar
            src={avatarUrl as string}
            sx={{ bgcolor: deepPurple[500], width: 150, height: 150 }}
          >
            A
          </Avatar>
        </IconButton>

        <Grid container justifyContent={"space-between"} sx={{ mt: "30px" }}>
          <HeaderInput
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: fontStyle, fontWeight: 700, fontSize: "40px", color: "#3B3B3B" },
            }}
            fullWidth
            variant="standard"
            defaultValue={candidate?.name}
            onChange={debouncedNameInput}
          />

          <Box display={"flex"} alignItems={"flex-end"}>
            <Button
              variant="text"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: "#8A8A8A",
                fontFamily: fontStyle,
              }}
              disableElevation={true}
            >
              Quay lại
            </Button>
            <Button
              variant="text"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: "#007FFF",
                fontFamily: fontStyle,
              }}
              disableElevation={true}
              onClick={handleCandidateUpdate}
            >
              Xác nhận
            </Button>
          </Box>
        </Grid>
        <Box sx={{ borderBottom: "2px solid #333333", mb: "10px", mt: "1%" }}></Box>
        {/* <Typography
          sx={{ fontWeight: 600, fontSize: 25, fontFamily: "Mulish", color: "#007FFF", mb: "10px" }}
        >
          Thông tin
        </Typography> */}
        <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing }}>
          <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
          <Typography sx={{ ...headerStyle, ...headerColor }}>Trạng thái</Typography>
          <BootstrapInput
            fullWidth
            defaultValue={candidate?.result}
            InputProps={textFieldInputProps}
            variant="standard"
            onChange={(e: any) => setResult(e.target.value)}
            select
          >
            <MenuItem value={"Đạt"}>Đạt</MenuItem>
            <MenuItem value={"Không đạt"}>Không đạt</MenuItem>
            <MenuItem value={"Chờ duyệt"}>Chờ duyệt</MenuItem>
            <MenuItem value={"Phỏng vấn"}>Phỏng vấn</MenuItem>
          </BootstrapInput>
        </Box>
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          header="Mã ứng viên"
          defaultValue={`CA-${candidate?.candidateId.toString().padStart(5, "0")}`}
          disabled={true}
        />

        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          onChange={debouncedEmailInput}
          header="Email"
          defaultValue={candidate?.email}
          disabled={false}
        />
        <InforRow
          icon={<PhoneIcon sx={{ mr: "5px" }} fontSize="small" />}
          onChange={debouncedPhoneInput}
          header="Số điện thoại"
          defaultValue={candidate?.phone}
          disabled={false}
        />
        <InforRow
          icon={<CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />}
          onChange={debouncedDobInput}
          header="Ngày sinh"
          defaultValue={moment(candidate?.dob).format("MMM Do, YYYY")}
          disabled={false}
        />

        <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
          <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
          <Typography sx={{ ...headerStyle, ...headerColor }}>Giới tính</Typography>
          <BootstrapInput
            fullWidth
            defaultValue={candidate?.gender ? 1 : 0}
            InputProps={textFieldInputProps}
            variant="standard"
            onChange={(e: any) => setGender(e.target.value)}
            select
          >
            <MenuItem value={1}>Nam</MenuItem>
            <MenuItem value={0}>Nữ</MenuItem>
          </BootstrapInput>
        </Box>
        <InforRow
          icon={<SubjectIcon fontSize="small" sx={{ mr: "5px" }} />}
          onChange={debouncedAddressInput}
          header="Địa chỉ"
          defaultValue={candidate?.address}
          disabled={false}
        />
        <InforRow
          icon={<NumbersIcon sx={{ mr: "5px" }} fontSize="small" />}
          onChange={debouncedExpectedSalaryInput}
          header="Lương mong muốn"
          defaultValue={candidate?.expectedSalary}
          disabled={false}
        />

        <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
          <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
          <Typography sx={{ ...headerStyle, ...headerColor }}>Phòng ban</Typography>
          {departments ? (
            <BootstrapInput
              fullWidth
              InputProps={textFieldInputProps}
              defaultValue={candidate?.department.trim()}
              variant="standard"
              onChange={(e: any) => setDepartment(e.target.value)}
              select
            >
              {departments.map((option) => (
                <MenuItem key={option.departmentId} value={option.departmentName.trim()}>
                  {option.departmentName}
                </MenuItem>
              ))}
            </BootstrapInput>
          ) : (
            <TextField
              fullWidth
              InputProps={textFieldInputProps}
              defaultValue={candidate?.department}
              variant="standard"
              placeholder="Trống"
              select
            ></TextField>
          )}
        </Box>

        <InforRow
          icon={<CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />}
          header="Ngày ứng tuyển"
          defaultValue={moment(candidate?.applyDate).format("MMM Do, YYYY")}
          disabled={true}
        ></InforRow>

        {/* Upload File */}
        <Box sx={{ flexGrow: 1, mb: "2%", mt: "20px" }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelected}
          />
          <Button
            fullWidth
            onClick={handleAddFileButton}
            sx={{
              textTransform: "none",
              color: "#A9A9A9",
              backgroundColor: "#F3F2F1",
              borderColor: "#B8B8B8",
              "&:hover": {
                backgroundColor: "#D7D7D7",
                color: "#979797",
                borderColor: "#E2E2E2",
              },
              "&:active": {
                backgroundColor: "#DFDFDF",
                borderColor: "#DFDFDF",
                color: "#858585",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50px",
                //border: `3px dashed ${dragging ? "green" : "#808080"}`,

                borderRadius: "5px",
                display: "flex",
                //flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                pl: "10px",
              }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Box
                sx={{
                  display: "flex",
                  //flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <UploadFileIcon
                  sx={{
                    mr: "10px",
                    fontSize: "35px",
                    color: `${dragging ? "green" : "#808080"} `,
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "18px",
                    fontFamily: fontStyle,
                    color: "#808080",
                  }}
                >
                  {ticketFile
                    ? "Tải File đính kèm hoặc đổi file khác"
                    : selectedFile
                    ? selectedFile.name
                    : "Kéo & thả File đính kèm vào đây"}
                </Typography>
              </Box>
              {ticketFile ? (
                <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </Box>
          </Button>
        </Box>
        {/* Upload File */}

        <Box sx={{ borderBottom: "1px solid #C4C4C4", mt: "20px", mb: "20px" }}></Box>

        {/* <Grid item xs={3}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 25,
              fontFamily: "Mulish",
              color: "#007FFF",
              mb: "10px",
            }}
          >
            Kỹ năng
          </Typography>
        </Grid> */}
        {candidateSkillsByCandidateId ? (
          <>
            {candidateSkillsByCandidateId.map((option, index) => (
              <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
                <BootstrapInput
                  InputProps={textFieldInputProps}
                  defaultValue={`${option.skillName}`}
                  onChange={(e) => debouncedUpdatedSkillChange(index, e.target.value)}
                  variant="standard"
                  placeholder="Trống"
                  sx={{ width: "240px", paddingRight: "10px" }}
                />
                <BootstrapInput
                  fullWidth
                  InputProps={textFieldInputProps}
                  onChange={(e) => debouncedUpdatedLevelChange(index, e.target.value)}
                  defaultValue={option.level}
                  variant="standard"
                  placeholder="Trống"
                />
              </Box>
            ))}
          </>
        ) : (
          <InforRow
            onChange={debouncedExpectedSalaryInput}
            header="React Js"
            defaultValue={candidate?.expectedSalary}
            disabled={false}
          />
        )}
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
              <BootstrapInput
                InputProps={textFieldInputProps}
                variant="standard"
                placeholder="Tên kỹ năng..."
                onChange={(e) => debouncedSkillChange(index, e.target.value)}
                sx={{ width: "240px", paddingRight: "10px" }}
              />
              <BootstrapInput
                fullWidth
                InputProps={textFieldInputProps}
                onChange={(e) => debouncedLevelChange(index, e.target.value)}
                variant="standard"
                placeholder="Trình độ..."
              />
            </Box>
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
      </Container>
    </Box>
  );
}

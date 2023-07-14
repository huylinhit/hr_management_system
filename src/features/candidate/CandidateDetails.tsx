import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import moment from "moment";
import { deepPurple } from "@mui/material/colors";
import { candidatesSelectors, fetchCandidateAsync, setCandidateAdded, setCandidateUpdated } from "./candidateSlice";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { departmentSelectors, fetchDepartmentsAsync } from "../department/departmentSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  candidateSkillsSelectors,
  fetchCandidateSkillsByCandidateIdAsync,
} from "./candidateSkillSlice";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CandidateDetailSkeleton from "./CandidateDetailSkeleton";
import {
  BaseSingleInputFieldProps,
  DatePicker,
  DatePickerProps,
  DateValidationError,
  FieldSection,
  LocalizationProvider,
  UseDateFieldProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
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
interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, DateValidationError> {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      fullWidth
      variant="text"
      id={id}
      disabled={disabled}
      sx={{
        textTransform: "none",
        color: "#000000",
        backgroundColor: "white",
        borderColor: "#B8B8B8",
        "&:hover": {
          backgroundColor: "#E7E7E7",
          color: "#000000",
          borderColor: "#E7E7E7",
        },
        "&:active": {
          backgroundColor: "#DFDFDF",
          borderColor: "#DFDFDF",
          color: "#000000",
        },
        justifyContent: "flex-start",
        fontFamily: "Mulish",
        fontWeight: 600,
      }}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ?? "Pick a date"}
    </Button>
  );
}
function ButtonDatePicker(props: Omit<DatePickerProps<Dayjs>, "open" | "onOpen" | "onClose">) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

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
  const [name, setName] = useState(candidate?.name);
  const [email, setEmail] = useState(candidate?.email);
  const [phone, setPhone] = useState(candidate?.phone);
  const [dob, setDob] = useState(candidate?.dob);
  const [gender, setGender] = useState(candidate?.gender);
  const [address, setAddress] = useState(candidate?.address);
  const [department, setDepartment] = useState(candidate?.department);
  const [expectedSalary, setExpectedSalary] = useState(candidate?.expectedSalary);
  const [result, setResult] = useState(candidate?.result);
  const [ticketFile, setTicketFile] = useState("");
  const { candidateUpdated } = useAppSelector((state) => state.candidate);
  const [value, setValue] = useState<Dayjs | null>(null);
  const [candidateSkillToDelete, setCandidateSkillToDelete] = useState<number[]>([]);
  // const candidateSkillsByCandidateId = useAppSelector((state) =>
  //   candidateSkillsSelectors.selectAll(state).filter((s) => s.candidateId == parseInt(id!))
  // );

  const location = useLocation();
  const [fields, setFields] = useState([{ skill: "", level: "" }]);
  const [updatedSkills, setUpdatedSkills] = useState([{ id: 0, skill: "", level: "" }]);

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

  useEffect(() => {
    if (candidate) {
      dispatch(
        setHeaderTitle([
          { title: "Danh sách ứng viên", path: "/candidates" },
          { title: candidate?.name, path: "" },
        ])
      );
    }
  }, [dispatch, location, candidate, updatedSkills]);

  useEffect(() => {
    if (!candidate && id) {
      dispatch(fetchCandidateAsync(parseInt(id)));
    }
  }, [id, candidate, dispatch, candidateUpdated]);

  useEffect(() => {
    if (candidate && id) {
      const updatedSkills = candidate.candidateSkills.map((skill) => ({
        id: skill.uniqueId,
        skill: skill.skillName,
        level: skill.level,
      }));
      setUpdatedSkills(updatedSkills);
    }
  }, [id, candidate, dispatch, setUpdatedSkills]);

  useEffect(() => {
    if (candidate) {
      const remainingSkills = candidate?.candidateSkills.filter(
        (skill) => !candidateSkillToDelete.includes(skill.uniqueId)
      );
      setUpdatedSkills(
        remainingSkills.map((skill) => ({
          id: skill.uniqueId,
          skill: skill.skillName,
          level: skill.level,
        }))
      );
    }
  }, [candidateSkillToDelete]);

  useEffect(() => {
    if (candidate) {
      setName(candidate.name);
      setEmail(candidate.email);
      setPhone(candidate.phone);
      setDob(candidate.dob);
      setGender(candidate.gender);
      setAddress(candidate.address);
      setDepartment(candidate.department);
      setExpectedSalary(candidate.expectedSalary);
      setResult(candidate.result);
    }
  }, [candidate]);
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

  //#region ---------------------------------- DEBOUNCED INPUT ------------------------
  const debouncedNameInput = debounce((event: any) => {
    setName(event.target.value);
  }, 750);
  const debouncedEmailInput = debounce((event: any) => {
    setEmail(event.target.value);
  }, 750);
  const debouncedPhoneInput = debounce((event: any) => {
    setPhone(event.target.value);
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
    setExpectedSalary(event.target.value);
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
  //#endregion ---------------------------------- DEBOUNCED INPUT ------------------------

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
  const handleAddField = () => {
    setFields([...fields, { skill: "", level: "" }]);
  };

  //Delete candidate skill
  const handleAddDeleteSkills = (candidateSkillId: number) => {
    setCandidateSkillToDelete([...candidateSkillToDelete, candidateSkillId]);
  };
  console.log(updatedSkills);
  //Delete candidate skill
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
        //Delete skills
        candidateSkillToDelete.forEach((uniqueId) => {
          agent.CandidateSkill.delete(uniqueId);
        });
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
          if (candidateSkill.skill.length > 0) {
            const candidateSkillCreate = {
              candidateId: parseInt(id!),
              skillName: candidateSkill.skill,
              level: candidateSkill.level,
            };
            agent.CandidateSkill.create(candidateSkillCreate);
          }
        });
        handleUploadImage();
        console.log("Candidate updated successfully: ", response);
        toast.success("Cập nhật ứng viên thành công 😊");
        dispatch(setCandidateAdded(true));
        console.log(dob);
      })
      .catch((error) => {
        toast.error("Xãy ra lỗi khi cập nhật 😥");
        console.log("Error updating candidate: ", error);
      });
  };
  if (!candidate || !candidate.candidateSkills) {
    return <CandidateDetailSkeleton />; // Render a loading state while fetching candidate data
  }
  return (
    <Box sx={{ minHeight: "1200px" }}>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />

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
        <Typography
          sx={{ fontWeight: 700, fontSize: 25, fontFamily: "Mulish", color: "#007FFF", mb: "10px" }}
        >
          Thông tin
        </Typography>
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
        <Box display={"flex"} alignItems={"center"} sx={{ ...verticalSpacing, ...headerColor }}>
          <CalendarMonthIcon sx={{ mr: "5px" }} fontSize="small" />
          <Typography sx={headerStyle}>Ngày sinh</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ButtonDatePicker
              label={`${dayjs(dob) === null ? "Trống" : dayjs(dob).format("MMM DD, YYYY")}`}
              value={dayjs(
                new Date(
                  dayjs(dob)
                    .toDate()
                    .setMinutes(
                      dayjs(dob).toDate().getMinutes() + dayjs(dob).toDate().getTimezoneOffset()
                    )
                )
              )}
              onChange={(newValue: any) => setDob(newValue)}
            />
          </LocalizationProvider>
        </Box>

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
                    ? "Tải File đính kèm về hoặc đổi file khác"
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
        <Typography
          sx={{ fontWeight: 700, fontSize: 25, fontFamily: "Mulish", color: "#007FFF", mb: "10px" }}
        >
          Kỹ năng
        </Typography>
        {candidate.candidateSkills && (
          <>
            {updatedSkills.length > 0 ? (
              updatedSkills.map((option, index) => (
                <Box display="flex" alignItems="center" sx={verticalSpacing} key={option.id}>
                  <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
                  <BootstrapInput
                    InputProps={{
                      ...textFieldInputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={(e) => handleAddDeleteSkills(option.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    defaultValue={option.skill}
                    onChange={(e) => debouncedUpdatedSkillChange(index, e.target.value)}
                    variant="standard"
                    placeholder="Trống"
                    sx={{ width: "250px", paddingRight: "10px" }}
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
              ))
            ) : (
              <Typography>No skills available</Typography>
            )}
          </>
        )}

        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
              <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
              <BootstrapInput
                InputProps={textFieldInputProps}
                variant="standard"
                placeholder="Tên kỹ năng..."
                onChange={(e) => debouncedSkillChange(index, e.target.value)}
                sx={{ width: "250px", paddingRight: "10px" }}
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

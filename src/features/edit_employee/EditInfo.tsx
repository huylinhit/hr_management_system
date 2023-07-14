import { useEffect, useRef, useState } from "react";
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
import moment from "moment";

// data
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { departmentSelectors, fetchDepartmentsAsync } from "../department/departmentSlice";
import { styled } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BaseSingleInputFieldProps,
  DatePicker,
  DatePickerProps,
  DateValidationError,
  FieldSection,
  LocalizationProvider,
  UseDateFieldProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchUserInforAsync, userInforSelectors } from "../department/userInforSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { deepPurple } from "@mui/material/colors";
import CandidateDetailSkeleton from "../candidate/CandidateDetailSkeleton";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import { contractSelectors, fetchContractsAsync } from "../../app/store/contract/contractSlice";
const fontStyle = "Mulish";
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
export default function EditInfo() {
  //-------------------------- VAR -----------------------------
  const { id } = useParams<{ id: string }>();
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>("");
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const userInfor = useAppSelector((state) => userInforSelectors.selectById(state, id!));
  const avatarStorageRef = ref(storage, `staffsAvatar/${userInfor?.staffId}`);
  
  const contracts = useAppSelector(contractSelectors.selectAll);
  const { contractsLoaded } = useAppSelector((state) => state.contract)
  const isExistContract = contracts.find((contract) => contract.staffId === Number(id)) 

  const [firstName, setFirstName] = useState(userInfor?.firstName);
  const [lastName, setLastName] = useState(userInfor?.lastName);
  const [email, setEmail] = useState(userInfor?.email);
  const [phone, setPhone] = useState(userInfor?.phone);
  const [dob, setDob] = useState(userInfor?.dob);
  const [gender, setGender] = useState(userInfor?.gender);
  const [address, setAddress] = useState(userInfor?.address);
  const [hireDate, setHireDate] = useState(userInfor?.hireDate);
  const [country, setCountry] = useState(userInfor?.country);
  const [citizenId, setCitizenId] = useState(userInfor?.citizenId);
  const [bankAccount, setBankAccount] = useState(userInfor?.bankAccount);
  const [bankAccountName, setBankAccountName] = useState(userInfor?.bankAccountName);
  const [bank, setBank] = useState(userInfor?.bank);
  const [accountStatus, setAccountStatus] = useState(userInfor?.accountStatus);
  const [fullName, setFullName] = useState("");
  const [staffSkillToDelete, setStaffSkillToDelete] = useState<number[]>([]);
  const location = useLocation();
  const [updatedSkills, setUpdatedSkills] = useState([{ id: 0, skill: "", level: "" }]);

  // -------------------------- STATE ---------------------------
  const [fields, setFields] = useState([{ skill: "", level: "" }]);

  // -------------------------- REDUX ---------------------------
  const dispatch = useAppDispatch();
  const departments = useAppSelector(departmentSelectors.selectAll);
  const { departmentsLoaded } = useAppSelector(
    (state) => state.department
  );
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if(!contractsLoaded) dispatch(fetchContractsAsync());
  }, [dispatch, contractsLoaded]);
  
  useEffect(() => {
    if (userInfor) {
      dispatch(
        setHeaderTitle([
          { title: "Danh sách nhân viên", path: "/staffs" },
          { title: `${userInfor.lastName} ${userInfor.firstName}`, path: "" },
        ])
      );
    }
  }, [dispatch, location, userInfor, updatedSkills]);
  useEffect(() => {
    if (!userInfor && id) {
      dispatch(fetchUserInforAsync(parseInt(id)));
    }
  }, [id, userInfor, dispatch]);
  useEffect(() => {
    if (userInfor) {
      setFullName(`${userInfor.lastName} ${userInfor.firstName}`);
      setFirstName(userInfor.firstName);
      setLastName(userInfor.lastName);
      setEmail(userInfor.email);
      setPhone(userInfor.phone);
      setDob(userInfor.dob);
      setGender(userInfor.gender);
      setAddress(userInfor.address);
      setHireDate(userInfor.hireDate);
      setCountry(userInfor.country);
      setCitizenId(userInfor.citizenId);
      setBankAccount(userInfor.bankAccount);
      setBankAccountName(userInfor.bankAccountName);
      setBank(userInfor.bank);
      setAccountStatus(userInfor.accountStatus);
    }
  }, [userInfor]);
  
  useEffect(() => {
    getDownloadURL(avatarStorageRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch(() => {});
  }, [userInfor]);
  
  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
  }, [dispatch, departmentsLoaded]);

  useEffect(() => {
    if (userInfor && id) {
      const updatedSkills = userInfor.staffSkills.map((skill) => ({
        id: skill.uniqueId,
        skill: skill.skillName,
        level: skill.level,
      }));
      setUpdatedSkills(updatedSkills);
    }
  }, [id, userInfor, dispatch, setUpdatedSkills]);

  // Re-render when delete skill
  useEffect(() => {
    if (userInfor) {
      const remainingSkills = userInfor.staffSkills.filter(
        (skill) => !staffSkillToDelete.includes(skill.uniqueId)
      );

      setUpdatedSkills(
        remainingSkills.map((skill) => ({
          id: skill.uniqueId,
          skill: skill.skillName,
          level: skill.level,
        }))
      );
    }
    console.log(updatedSkills);
  }, [staffSkillToDelete, userInfor]);
  //#region ------------------------------------ DEBOUNCED INPUT -------------------------
  const debouncedFullNameInput = debounce((event: any) => {
    setFullName(event.target.value);
  }, 750);
  const debouncedEmailInput = debounce((event: any) => {
    setEmail(event.target.value);
  }, 750);
  const debouncedPhoneInput = debounce((event: any) => {
    setPhone(event.target.value);
  }, 750);
  const debouncedAddressInput = debounce((event: any) => {
    setAddress(event.target.value);
  }, 750);
  const debouncedCountryInput = debounce((event: any) => {
    setCountry(event.target.value);
  }, 750);
  const debouncedCitizenIdInput = debounce((event: any) => {
    setCitizenId(event.target.value);
  }, 750);
  const debouncedBankAccountInput = debounce((event: any) => {
    setBankAccount(event.target.value);
  }, 750);
  const debouncedBankAccountNameInput = debounce((event: any) => {
    setBankAccountName(event.target.value);
  }, 750);
  const debouncedBankInput = debounce((event: any) => {
    setBank(event.target.value);
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
  //#endregion ------------------------------------ DEBOUNCED INPUT -------------------------
  // -------------------------- FUNCTION ------------------------
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
    const avatarRef = ref(storage, `staffsAvatar/${id}`);
    uploadBytes(avatarRef, avatarFile).then(() => {
      console.log("GOOD");
    });
  };
  const department = departments.find(
    (department) => department.departmentId === userInfor?.departmentId
  );
  const handleAddField = () => {
    setFields([...fields, { skill: "", level: "" }]);
  };
  //Delete candidate skill
  const handleAddDeleteSkills = (staffSkillId: number) => {
    console.log(staffSkillId);
    setStaffSkillToDelete([...staffSkillToDelete, staffSkillId]);
  };

  const handleStaffUpdate = () => {
    const [firstNameUpdate, lastNameUpdate] = fullName.split(` `);
    console.log(staffSkillToDelete);
    const userInforUpdate = {
      firstName: firstNameUpdate,
      lastName: lastNameUpdate,
      email: email,
      phone: phone,
      dob: dob,
      gender: gender,
      address: address,
      hireDate: hireDate,
      country: country,
      citizenId: citizenId,
      bankAccount: bankAccount,
      bankAccountName: bankAccountName,
      bank: bank,
      accountStatus: accountStatus,
    };
    agent.Employees.update(parseInt(id!), userInforUpdate)
      .then((response) => {
        // Delete skills
        staffSkillToDelete.forEach((uniqueId) => {
          agent.StaffSkill.delete(uniqueId);
        });
        //Update old skills
        updatedSkills.forEach((staffSkill) => {
          const staffSkillUpdate = {
            uniqueId: staffSkill.id,
            skillName: staffSkill.skill.trim(),
            level: staffSkill.level.trim(),
          };
          agent.StaffSkill.update(staffSkillUpdate);
        });
        //Add more skills
        fields.forEach((staffSkill) => {
          if (staffSkill.skill.length > 0) {
            const staffSkillCreate = {
              staffId: parseInt(id!),
              skillName: staffSkill.skill,
              level: staffSkill.level,
            };
            agent.StaffSkill.create(staffSkillCreate);
          }
        });
        handleUploadImage();
        console.log("Candidate updated successfully: ", response);
        toast.success("Cập nhật nhân viên thành công 😊");
        //  dispatch(setCandidateUpdated(true));
        console.log(dob);
      })
      .catch((error) => {
        toast.error("Xãy ra lỗi khi cập nhật 😥");
        console.log("Error updating candidate: ", error);
      });
  };

  if (!userInfor) {
    return <CandidateDetailSkeleton />; // Render a loading state while fetching candidate data
  }
  return (
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
          defaultValue={`${userInfor?.firstName} ${userInfor?.lastName}`}
          onChange={debouncedFullNameInput}
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
            onClick={handleStaffUpdate}
          >
            Xác nhận
          </Button>
        </Box>
        {isExistContract ? (
          <Button
          variant="contained"
          component={Link}
          to={`/contracts/${userInfor.staffId}`}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: fontStyle,
          }}
          disableElevation={true}
        >
          Xem hợp đồng
        </Button>
        ) : (
          <Button
          variant="outlined"
          component={Link}
          to={`/contracts/staffs/${userInfor.staffId}/add`}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: fontStyle,
          }}
          disableElevation={true}
        >
          Tạo hợp đồng
        </Button>
        )}
        
      </Grid>
      <Box sx={{ borderBottom: "2px solid #333333", mb: "10px", mt: "1%" }}></Box>
      <Grid>
        <Typography
          sx={{ fontWeight: 700, fontSize: 25, fontFamily: "Mulish", color: "#007FFF", mb: "10px" }}
        >
          Liên lạc
        </Typography>
      </Grid>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <PhoneIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Số điện thoại</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.phone}
          onChange={debouncedPhoneInput}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Mail</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.email}
          onChange={debouncedEmailInput}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Địa chỉ</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.address}
          onChange={debouncedAddressInput}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
        ></BootstrapInput>
      </Box>

      <Grid>
        <Typography
          sx={{ fontWeight: 700, fontSize: 25, fontFamily: "Mulish", color: "#007FFF", mb: "10px" }}
        >
          Thông tin
        </Typography>
      </Grid>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Phòng ban</Typography>
        <BootstrapInput
          fullWidth
          disabled
          value={department?.departmentName}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <CalendarMonthIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Ngày vào làm</Typography>
        <BootstrapInput
          fullWidth
          disabled
          defaultValue={moment(userInfor?.hireDate).format("DD-MM-YYYY")}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <NumbersIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Số năm làm việc</Typography>
        <BootstrapInput
          fullWidth
          disabled
          defaultValue={userInfor?.workTimeByYear}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Giới tính</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.gender ? 1 : 0}
          InputProps={textFieldInputProps}
          variant="standard"
          onChange={(e: any) => setGender(e.target.value)}
          select
        >
          <MenuItem value={1}>Nam</MenuItem>
          <MenuItem value={0}>Nữ</MenuItem>
        </BootstrapInput>
      </Box>
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
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Quốc tịch</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.country}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
          onChange={debouncedCountryInput}
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>CMND|CCCD</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.citizenId}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
          onChange={debouncedCitizenIdInput}
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <NumbersIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Tk ngân hàng</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.bankAccount}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
          onChange={debouncedBankAccountInput}
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Tên tài khoản</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.bankAccountName}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
          onChange={debouncedBankAccountNameInput}
        ></BootstrapInput>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
        <SubjectIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
        <Typography sx={{ ...headerStyle, ...headerColor }}>Ngân hàng</Typography>
        <BootstrapInput
          fullWidth
          defaultValue={userInfor?.bank}
          InputProps={textFieldInputProps}
          sx={infoStyle}
          variant="standard"
          onChange={debouncedBankInput}
        ></BootstrapInput>
      </Box>

      <Box sx={{ borderBottom: "1px solid #C4C4C4", mt: "20px", mb: "20px" }}></Box>

      <Grid>
        <Typography
          sx={{ fontWeight: 700, fontSize: 25, fontFamily: "Mulish", color: "#007FFF", mb: "10px" }}
        >
          Kỹ năng
        </Typography>
      </Grid>

      {userInfor.staffSkills && (
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
                        <IconButton onClick={() => handleAddDeleteSkills(option.id)}>
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
            <></>
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
  );
}

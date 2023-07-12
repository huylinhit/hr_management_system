import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
    BaseSingleInputFieldProps,
    DatePicker,
    DatePickerProps,
    DateValidationError,
    FieldSection,
    UseDateFieldProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { userInforSelectors, fetchUserInforsAsync } from "../../department/userInforSlice";
import { FieldValues } from "react-hook-form";
import { departmentSelectors, fetchDepartmentsAsync } from "../../department/departmentSlice";
import moment from "moment";
import { fetchPayslipsAsync } from "../payslipSlice";

interface Props {
    isOwn?: boolean
    open: boolean;
    onClose: () => void;
}

const fontStyle = "Mulish";
const headerColor = {
    color: "#808080",
};
const verticalSpacing = {
    mb: "10px",
};
const headerStyle = {
    fontWeight: 600,
    fontFamily: fontStyle,
    fontSize: 16,
    padding: "10px 8px",
    width: "140px",
    marginBottom: "2px"
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
        fontSize: 16,
        width: "100%  ",
        padding: "12px 8px",
        transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: "Mulish",
        "&:hover:not(:focus)": {
            backgroundColor: disabled ? null : "#E7E7E7",
        },
        "&:focus": {
            // boxShadow: `0 2px 8px 0 rgba(0, 0, 0, 0.5)`, // Add vertical offset to boxShadow
            // borderColor: "#505050",
            // backgroundColor: "FFFFFF",
            // "&:hover": {
            //     backgroundColor: "FFFFFF", // Remove hover effect when focused
            // },
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
const textFieldInputProps = {
    disableUnderline: true,
    style: {
        ...infoStyle,
    },
};


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

const types = [
    "Lương Cho Toàn Bộ Nhân Viên",
    "Lương Theo Phòng Ban",
    "Lương Cho Một Cá Nhân"
]

interface Time {
    id: number,
    month: number,
    year: number
}

const time: Time[] = [];

for (let id = 1; id <= 12; id++) {
    const month = id;
    const year = moment().year();

    time.push({ id, month, year });
}
export default function CreatePayslipMainForm({ isOwn, open, onClose }: Props) {
    const [selectedOption, setSelectedOption] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState(1);
    const [selectedUser, setSelectedUser] = useState<number>(1);
    const [selectedTime, setSelectedTime] = useState(1);
    const departments = useAppSelector(departmentSelectors.selectAll);
    const { departmentsLoaded, status: departmentStatus } = useAppSelector(state => state.department);
    const dispatch = useAppDispatch();
    const users = useAppSelector(userInforSelectors.selectAll);
    const { userInforsLoaded, status } = useAppSelector(state => state.userInfor);
    useEffect(() => {
        if (!userInforsLoaded)
            dispatch(fetchUserInforsAsync());
    }, [userInforsLoaded]);

    useEffect(() => {
        if (!departmentsLoaded)
            dispatch(fetchDepartmentsAsync());
    }, [departmentsLoaded])
    const handleType = (e: any) => {
        setSelectedOption(e.target.value);
    };

    const handleTime = (e: any) => {
        setSelectedTime(e.target.value);
    };


    const handleDepartment = (e: any) => {
        setSelectedDepartment(e.target.value);
    };


    const handleUser = (e: any) => {
        setSelectedUser(e.target.value);
    };
    const handleCreatePayslip = async () => {
        const payslipCreateDto = {
            month: time[selectedTime - 1].month,
            year: time[selectedTime - 1].year
        }

        // console.log("Current Selected: ", selectedOption);
        // console.log("Value: ", payslipCreateDto)
        // console.log("Current Department: ", selectedDepartment, departments.find(c => c.departmentId === selectedDepartment))
        // console.log("Current Staff", selectedUser, users.find(c => c.staffId === selectedUser))
        switch (selectedOption) {
            // Toàn bộ
            case 0:
                {
                    await agent.Payslip.createAllStaff(payslipCreateDto)
                        .then(response => {
                            toast.success("Tạo đơn thành công 😊");
                            dispatch(fetchPayslipsAsync())
                        })
                        .catch(error => {
                            toast.error(`Lỗi khi tạo đơn 😥`)
                        })
                    break;
                }

            //Phòng ban
            case 1:
                {
                    await agent.Payslip.createByDepartment(selectedDepartment, payslipCreateDto)
                        .then(response => {
                            toast.success("Tạo đơn thành công 😊");
                            dispatch(fetchPayslipsAsync())
                        })
                        .catch(error => {
                            toast.error(`Lỗi khi tạo đơn 😥`)
                        })
                    break;
                }

            //Cá nhân
            case 2:
                {
                    await agent.Payslip.createByStaffId(selectedUser, payslipCreateDto)
                        .then(response => {
                            toast.success("Tạo đơn thành công 😊");
                            dispatch(fetchPayslipsAsync())
                        })
                        .catch(error => {
                            toast.error(`Lỗi khi tạo đơn 😥`)
                        })
                    break;
                }
        }
        onClose();
    };
    if (status.includes('pending')) return <LoadingComponent message="Nhân viên ..." />

    if (departmentStatus.includes('pending')) return <LoadingComponent message="Đang Tải Phòng Ban..." />

    return (
        <>
            <Dialog sx={{ height: "1000px", }} open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
                <DialogTitle
                    sx={{ fontWeight: 700, fontSize: 22, fontFamily: "Mulish" }}
                    display={"flex"}
                    alignItems={"center"}
                >
                    {selectedOption === 0 && <p>Tạo {types[0]}</p>}
                    {selectedOption === 1 && <p>Tạo {types[1]}</p>}
                    {selectedOption === 2 && <p>Tạo {types[2]}</p>}
                </DialogTitle>
                <DialogContent
                    sx={{ height: "180px" }}
                >

                    <Box display={"flex"} alignItems={"center"} sx={{ width: "100%" }}>
                        <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
                        <Typography sx={{ ...headerStyle, ...headerColor }}>Tạo</Typography>
                        {types.length !== 0 && (
                            <BootstrapInput
                                fullWidth
                                InputProps={textFieldInputProps}
                                defaultValue={1}
                                variant="standard"
                                onChange={handleType}
                                value={selectedOption}
                                select
                            >
                                {types.map((item, index) => (
                                    <MenuItem
                                        key={index} value={index}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </BootstrapInput>
                        )}
                    </Box>
                    <Box display={"flex"} alignItems={"center"} sx={{ width: "100%" }}>
                        <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
                        <Typography sx={{ ...headerStyle, ...headerColor }}>Thời Gian</Typography>
                        {time.length !== 0 && (
                            <BootstrapInput
                                fullWidth
                                InputProps={textFieldInputProps}
                                variant="standard"
                                onChange={handleTime}
                                value={selectedTime}
                                select
                            >
                                {time.map((item) => (
                                    <MenuItem
                                        key={item.id} value={item.id}>
                                        {item.month}/{item.year}
                                    </MenuItem>
                                ))}
                            </BootstrapInput>
                        )}
                    </Box>
                    {selectedOption === 1 &&
                        <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
                            <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
                            <Typography sx={{ ...headerStyle, ...headerColor }}>Phòng Ban</Typography>

                            <BootstrapInput
                                fullWidth
                                InputProps={textFieldInputProps}
                                variant="standard"
                                onChange={handleDepartment}
                                value={selectedDepartment}
                                select
                            >
                                {departments.map((item) => (
                                    <MenuItem key={item.departmentId} value={item.departmentId}>
                                        {`${item.departmentName} (MPB: ${item.departmentId})`}
                                    </MenuItem>
                                ))}
                            </BootstrapInput>

                        </Box>
                    }
                    {selectedOption === 2 &&
                        <Box display={"flex"} alignItems={"center"} sx={verticalSpacing}>
                            <FormatListBulletedIcon sx={{ mr: "5px", ...headerColor }} fontSize="small" />
                            <Typography sx={{ ...headerStyle, ...headerColor }}>Nhân Viên</Typography>

                            <BootstrapInput
                                fullWidth
                                InputProps={textFieldInputProps}
                                variant="standard"
                                onChange={handleUser}
                                value={selectedUser}
                                select
                            >
                                {users.map((item) => (
                                    <MenuItem key={item.staffId} value={item.staffId}>
                                        {`${item.lastName} ${item.firstName} (MSNV: ${item.staffId})`}
                                    </MenuItem>
                                ))}
                            </BootstrapInput>
                        </Box>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button onClick={handleCreatePayslip} autoFocus>
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

import {
  AccessAlarm,
  BedOutlined,
  ExpandLess,
  ExpandMore,
  Settings,
  StarBorder,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { setHeaderTitle } from "./headerSlice";
import { Link } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { deepPurple } from "@mui/material/colors";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const drawerWidth = 320;
const headerStyle = {
  // color: "#A2A2A2",

  // color: "#000",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 13,
};
const listItemStyle = {
  // color: "#6A6A78",

  // color: "#000",
  fontWeight: 600,
  fontFamily: "Mulish",
  // "& .MuiTypography-root": {

  // },
  fontSize: 16,
};
const fontStyle = "Mulish";

export default function Sidebar() {
  const [active, setActive] = useState("");

  const handleActiveClick = (buttonName: string) => {
    setActive(buttonName);
  };

  const dispatch = useAppDispatch();
  const [openLeaveLog, setOpenLeaveLog] = useState(true);
  const [openOT, setOpenOT] = useState(true);
  const [openStaff, setOpenStaff] = useState(true);
  const [openCandidate, setOpenCandidate] = useState(true);
  const [openSalary, setOpenSalary] = useState(true);
  const [openContract, setOpenContract] = useState(true);
  const [openTicket, setOpenTicket] = useState(true);
  const [pageTitle, setPageTitle] = useState("Default Page");
  const { user } = useAppSelector((state) => state.account);

  const [avatarUrl, setAvatarUrl] = useState("");
  const storageRef = ref(storage, `staffsAvatar/${user?.userInfor.staffId}`);

  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch((error) => { });
  }, [avatarUrl, dispatch]);

  const handleOpenLeaveLog = () => {
    setOpenLeaveLog(!openLeaveLog);
  };
  const handleOpenStaff = () => {
    setOpenStaff(!openStaff);
  };
  const handleOpenOT = () => {
    setOpenOT(!openOT);
  };

  const handleOpenContract = () => {
    setOpenContract(!openContract);
  };
  const handleOpenCandidate = () => {
    setOpenCandidate(!openCandidate);
  };
  const handleOpenTicket = () => {
    setOpenTicket(!openTicket);
  };
  const setCandidateHeader = () => {
    dispatch(setHeaderTitle([{ title: "Toàn bộ ứng viên", path: "/candidates" }]));
  };
  const changePageTitle = (title: string) => {
    setPageTitle(title);
  };

  const handleOpenMyOT = () => {
    setPageTitle("Đơn tăng ca của tôi");
  };

  const handleOpenSalary = () => {
    setOpenSalary(!openSalary);
  };

  return (
    <div>
      <CssBaseline />
      <Header pageTitle={pageTitle} />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#FFF",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          className={cx("container-content")}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box>
            <List className={cx("container")}>
              <ListItemButton
                component={Link}
                to={`/staffs/${user?.userInfor.staffId}`}
                className={cx("header")}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: deepPurple[500],
                    mr: "12px",
                  }}
                  src={avatarUrl}
                  alt=""
                >
                  {user?.userInfor.fullName.charAt(0)}
                </Avatar>
                <ListItemText
                  className={cx("list-item-content")}
                  primaryTypographyProps={{
                    // color: "#000000",
                    // color: "#000",
                    fontWeight: 600,
                    fontFamily: "Mulish",
                    fontSize: 16,
                  }}
                  primary={user?.userInfor.fullName}
                />
              </ListItemButton>
              {/* <ListItemButton onClick={handleOpenStaff}>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="Chỉnh sửa" />
              </ListItemButton> */}
            </List>
          </Box>

          {/*Nhân viên, Employee*/}
          <Box flex="1" overflow="auto">
            {user && user.roles?.includes("Staff") && user.roles.length === 1 && (
              <>
                <List>
                  {/*Log Leave*/}
                  <>
                    <ListItemButton className={cx("header")} onClick={handleOpenLeaveLog}>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...headerStyle }}
                        primary="NGHỈ PHÉP"
                      />
                      {/* {openLeaveLog ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItemButton>
                    <Collapse in={openLeaveLog} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {/*Đơn nghỉ phép nhân viên*/}

                        <ListItemButton
                          className={cx("list-item", { activeButton: active === "myleavelist" })}
                          onClick={() => handleActiveClick("myleavelist")}
                          component={Link}
                          to="/own-log-leaves"
                        >
                          <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                            <HotelOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            className={cx("list-item-content")}
                            primaryTypographyProps={{ ...listItemStyle }}
                            primary="Đơn Nghỉ Phép Của Tôi"
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </>
                  {/*Log Overtime*/}
                  <>
                    <ListItemButton className={cx("header")} onClick={handleOpenOT}>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...headerStyle }}
                        primary="TĂNG CA"
                      />
                      {/* {openOT ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItemButton>
                    <Collapse in={openOT} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        <ListItemButton
                          className={cx("list-item", { activeButton: active === "my-overtime-list" })}
                          onClick={() => handleActiveClick("my-overtime-list")}
                          component={Link}
                          to="/own-log-overtimes"
                        >
                          <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                            <WatchLaterOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            className={cx("list-item-content")}
                            primaryTypographyProps={{ ...listItemStyle }}
                            primary="Đơn Tăng Ca Của Tôi"
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </>
                  {/*Other Tickets*/}
                  <>
                    <ListItemButton className={cx("header")} onClick={handleOpenTicket}>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...headerStyle }}
                        primary="ĐƠN KHÁC"
                      />
                      {/* {openTicket ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItemButton>
                    <Collapse in={openTicket} timeout="auto" unmountOnExit>
                      <ListItemButton
                        className={cx("list-item", { activeButton: active === "mytickets" })}
                        onClick={() => handleActiveClick("mytickets")}
                        dense
                        component={Link}
                        to="/own-tickets"
                      >
                        <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                          <MailOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          className={cx("list-item-content")}
                          primaryTypographyProps={{ ...listItemStyle }}
                          primary="Đơn Khác Của Tôi"
                        />
                      </ListItemButton>
                    </Collapse>
                  </>
                  {/* <>
                    <ListItemButton className={cx("header")} onClick={handleOpenSalary}>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...headerStyle }}
                        primary="QUẢN LÍ LƯƠNG"
                      />
                    </ListItemButton>
                    <Collapse in={openSalary} timeout="auto" unmountOnExit>
                      <ListItemButton
                        className={cx("list-item", { activeButton: active === "own-payslip" })}
                        onClick={() => handleActiveClick("own-payslip")}
                        dense
                        component={Link}
                        to="/own-payslips"
                      >
                        <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                          <PeopleAltOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          className={cx("list-item-content")}
                          primaryTypographyProps={{ ...listItemStyle }}
                          primary="Lương Của Tôi"
                        />
                      </ListItemButton>

                    </Collapse>
                  </> */}
                </List>
              </>
            )}
            {user && user.roles?.includes("HRStaff") && (
              <List>
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenStaff}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="NHÂN VIÊN"
                    />
                    {/* {openStaff ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openStaff} timeout="auto" unmountOnExit>
                    {/*Department*/}
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "department-list" })}
                      onClick={() => handleActiveClick("department-list")}
                      component={Link}
                      to="/departments"
                    >
                      <ListItemIcon sx={{ minWidth: "30px" }} className={cx("list-item-content")}>
                        <PeopleAltOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Phòng Ban"
                      />
                    </ListItemButton>

                    <ListItemButton
                      className={cx("list-item", {
                        activeButton: active === "department-employee-list",
                      })}
                      onClick={() => handleActiveClick("department-employee-list")}
                      dense
                      component={Link}
                      to="/staffs"
                    >
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <PeopleAltOutlinedIcon
                          className={cx("list-item-content")}
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Toàn Bộ Nhân Viên"
                      />
                    </ListItemButton>

                    {/*Create Employee*/}
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "create-employee" })}
                      onClick={() => handleActiveClick("create-employee")}
                      component={Link}
                      to="/staffs/add"
                    >
                      <ListItemIcon sx={{ minWidth: "30px" }} className={cx("list-item-content")}>
                        <PersonAddAltOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Tạo Nhân Viên Mới"
                      />
                    </ListItemButton>
                  </Collapse>
                </>
                {/*Log Leave*/}
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenLeaveLog}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="NGHỈ PHÉP"
                    />
                    {/* {openLeaveLog ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openLeaveLog} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {/*Đơn nghỉ phép nhân viên*/}

                      {/*Sửa lại đơn nghỉ phép của toàn bộ nhân viên và đơn nghỉ phép của 1 nhân viên, call API bị sai */}
                      <ListItemButton
                        className={cx("list-item", { activeButton: active === "leave-list" })}
                        onClick={() => handleActiveClick("leave-list")}
                        component={Link}
                        to="/log-leaves"
                      >
                        <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                          <HotelOutlinedIcon fontSize="small" />
                        </ListItemIcon>

                        <ListItemText
                          className={cx("list-item-content")}
                          primaryTypographyProps={{ ...listItemStyle }}
                          primary="Đơn Nghỉ Phép Nhân Viên"
                        />
                      </ListItemButton>

                      <ListItemButton
                        className={cx("list-item", { activeButton: active === "myleavelist" })}
                        onClick={() => handleActiveClick("myleavelist")}
                        component={Link}
                        to="/own-log-leaves"
                      >
                        <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                          <HotelOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          className={cx("list-item-content")}
                          primaryTypographyProps={{ ...listItemStyle }}
                          primary="Đơn Nghỉ Phép Của Tôi"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
                {/*Log Overtime*/}
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenOT}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="TĂNG CA"
                    />
                    {/* {openOT ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openOT} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      <ListItemButton
                        className={cx("list-item", { activeButton: active === "overtime-list" })}
                        onClick={() => handleActiveClick("overtime-list")}
                        component={Link}
                        to="/log-overtimes"
                      >
                        <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                          <WatchLaterOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          className={cx("list-item-content")}
                          primaryTypographyProps={{ ...listItemStyle }}
                          primary="Đơn Tăng Ca Nhân Viên"
                        />
                      </ListItemButton>

                      <ListItemButton
                        className={cx("list-item", { activeButton: active === "my-overtime-list" })}
                        onClick={() => handleActiveClick("my-overtime-list")}
                        component={Link}
                        to="/own-log-overtimes"
                      >
                        <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                          <WatchLaterOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          className={cx("list-item-content")}
                          primaryTypographyProps={{ ...listItemStyle }}
                          primary="Đơn Tăng Ca Của Tôi"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
                {/*Ứng viên Candidates*/}
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenCandidate}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="TUYỂN DỤNG"
                    />
                    {/* {openCandidate ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openCandidate} timeout="auto" unmountOnExit>
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "candidate-list" })}
                      onClick={() => handleActiveClick("candidate-list")}
                      dense
                      component={Link}
                      to="/candidates"
                    >
                      <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                        <PeopleAltOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Danh sách ứng viên"
                      />
                    </ListItemButton>
                  </Collapse>
                </>
                {/*Other Tickets*/}
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenTicket}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="ĐƠN KHÁC"
                    />
                    {/* {openTicket ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openTicket} timeout="auto" unmountOnExit>
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "employeeList" })}
                      onClick={() => handleActiveClick("employeeList")}
                      dense
                      component={Link}
                      to="/tickets"
                    >
                      <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                        <MailOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Danh Sách Đơn Khác"
                      />
                    </ListItemButton>

                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "mytickets" })}
                      onClick={() => handleActiveClick("mytickets")}
                      dense
                      component={Link}
                      to="/own-tickets"
                    >
                      <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                        <MailOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Đơn Khác Của Tôi"
                      />
                    </ListItemButton>
                  </Collapse>
                </>
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenSalary}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="QUẢN LÍ LƯƠNG"
                    />
                    {/* {openSalary ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openSalary} timeout="auto" unmountOnExit>
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "payslips" })}
                      onClick={() => handleActiveClick("payslips")}
                      dense
                      component={Link}
                      to="/payslips"
                    >
                      <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                        <PeopleAltOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Lương Nhân Viên"
                      />
                    </ListItemButton>
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "own-payslip" })}
                      onClick={() => handleActiveClick("own-payslip")}
                      dense
                      component={Link}
                      to="/own-payslips"
                    >
                      <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                        <PeopleAltOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Lương Của Tôi"
                      />
                    </ListItemButton>

                  </Collapse>
                </>
                {/*Contract */}
                <>
                  <ListItemButton className={cx("header")} onClick={handleOpenContract}>
                    <ListItemText
                      className={cx("list-item-content")}
                      primaryTypographyProps={{ ...headerStyle }}
                      primary="HỢP ĐỒNG"
                    />
                    {/* {openTicket ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>
                  <Collapse in={openContract} timeout="auto" unmountOnExit>
                    <ListItemButton
                      className={cx("list-item", { activeButton: active === "contract-list" })}
                      onClick={() => handleActiveClick("contract-list")}
                      dense
                      component={Link}
                      to="/contracts"
                    >
                      <ListItemIcon className={cx("list-item-content")} sx={{ minWidth: "30px" }}>
                        <MailOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={cx("list-item-content")}
                        primaryTypographyProps={{ ...listItemStyle }}
                        primary="Hợp Đồng Nhân Viên"
                      />
                    </ListItemButton>
                  </Collapse>
                </>
              </List>
            )}

          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

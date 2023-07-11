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
const drawerWidth = 300;
const headerStyle = {
  color: "#A2A2A2",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 14,
};
const listItemStyle = {
  color: "#6A6A78",
  fontWeight: 600,
  fontFamily: "Mulish",
  "& .MuiTypography-root": {
    wordSpacing: "-0.5em", // Adjust the word spacing value here
  },
  fontSize: 16,
};
const fontStyle = "Mulish";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const [openLeaveLog, setOpenLeaveLog] = useState(true);
  const [openOT, setOpenOT] = useState(true);
  const [openStaff, setOpenStaff] = useState(true);
  const [openCandidate, setOpenCandidate] = useState(true);
  const [openTicket, setOpenTicket] = useState(true);
  const [pageTitle, setPageTitle] = useState("Default Page");
  const { user } = useAppSelector((state) => state.account);

  const [avatarUrl, setAvatarUrl] = useState("");
  const storageRef = ref(storage, `candidatesAvatar/${user?.userInfor.staffId}`);

  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch((error) => {});
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
  return (
    <>
      <CssBaseline />
      <Header pageTitle={pageTitle} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#F7F7F7",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box display="flex" flexDirection="column" height="100%">
          <Box>
            <List sx={{ pl: "10px" }}>
              <ListItemButton>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 32,
                    height: 32,
                    marginRight: 2,
                    fontSize: "14px",
                    bgcolor: deepPurple[500],
                  }}
                  src={avatarUrl}
                  alt=""
                >
                  {user?.userInfor.fullName.charAt(0)}
                </Avatar>
                <ListItemText
                  primaryTypographyProps={{
                    color: "#000000",
                    fontWeight: 600,
                    fontFamily: "Mulish",
                    fontSize: 16,
                  }}
                  primary={user?.userInfor.fullName}
                />
              </ListItemButton>
              <ListItemButton onClick={handleOpenStaff}>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="Chỉnh sửa" />
              </ListItemButton>
            </List>
          </Box>

          <Box flex="1" overflow="auto">
            <List sx={{ pl: "10px" }}>
              <ListItemButton onClick={handleOpenStaff}>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="NHÂN VIÊN" />
                {openStaff ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openStaff} timeout="auto" unmountOnExit>
                <ListItemButton dense component={Link} to="/staffs">
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <PeopleAltOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Danh sách nhân viên"
                  />
                </ListItemButton>
                <ListItemButton component={Link} to="/departments">
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <PeopleAltOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ ...listItemStyle }} primary="Phòng ban" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <PersonAddAltOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Tạo nhân viên mới"
                  />
                </ListItemButton>
              </Collapse>

              <ListItemButton onClick={handleOpenLeaveLog}>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="NGHỈ PHÉP" />
                {openLeaveLog ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openLeaveLog} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItemButton component={Link} to="/myleaves"> 
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <HotelOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ ...listItemStyle }}
                      primary="Đơn nghỉ phép của tôi"
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <HotelOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ ...listItemStyle }}
                      primary="Đơn nghỉ phép nhân viên"
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <HotelOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ ...listItemStyle }}
                      primary="Các loại nghỉ phép"
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={handleOpenOT}>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="TĂNG CA" />
                {openOT ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openOT} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItemButton onClick={handleOpenMyOT}>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <WatchLaterOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ ...listItemStyle }}
                      primary="Đơn tăng ca của tôi"
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <WatchLaterOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ ...listItemStyle }}
                      primary="Đơn tăng của nhân viên"
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <WatchLaterOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ ...listItemStyle }}
                      primary="Các loại tăng ca"
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={handleOpenCandidate}>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="TUYỂN DỤNG" />
                {openCandidate ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCandidate} timeout="auto" unmountOnExit>
                <ListItemButton
                  dense
                  component={Link}
                  to="/candidates"
                  onClick={setCandidateHeader}
                >
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <PeopleAltOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Danh sách ứng viên"
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <PersonAddAltOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Tạo ứng viên mới"
                  />
                </ListItemButton>
              </Collapse>

              <ListItemButton onClick={handleOpenTicket}>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="ĐƠN KHÁC" />
                {openTicket ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openTicket} timeout="auto" unmountOnExit>
                <ListItemButton dense component={Link} to="/mytickets">
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <MailOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Đơn khác của tôi"
                  />
                </ListItemButton>

                <ListItemButton component={Link} to="/otheruserstickets">
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <MailOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Đơn khác của nhân viên"
                  />
                </ListItemButton>
              </Collapse>

              <ListItemButton onClick={handleOpenTicket}>
                <ListItemText primaryTypographyProps={{ ...headerStyle }} primary="ĐƠN KHÁC" />
                {openTicket ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openTicket} timeout="auto" unmountOnExit>
                <ListItemButton dense component={Link} to="/mytickets">
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <MailOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Đơn khác của tôi"
                  />
                </ListItemButton>

                <ListItemButton component={Link} to="/otheruserstickets">
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <MailOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ ...listItemStyle }}
                    primary="Đơn khác của nhân viên"
                  />
                </ListItemButton>
              </Collapse>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

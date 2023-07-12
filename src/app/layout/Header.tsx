import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Avatar,
  Button,
  Typography,
} from "@mui/material";

import { Link, NavLink, useLocation } from "react-router-dom";
import { AccessAlarm, BorderAll } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../store/configureStore";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signOut } from "../../features/account/accountSlice";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { deepPurple } from "@mui/material/colors";
const midLinks = [
  { title: "home", path: "" },
  { title: "overtime", path: "overtime" },
  { title: "about", path: "about" },
];

const enterDelay = 400;

const rightLinks = [
  {
    title: (
      <IconButton component={Link} to="/" size="large" sx={{ mr: 2 }}>
        <LoginIcon />
      </IconButton>
    ),
    path: "/login",
  },
];
const fontStyle = "Mulish";
const navStyle = {
  fontSize: 18,
  fontWeight: 600,
  fontFamily: fontStyle,
  textTransform: "none",
  color: "#333333",
  borderRadius: "10px",
  padding: "0px 10px 0px 10px",
  "&:hover": {
    backgroundColor: "#F8F8F8", // Set the hover background color
  },
};
interface Props {
  pageTitle: string;
}
export default function Header({ pageTitle }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { headerTitle } = useAppSelector((state) => state.header);
  const [avatarUrl, setAvatarUrl] = useState("");
  const storageRef = ref(storage, `candidatesAvatar/${user?.userInfor.staffId}`);

  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch((error) => {});
  }, [avatarUrl, dispatch]);
  return (
    <Box
      position="fixed" // Fix the position of the header
      top={0} // Position it at the top of the viewport
      left={0} // Position it at the left side
      right={0} // Position it at the right side
      zIndex={1} // Set a higher z-index to make sure it appears above other elements
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        //borderBottom: "1px solid #E4E4E4 ",
        backgroundColor: "#FFFFFF",
        opacity: "100%",
        width: `calc(100% - ${325}px)`,
        ml: `${320}px`,
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)", // Add shadow effect

        height: "48px",
        pl: "10px",
        pr: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
        {headerTitle.map((link, index) => {
          if (link.path) {
            return (
              <React.Fragment key={link.path}>
                {index !== 0 && (
                  <Typography sx={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 20 }}>
                    /
                  </Typography>
                )}
                <Button
                  variant="text"
                  sx={navStyle}
                  disableElevation={true}
                  component={NavLink}
                  to={link.path}
                >
                  {link.title}
                </Button>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={link.title}>
                {index !== 0 && (
                  <Typography sx={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 20 }}>
                    /
                  </Typography>
                )}
                <Button variant="text" sx={navStyle} disableElevation={true}>
                  {link.title}
                </Button>
              </React.Fragment>
            );
          }
        })}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* <Tooltip title="Alarm" enterDelay={enterDelay}>
          <IconButton
            component={Link}
            to="/departments"
            size="large"
            sx={{ mr: 2, color: "#007FFF" }}
          >
            <AccessAlarm fontSize="inherit" />
          </IconButton>
        </Tooltip> */}

        {/* <Tooltip title="Github Repository" enterDelay={enterDelay}>
          <IconButton
            component={Link}
            to="/"
            size="large"
            sx={{
              mr: 2,
              color: "#007FFF",
              borderRadius: "12px",
              border: "1px solid #E0E0E0",
              padding: "6px",
            }}
            aria-label="logout"
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>
        </Tooltip> */}
        {/* <Avatar
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
        </Avatar> */}
        <Tooltip
          title="Logout"
          enterDelay={enterDelay}
          onClick={() => {
            dispatch(signOut());
          }}
        >
          <IconButton
            component={Link}
            to="/login"
            size="large"
            sx={{
              mr: 2,
              color: "#0075FF",
              borderRadius: "12px",
              border: "1px solid #E0E0E0",
              padding: "6px",
            }}
            aria-label="logout"
          >
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

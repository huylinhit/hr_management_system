import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import MyticketsImg from "../../Images/Mytickets.png";
import { NavLink } from "react-router-dom";
const headerItemStyle = {
  fontFamily: "Mulish",
  fontSize: "18px",
  fontWeight: 500,
  color: "#000000",
  padding: "12px",
  textTransform: "none",
};
export default function HomePage() {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <AppBar position="fixed" color="inherit" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              color="inherit"
              sx={{
                fontFamily: "Mulish",
                fontSize: "20px",
                fontWeight: 700,
                color: "#000000",
                textTransform: "none",
              }}
            >
              HitoHub
            </Button>
            <Button color="inherit" sx={{ ...headerItemStyle }}>
              Sản phẩm
            </Button>
            <Button color="inherit" sx={{ ...headerItemStyle }}>
              Tải về
            </Button>
            <Button color="inherit" sx={{ ...headerItemStyle }}>
              Giải pháp
            </Button>
            <Button color="inherit" sx={{ ...headerItemStyle }}>
              Nguồn lực
            </Button>
            <Button color="inherit" sx={{ ...headerItemStyle }}>
              Giá cả
            </Button>
          </Box>
          <Box>
            <Button color="inherit" sx={{ ...headerItemStyle }} component={NavLink} to={`/login`}>
              Đăng nhập
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box flex="1" overflow="auto" sx={{ pt: "200px" }}>
        <Box>
          <Typography
            align="center"
            gutterBottom
            sx={{
              fontFamily: "Mulish",
              fontSize: "80px",
              fontWeight: 800,
              lineHeight: "0.9",
              color: "#000000",
            }}
          >
            Your company
            <br /> & all in your hand
          </Typography>
          <Typography
            align="center"
            gutterBottom
            sx={{
              fontFamily: "Mulish",
              fontSize: "30px",
              fontWeight: 600,
              lineHeight: "1.2",
              color: "#000000",
            }}
          >
            Hitohub connects member, empower <br /> collaboration & workflow
          </Typography>

          <Box display="flex" justifyContent="center" mt={2}>
            <Box component="img" src={MyticketsImg} sx={{ width: "75%" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

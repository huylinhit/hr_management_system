import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Box >
      <Sidebar />
      <CssBaseline />

      <Box sx={{ mt: 8, ml: 30, backgroundColor:"#f5f5f5" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;

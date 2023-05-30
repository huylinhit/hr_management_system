import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Box >
      <Sidebar />
      <CssBaseline />

      <Box sx={{ mt: 10, border: '1px solid black', ml: 32, mr: 2}}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;

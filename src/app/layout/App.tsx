import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { useAppDispatch } from "../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import LoadingComponent from "./LoadingComponent";
import { ToastContainer } from "react-toastify";
function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      console.log("FETCH CURRENT USER");
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])
  
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />
  
  return (
    <Box >
    <Sidebar />
    <CssBaseline />
      <Box sx={{ mt: 0,ml: 37, backgroundColor:"#FFFFFF" }}>
        <ToastContainer/>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;

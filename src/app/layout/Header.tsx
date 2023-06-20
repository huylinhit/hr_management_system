import { AppBar, Box, Button, IconButton, List, ListItem, Toolbar, Typography, Tooltip } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { AccessAlarm, BorderAll } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import GitHubIcon from '@mui/icons-material/GitHub';
const midLinks = [
    { title: 'home', path: '' },
    { title: 'overtime', path: 'overtime' },
    { title: 'about', path: 'about' },
]

const enterDelay = 400;

const rightLinks = [
    { 
        title: 
        <IconButton component={Link} to="/" size="large" sx={{ mr: 2 }}>
            <LoginIcon />
        </IconButton>,
        path: '/login' },
]

const navStyle = {
    color: 'inherit',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'secondary.main'
    }
};


export default function Header() {
    const { user } = useAppSelector(state => state.account);

    return (
        <AppBar position="fixed" elevation={0} color="inherit" sx={{borderBottom: '1px solid #E4E4E4 ', opacity: '100%'}}>
          <Toolbar sx={{justifyContent:'space-between'}}>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {/* <Typography
                    component={NavLink}
                    to="/"
                    variant="h6"
                    sx={{ textDecoration: 'none', color: '#333333' }}
                >
                    Human Resource Management
                </Typography> */}
            </Box>
    
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Alarm" enterDelay={enterDelay}>
                    <IconButton component={Link} to="/departments" size="large" sx={{ mr: 2 , color:'#007FFF'}}>
                        <AccessAlarm fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                 
                <Tooltip title="Github Repository" enterDelay={enterDelay}>
                    <IconButton component={Link} to="/" size="large" sx={{ mr: 2 , color:'#007FFF', borderRadius:'12px', border: '1px solid #E0E0E0', padding:'6px'}} aria-label="logout">
                        <GitHubIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Logout" enterDelay={enterDelay}>
                    <IconButton component={Link} to="/" size="large" sx={{ mr: 2 , color:'#0075FF', borderRadius:'12px', border: '1px solid #E0E0E0', padding:'6px'}} aria-label="logout">
                        <LogoutIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                 
            </Box>
          </Toolbar>
        </AppBar>
      );
}

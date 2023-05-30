import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import DarkModeButton from "../components/DarkModeButton/DarkModeButton";
import { Link, NavLink } from "react-router-dom";
import { AccessAlarm, ShoppingCart } from "@mui/icons-material";


const midLinks = [
    { title: 'home', path: '' },
    { title: 'catalog', path: 'catalog' },
    { title: 'about', path: 'about' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
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

function Header() {


    return (
            
            <>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            component={NavLink}
                            to='/' variant="h5"
                            sx={{ textDecoration: 'none', color: 'inherit' }}
    
                        >
                            Re-Store
                        </Typography>
                    </Box>
    
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) =>
                        (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        )
                        )}
                    </List>
    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton component={Link} to='/basket' size="large" color="inherit" sx={{ mr: 2 }}>
                            <AccessAlarm />
                        </IconButton>
    
                        <List sx={{ display: 'flex', alignItems: 'center' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    key={path}
                                    to={path}
                                    component={NavLink}
                                    sx={{ color: 'inherit', typography: 'h6' }}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Toolbar>
            </>
    );
}

export default Header;
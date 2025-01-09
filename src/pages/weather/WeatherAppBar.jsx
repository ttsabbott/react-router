import { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AcUnit from '@mui/icons-material/AcUnit';
// import Add from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

const WeatherAppBar = ({ locations, setCurrentLocation, setPointsUrl, pointsData, pointsIsPending, pointsError }) => {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        const button = event.currentTarget;
        const buttonText = button.textContent;
        // console.log(buttonText);
        if (buttonText) {
            locations.forEach(location => {
                // console.log('before -> ' + JSON.stringify(location, null, 4));
                location.selected = (location.title === buttonText);
                if (location.selected) {
                    setCurrentLocation(location);
                    setPointsUrl(import.meta.env.VITE_NOAAWEATHER_URL + '/points/' + location.lat + ',' + location.long);
                    pointsIsPending = true;
                    pointsError = null;
                    pointsData = null;
                }
                // console.log('after --> ' + JSON.stringify(location, null, 4));
            });
        }
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <AcUnit sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Weather
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="locations"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        // TODO Need to learn how to change the selected menu item's background color!
                        // Globally, I handled it within the Weather.css file, but there must be a better way...
                        // .css-1rju2q6-MuiButtonBase-root-MuiMenuItem-root.Mui-selected { background-color: yellow; }
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.title} onClick={handleCloseNavMenu} selected={location.selected}>
                                    <Typography sx={{ textAlign: 'center', color: 'text.primary', }}>{location.title}</Typography>
                                </MenuItem>
                            ))}
                            {/* <MenuItem key="add" onClick={handleCloseNavMenu}>
                                <Add sx={{ color: 'text.primary', bgcolor: 'text.secondary', }} />
                            </MenuItem> */}
                        </Menu>
                    </Box>

                    <AcUnit sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Weather
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', } }}>
                        {locations.map((location) => (
                            <Button
                                key={location.title}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', }}
                                variant={location.selected ? "contained" : "text"}
                            >
                                {location.title}
                            </Button>
                        ))}
                        {/* <Button key="add" onClick={handleCloseNavMenu}>
                            <Add sx={{ mr: 1, color: 'text.primary', }} />
                        </Button> */}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );

};

export default WeatherAppBar;

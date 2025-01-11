import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AcUnit from '@mui/icons-material/AcUnit';

const WeatherAppBar = ({ locations, currentLocation, setCurrentLocation }) => {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        const button = event.currentTarget;
        const buttonText = button.textContent;
        console.log(buttonText);
        console.log('currentLocation before -> ' + JSON.stringify(currentLocation, null, 4));
        locations.forEach(location => {
            console.log('before -> ' + JSON.stringify(location, null, 4));
            location.selected = (location.title === buttonText);
            if (location.selected) {
                setCurrentLocation(location);
                // setPointsUrl(import.meta.env.VITE_NOAAWEATHER_URL + '/points/' + location.lat + ',' + location.long);
                // pointsData = null;
            }
            console.log('after --> ' + JSON.stringify(location, null, 4));
        });
        console.log('currentLocation after --> ' + JSON.stringify(currentLocation, null, 4));
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <AcUnit sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                            aria-label="account of current user"
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
                        >
                            {locations.map((location) => {
                                console.log('menu -> ' + JSON.stringify(location, null, 4));
                                return (
                                    <MenuItem key={location.title} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>{location.title}</Typography>
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </Box>

                    <AcUnit sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {locations.map((location) => {
                            console.log('box --> ' + JSON.stringify(location, null, 4));
                            return (
                                <Button
                                key={location.title}
                                onClick={handleCloseNavMenu}
                                variant={location.selected ? "contained" : "text"}
                                color={location.selected ? "primary" : "secondary"}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {location.title}
                            </Button>
                            )
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default WeatherAppBar;

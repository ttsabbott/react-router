import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
// import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// import { styled, alpha } from '@mui/material/styles';

import AcUnit from '@mui/icons-material/AcUnit';
// import AdbIcon from '@mui/icons-material/Adb';
import Add from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(1),
//         width: 'auto',
//     },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     width: '100%',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         [theme.breakpoints.up('sm')]: {
//             width: '12ch',
//             '&:focus': {
//                 width: '20ch',
//             },
//         },
//     },
// }));

const WeatherAppBar = ({ locations, setCurrentLocation, setPointsUrl, pointsData }) => {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        const button = event.currentTarget;
        const buttonText = button.textContent;
        console.log(buttonText);
        locations.forEach(location => {
            //console.log('before -> ' + JSON.stringify(location, null, 4));
            location.selected = (location.title === buttonText);
            if (location.selected) {
                setCurrentLocation(location);
                setPointsUrl(import.meta.env.VITE_NOAAWEATHER_URL + '/points/' + location.lat + ',' + location.long);
                pointsData = null;
            }
            //console.log('after --> ' + JSON.stringify(location, null, 4));
        });
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
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.title} onClick={handleCloseNavMenu} selected={location.selected}>
                                    <Typography sx={{ textAlign: 'center', color: 'text.primary', }}>{location.title}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem key="add" onClick={handleCloseNavMenu}>
                                <Add sx={{ color: 'text.primary', bgcolor: 'text.secondary', }} />
                            </MenuItem>
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
                                color={location.selected ? "primary" : "secondary"}
                            >
                                {location.title}
                            </Button>
                        ))}
                        <Button key="add" onClick={handleCloseNavMenu}>
                            <Add sx={{ mr: 1, color: 'text.primary', }} />
                        </Button>
                    </Box>

                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}

                </Toolbar>
            </Container>
        </AppBar>
    );

};

export default WeatherAppBar;

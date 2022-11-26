import * as React from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import { createAction_addToAppBarLinks, createAction_deleteFromAppBarLinks, createAction_setUserStatus } from "../store/actionCreators/AppPageActionCreators"
//import {Link} from "react-router-dom";
import { useNavigate} from "react-router";


function AppBar1() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const pages = useSelector(state => {
        return state.ui.AppPage.AppBarLinks
    })

    const userStatus = useSelector(state => state.cached_data.AppPage.userAuthorized)

    const dispatch = useDispatch()

    const navigate =useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLoginLogoutBtnClick = (event) => {
        event.preventDefault()
        if (!userStatus) {
            dispatch(createAction_setUserStatus(!userStatus))
            dispatch(createAction_addToAppBarLinks({
                title: 'Корзина',
                link: '../cart'
            }))
            dispatch(createAction_addToAppBarLinks({
                title: 'Мои заказы',
                link: '../purchases'
            }))
        }
        else {
            dispatch(createAction_setUserStatus(!userStatus))
            dispatch(createAction_deleteFromAppBarLinks())
            dispatch(createAction_deleteFromAppBarLinks())
        }
    }




    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ExTime
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
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
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (

                                <MenuItem key={index} onClick={event => {
                                    event.preventDefault()
                                    navigate(page.link)
                                    handleCloseNavMenu()
                                }}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>

                            ))}

                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ExTime
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (

                            <Button
                                key={index}
                                onClick={event => {
                                    event.preventDefault()
                                    navigate(page.link)
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>

                        ))}
                    </Box>
                    <Button color="inherit" onClick={handleLoginLogoutBtnClick}>
                        {userStatus ? 'Logout': 'Login'}
                    </Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBar1;
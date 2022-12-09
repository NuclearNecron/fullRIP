import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {createAction_setAppBarLinks, createAction_setUserStatus} from "../store/actionCreators/AppPageActionCreators";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                ExTime by Коваленко Алексей
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function AuthPage() {

    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)
    const [loading, setLoading] = useState()
    const [ error, setError] = useState()

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setLoading(true);
        fetch(
            'http://localhost:8000/api/token/obtain',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: data.get('username'),
                    password: data.get('password'),
                })
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(({access, refresh}) => {
                localStorage.setItem('accessToken', access)
                setAccess(access)
                localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
                setError(null)
            })
            .catch(error => {
                console.log(error)

                setError('Ошибка, подробности в консоли')
            })
            .finally(setLoading(false))
    }

    const navigate = useNavigate()


    useEffect(() => {
        if (access) {
            fetch(
                'http://localhost:8000/api/user',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        if (response.status === 401) {
                            throw Error('refresh')
                        }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data, is_seller}) => {
                    console.log(is_seller)
                    setError(null)
                    localStorage.setItem('userId', data.id)
                    dispatch(createAction_setUserStatus(true))
                    let base_pages = []
                    if (is_seller.is_seller===1){
                        base_pages = [
                            {
                                title: 'Домашняя страница',
                                link: '/'
                            },
                            {
                                title: 'Корзина',
                                link: '../cart'
                            },
                            {
                                title: 'Мои заказы',
                                link: '../purchases'
                            },
                            {
                                title: 'Мои товары',
                                link: '../sells'
                            }
                        ]
                        dispatch(createAction_setAppBarLinks(base_pages))
                    }
                    else{
                        fetch (`http://localhost:8000/ismod/`,{
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'Authorization': `Bearer ${access}`,
                            },
                        }).then(response=>{
                            console.log(response)
                            return response.json();
                                }).then((ismod)=>{
                                    console.log(ismod)
                                    if(ismod===true){
                                        base_pages = [
                                            {
                                                title: 'Домашняя страница',
                                                link: '/'
                                            },
                                            {
                                                title: 'Корзина',
                                                link: '../cart'
                                            },
                                            {
                                                title: 'Мои заказы',
                                                link: '../purchases'
                                            },
                                            {
                                                title: 'Модерация',
                                                link: '../mod'
                                            }
                                        ]
                                        dispatch(createAction_setAppBarLinks(base_pages))
                                    }
                                    else{
                                        base_pages = [
                                            {
                                                title: 'Домашняя страница',
                                                link: '/'
                                            },
                                            {
                                                title: 'Корзина',
                                                link: '../cart'
                                            },
                                            {
                                                title: 'Мои заказы',
                                                link: '../purchases'
                                            }
                                        ]
                                        dispatch(createAction_setAppBarLinks(base_pages))
                                    }
                        })
                    }

                    navigate('/')
                })
                .catch(error => {
                    console.log(`ОШибка:${error.message}`)
                    if (error.message === 'refresh') {
                        setRefreshRequired(true)
                    } else {
                        console.log(error)
                        setError('Ошибка, подробности в консоли')
                    }
                })
        }
    }, [access])

    useEffect(() => {

        if (refreshRequired) {
            fetch(
                'http://localhost:8000/api/token/refresh',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ refresh })
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({access, refresh}) => {
                    localStorage.setItem('accessToken', access)
                    setAccess(access)
                    localStorage.setItem('refreshToken', refresh)
                    setRefresh(refresh)
                    setError(null)

                })
                .catch(error => {
                    console.log(error)
                    setError('Ошибка, подробности в консоли')
                })
        }
    }, [refreshRequired])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/reg" variant="body2">
                                    {"Нет аккаунта? Зарегестрируйтесь"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
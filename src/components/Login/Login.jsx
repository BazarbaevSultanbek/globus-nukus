import { useState } from 'react';
import axios from 'axios';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import classes from '../style/AuthenticationTitle.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { setCurrentUser } from '../../store/Reducers/Reducer';

const Login = () => {
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://globus-nukus.uz/api/token', {
                phone: phoneNumber,
                password: password,
            });

            const { access, refresh } = response.data.data.token;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            await fetchRequestCurrentUser(access);


            navigate('/');
        } catch (error) {
            showNotification({
                title: 'Login Failed',
                message: error?.response?.data?.errMessage || 'Please check your credentials and try again.',
                color: 'red',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequestCurrentUser = async (access_token) => {
        try {
            const response = await axios.get('https://globus-nukus.uz/api/users/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            dispatch(setCurrentUser(response.data.data.user,));
        } catch (error) {
            showNotification({
                title: 'User Fetch Failed',
                message: 'Unable to fetch current user information. Please try again.',
                color: 'red',
            });
            console.error('Error fetching current user:', error);
            throw error;
        }
    };





    if (loading) {
        return (
            <div className="Loading">
                <Spin spinning={loading} delay={500} />
                <div style={{ marginTop: 16 }}></div>
            </div>
        );
    } else {
        return (
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Welcome back!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button">
                        <Link to='/register' style={{ textDecoration: 'none', color: '#228be6' }}> Create account</Link>
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Phone number"
                        placeholder="Your Phone number..."
                        required
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.currentTarget.value)}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password..."
                        required
                        mt="md"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot Password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
                        Sign in
                    </Button>
                </Paper>
            </Container>
        );
    }
};

export default Login;

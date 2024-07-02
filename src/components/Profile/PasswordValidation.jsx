// Password Validation.jsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, Container, Paper, Title, Text } from '@mantine/core';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { Spin } from 'antd';

function PasswordValidate() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState()
    const location = useLocation();
    const navigate = useNavigate();
    const phoneNumber = location.state.phoneNumber;
    const password = location.state.password
    const [status, setStatus] = useState();
    const [countdown, setCountdown] = useState(60);

    const handleValidate = async () => {
        try {
            const response = await axios.post('https://globus-nukus.uz/api/users/password-change/verify', {
                phone: phoneNumber,
                otp: code,
            });
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            console.error('Error response data:', error.response?.data);

            showNotification({
                title: 'Error',
                message: error.response?.data?.errMessage || 'Invalid OTP or other error',
                color: 'red',
            });
        }
    };

    useEffect(() => {
        let interval;
        if (countdown > 0) {
            setStatus(false)
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
                console.log(countdown);
            }, 1000);
        } else if (countdown === 0) {
            setStatus(true);

        }
        return () => clearInterval(interval);
    }, [countdown]);


 ccz



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
                <Title ta="center">Validation</Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Please enter the validation code sent to your phone.
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Validation Code"
                        placeholder="Enter the code"
                        required
                        value={code}
                        onChange={(event) => setCode(event.currentTarget.value)}
                    />
                    <Button fullWidth mt="xl" onClick={handleValidate}>
                        Validate
                    </Button>
                    {
                        !status ? <Button fullWidth mt="xl" variant="outline" color="rgba(33, 107, 255, 1)" disabled>{`Resend code after 00:${countdown}`}</Button>
                            : <Button fullWidth mt="xl" variant="outline" color="rgba(33, 107, 255, 1)" onClick={handleResendCode}>Resend code</Button>}
                </Paper>
            </Container>
        );
    }
}

export default PasswordValidate;

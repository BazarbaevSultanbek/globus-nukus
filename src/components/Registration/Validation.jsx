// Validation.jsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, Container, Paper, Title, Text } from '@mantine/core';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Validation() {
    const [code, setCode] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const phoneNumber = location.state.phoneNumber;
    const [status, setStatus] = useState();
    const [countdown, setCountdown] = useState(60);

    const handleValidate = async () => {
        try {
            const response = await axios.post('https://globus-nukus.uz/api/users/verify', {
                phone: phoneNumber,
                otp: code,
            });
            console.log(response);
            navigate('/Login');
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: 'Invalid OTP or other error',
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




    const handleResendCode = async () => {
        try {
            const response = await axios.post('https://globus-nukus.uz/api/users/resend-otp', {
                phone: phoneNumber,
            });
            console.log(response);
            setResendMessage('A new code has been sent to your phone.');
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Failed to resend the code. Please try again later.',
                color: 'red',
            });
        }
    };

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
                {resendMessage && (
                    <Text color="green" size="sm" ta="center" mt={5}>
                        {resendMessage}
                    </Text>
                )}
                {code.length > 0 ? <Button fullWidth mt="xl" onClick={handleValidate}>
                    Validate</Button> : <Button fullWidth mt="xl" disabled>
                    Validate</Button>
                }
                {
                    !status ? <Button fullWidth mt="xl" variant="outline" color="rgba(33, 107, 255, 1)" disabled>{`Resend code after 00:${countdown}`}</Button>
                        : <Button fullWidth mt="xl" variant="outline" color="rgba(33, 107, 255, 1)" onClick={handleResendCode}>Resend code</Button>}
            </Paper>
        </Container >
    );
}

export default Validation;

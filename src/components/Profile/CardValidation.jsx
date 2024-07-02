// CardValidation.jsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, Container, Paper, Title, Text } from '@mantine/core';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

function CardValidation() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const [countdown, setCountdown] = useState(60);
    const [resendMessage, setResendMessage] = useState('');
    const location = useLocation();


    const token = location.state.token;
    const cardNumber = location.state.card_number
    const date = location.state.expire

    const handleValidate = async () => {
        try {
            const response = await axios.post('https://globus-nukus.uz/api/cards/verify_card', {
                token: token,
                code: code,
            });
            let tokens = JSON.parse(localStorage.getItem('card_tokens')) || [];
            tokens.push(token);
            localStorage.setItem('card_tokens', JSON.stringify(tokens));

            showNotification({
                title: "Card has successfully added",
                color: 'green',
            })
            navigate('/MyCard');
        } catch (error) {
            console.error(error);
            showNotification({
                title: 'Error',
                message: error?.data?.message || 'Invalid OTP or other error',
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
        setLoading(true)
        try {
            await axios.post('https://globus-nukus.uz/api/cards/create_card', {
                card_number: cardNumber,
                expire: date,
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error',
                message: error?.response?.data?.errMessage || 'Failed to resend code. Please try again.',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    }

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

export default CardValidation;

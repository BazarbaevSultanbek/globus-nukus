import React, { useState } from 'react';
import { TextInput, Button, PasswordInput, Container, Title, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import classes from '../style/AuthenticationTitle.module.css';
import { useNavigate } from 'react-router';

function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            phoneNumber: (value) => /^\d{12}$/.test(value) ? null : 'Phone number must be a 12-digit number',
            password: (value) => (value.length >= 8 ? null : 'Password must be at least 8 characters'),
            confirmPassword: (value, values) => value !== values.password ? 'Passwords do not match' : null,
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await axios.post('https://globus-nukus.uz/api/users/password-change', {
                phone: values.phoneNumber,
                password: values.password,
                password2: values.confirmPassword,
            });
            navigate('/PasswordValidate', { state: { phoneNumber: values.phoneNumber, password: values.password } });
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Failed to reset password. Please try again.',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Change Password
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Phone Number"
                        placeholder="Phone Number..."
                        {...form.getInputProps('phoneNumber')}
                        required
                    />
                    <PasswordInput
                        label="New Password"
                        placeholder="Your new password"
                        mt="md"
                        {...form.getInputProps('password')}
                        required
                    />
                    <PasswordInput
                        label="Confirm New Password"
                        placeholder="Confirm your new password"
                        mt="md"
                        {...form.getInputProps('confirmPassword')}
                        required
                    />
                    <Button type="submit" fullWidth mt="xl" loading={loading}>
                        Change Password
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default ChangePassword;

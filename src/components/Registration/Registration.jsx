// Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePickerInput } from '@mantine/dates';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Radio,
    Group,
} from '@mantine/core';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import classes from '../style/AuthenticationTitle.module.css';
import axios from 'axios';

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(null);
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    const fetchRequestForRegistration = async (data) => {
        try {
            const response = await axios.post('https://globus-nukus.uz/api/users', data);
            console.log(response);
            navigate('/validation', { state: { phoneNumber: phoneNumber } });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignUp = () => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        const data = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            phone: phoneNumber,
            date_of_birth: formattedDate,
            gender: gender,
        };

        fetchRequestForRegistration(data);
    };

    const validatePhoneNumber = (phone) => {
        const regex = /^998\d{9}$/;
        if (!regex.test(phone)) {
            setPhoneError('Phone number must start with 998 and be 12 digits long');
        } else {
            setPhoneError('');
        }
    }; 7

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome Join Us!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component="button">
                    Sign in
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.currentTarget.value)}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    mt="md"
                    value={lastName}
                    onChange={(event) => setLastName(event.currentTarget.value)}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />

                <DatePickerInput
                    label="Date of Birth"
                    placeholder="Select date"
                    required
                    value={date}
                    onChange={setDate}
                    mt="md"
                />
                <Radio.Group
                    name="favoriteFramework"
                    label="Gender"
                    withAsterisk
                >
                    <Group mt="xs">
                        <Radio value="male" label="Male" onChange={() => setGender('male')} />
                        <Radio value="female" label="Female" onChange={() => setGender('female')} />
                    </Group>
                </Radio.Group>
                <TextInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    required
                    mt="md"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.currentTarget.value)}
                    onBlur={(event) => validatePhoneNumber(event.currentTarget.value)}
                    error={phoneError}
                />
                <Button fullWidth mt="xl" onClick={handleSignUp} disabled={phoneError !== ''}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}

export default Registration;

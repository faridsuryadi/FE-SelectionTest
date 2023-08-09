import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Checkbox, Center, Heading, useToast } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateInfoSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Z])/, 'At least 1 capital')
        .matches(/^(?=.*(\W|_))/, 'At least 1 symbol')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    birthDate: Yup.date().required('Required'),
});

export const UpdateInformationForm = () => {
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const toast = useToast()
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const backgroundStyle = {
        background: '#1A365D',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/employee', values, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(response);
        } catch (error) {
            console.error(error);
            setErrors({ server: 'An error occurred. Please try again later.' });
            toast({
                title: "Failed Updating Information",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Center p={[2, 4, 6]} width={['100%', '100%', '100%']} style={backgroundStyle}>
            <Box>
                <Heading
                    textAlign={['center', 'center', 'left']}
                    fontSize={['xl', '2xl', '3xl']}
                    mb={4}
                    color={"orange.400"}
                >
                    Personal Information
                </Heading>

                <Formik
                    initialValues={{
                        fullName: '',
                        password: '',
                        confirmPassword: '',
                        birthDate: '',
                    }}
                    validationSchema={UpdateInfoSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>

                            <Field name="fullName">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.fullName && form.touched.fullName}>
                                        <FormLabel htmlFor="fullName" color="white">Full Name</FormLabel>
                                        <Input {...field} id="fullName" placeholder="Full Name" color={'white'} />
                                        <ErrorMessage name="fullName" component="div" style={{ color: "red" }} />
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="birthDate">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.birthDate && form.touched.birthDate}>
                                        <FormLabel htmlFor="birthDate" color="white">Birth Date</FormLabel>
                                        <Input {...field} type="date" id="birthDate" color={'white'} />
                                        <ErrorMessage name="birthDate" component="div" style={{ color: "red" }} />
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="password">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel htmlFor="password" color="white">Password</FormLabel>
                                        <Input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            placeholder="Password"
                                            color={'white'}
                                        />
                                        <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="confirmPassword">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                        <FormLabel htmlFor="confirmPassword" color="white">Confirm Password</FormLabel>
                                        <Input {...field} type="password" id="confirmPassword" placeholder="Confirm Password" color={'white'} />
                                        <ErrorMessage name="confirmPassword" component="div" style={{ color: "red" }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Box>

                                <Checkbox onChange={handleShowPassword} mt={2} color='white'>
                                    Show Password
                                </Checkbox>
                            </Box>

                            <Button mt={4} color="orange.400" fontWeight={'bold'} bg={'transparent'} isLoading={isSubmitting} type="submit">
                                Update Information
                            </Button>

                            <ErrorMessage name="server">
                                {(msg) => (
                                    <Alert status="error" mt={4}>
                                        <AlertIcon />
                                        {msg}
                                    </Alert>
                                )}
                            </ErrorMessage>

                        </Form>
                    )}
                </Formik>
            </Box>
        </Center>
    );
};

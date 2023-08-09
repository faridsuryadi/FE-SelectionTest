import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
  Alert,
  AlertIcon,
  Select,
  FormLabel,
} from '@chakra-ui/react';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

export const EmployeeModal = ({ isOpen, onClose }) => {
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [role,setRole] = useState([])

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  RoleId: Yup.string().required("Please select a role")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      RoleId:''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.email.trim() === '') {
          return;
        }

        const response = await Axios.post('http://localhost:8000/api/users', { email: values.email, RoleId: values.RoleId});
        console.log(response.data);
        setIsEmailExist(response.data.status === false);
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
  });
  const getRoles = async () => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/salaries`);
      setRole(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent bg={'blue.900'}>
        <ModalHeader color={"orange.400"}>Add Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          {isEmailExist && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              Email has already been used.
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <FormLabel color={"orange.400"} fontWeight={"bold"}>
              Email
            </FormLabel>
            <Input
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Text color="red">{formik.errors.email}</Text>
            ) : null}
              <FormLabel color={"orange.400"} fontWeight={"bold"} mt={2}>
              Role
            </FormLabel>
            <Input as={Select} 
            name="RoleId"
            placeholder="Select role" 
            value={formik.values.RoleId}
            onChange={formik.handleChange}
            isInvalid={formik.touched.RoleId && formik.errors.RoleId}>
                  {role.map((role) => (
                    <option key={role.id} value={role.id} >{role.role}</option>
                  ))}
                </Input>
                {formik.touched.RoleId && formik.errors.RoleId ? (
              <Text color="red">{formik.errors.RoleId}</Text>
            ) : null}
    
          </form>
        </ModalBody>

        <ModalFooter>
          <Button color="blue.900"  mr={3} onClick={formik.handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose} bg={"orange.400"} color={'blue.900'}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

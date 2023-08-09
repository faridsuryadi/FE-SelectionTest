import React, { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import {EmployeeModal} from '../../components/admin/sendEmail';
import { Navigate, useNavigate } from 'react-router-dom';
import { Clock } from '../../components/clock';
import { EmployeeTable } from '../../components/admin/employeeTable';
import { useSelector } from 'react-redux';

export const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token")
  const data = useSelector((state)=>state.user.value)
  const navigate = useNavigate()
  console.log(data);


  return data.isAdmin? (
    <Box bg={"blue.900"} minH={"100vh"}>
      <Flex justifyContent={"end"} mr={15}>
      <Button bg="orange.400" color={"blue.900"} onClick={() => setIsModalOpen(true)} >
        Add Employee
      </Button>
      </Flex>
      <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EmployeeTable/>
    </Box>
  ):(navigate('/login'))
}
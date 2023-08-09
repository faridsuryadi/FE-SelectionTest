import React, { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import {EmployeeModal} from '../components/admin/sendEmail';
import { Navigate } from 'react-router-dom';
import { AbsenHistory } from '../components/absenHistory';

export const AbsenReport = () => {
  const token = localStorage.getItem("token")

  return token? (
    <Box bg={"blue.900"} minH={"100vh"}>
      <AbsenHistory/>
    </Box>
  ):(<Navigate to="/login"/>)
}
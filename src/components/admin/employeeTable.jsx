import { Avatar, Box, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import Axios from "axios";
import {FcBusinessman } from 'react-icons/fc';

import { useEffect, useState } from "react";

export const EmployeeTable = () => {
  const [employee, setEmployee] = useState([]);
  
  const getEmployee = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/users/employee');
      setEmployee(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(employee);
  
  useEffect(() => {
    getEmployee();
  }, []);
  console.log(employee);
  
  return (
    <Box width="90%" mx={"auto"}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th color={"white"}>Name</Th>
              <Th color={"white"}>Role</Th>
              <Th color={"white"}>Birthdate</Th>
              <Th color={"white"}>Salary</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employee?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Flex alignItems="center">
                    <Icon as={FcBusinessman} boxSize={"30px"}/>
                    <Box ml="10px">
                      <Text fontWeight="bold" fontSize="14px" color="white">
                        {item.fullName}
                      </Text>
                      <Text fontSize="14px" color="white">
                        {item.email}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Text color="white">{item.Role?.role}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.birthDate}</Text>
                </Td>
                <Td color="white">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.Role?.salary*20)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

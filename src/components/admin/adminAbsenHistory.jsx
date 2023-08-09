import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Clock } from "../clock";
export const AdminAbsenHistory = () => {
    const [absen, setAbsen] = useState([]);
  const token = localStorage.getItem("token")
  const data = useSelector((state)=>state.user.value)
  const navigate = useNavigate()

  const getAbsen = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/absen/admin-history',
      {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response);
      setAbsen(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(absen);
  
  useEffect(() => {
    getAbsen();
  }, []);
    return  (
        <Box minH={"100vh"} bg={"blue.900"}>
        <Box textAlign={"center"} width="90%" mx={"auto"}>
            <Text mt={5}  color={"orange.400"} fontWeight={"bold"}  fontFamily={"Verdana"} fontSize={"60px"}>
                ATTENDANCE LOG
            </Text>
            <Clock/>
            <TableContainer>
  <Table alignContent={"center"}>
    <Tbody>
      <Tr>
        <Th color={"white"} fontWeight={"bold"}>
          Date
        </Th>
        <Th color={"white"} fontWeight={"bold"}>
          Employee
        </Th>
        <Th color={"white"} fontWeight={"bold"}>
          Clock-In
        </Th>
        <Th color={"white"} fontWeight={"bold"}>
          Clock-Out
        </Th>
      </Tr>
      {absen?.map((item) => (
        <Tr key={item.id}>
          <Td mx={"auto"} color={"white"}>
            {item.date}
          </Td>
          <Td mx={"auto"} color={"white"}>
            {item.User.fullName}
          </Td>
          <Td mx={"auto"} color={"white"}>
            {item.clock_in?.substring(11, 19)}
          </Td>
          <Td color={"white"}>
            {item.clock_out?.substring(11, 19)}
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</TableContainer>
        </Box>
                        </Box>
    )
}
import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
export const AbsenHistory = () => {
    const [absen, setAbsen] = useState([]);
  const token = localStorage.getItem("token")
  
  const getAbsen = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/absen/history',
      {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response);
      setAbsen(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(token);
  
  useEffect(() => {
    getAbsen();
  }, []);
    return (
        <Box textAlign={"center"} width="90%" mx={"auto"}>
            <Text mt={5}  color={"orange.400"} fontWeight={"bold"} mb={5} fontFamily={"Verdana"} fontSize={"60px"}>
                ATTENDANCE LOG
            </Text>
            <TableContainer>
                <Table alignContent={"center"}>
                    <Tr>
                        <Th color={"white"} fontWeight={"bold"}>
                            Date
                        </Th>
                        <Th color={"white"} fontWeight={"bold"}>
                            Clock-In
                        </Th>
                        <Th color={"white"} fontWeight={"bold"}>
                            Clock-Out
                        </Th>
                    </Tr>
                        {absen?.map((item)=>(
                    <Tbody>
                        <Td mx={"auto"} color={"white"}>
                            {item.date}
                        </Td>
                            <Td mx={"auto"} color={"white"}>
                            {item.clock_in?.substring(11, 19)}
                        </Td>
                        <Td color={"white"}>
                        {item.clock_out?.substring(11, 19)}
                        </Td>
                    </Tbody>
                            ))}
                </Table>
            </TableContainer>
        </Box>
    )
}
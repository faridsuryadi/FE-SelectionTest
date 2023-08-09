import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
export const AbsenTable = () => {
    const [absen, setAbsen] = useState([]);
  const token = localStorage.getItem("token")
  
  const getAbsen = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/absen',
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
        <Box textAlign={"center"}>
            <Text mt={5} fontSize={"20px"} color={"white"} fontWeight={"bold"} >
                Attendance Log
            </Text>
            <TableContainer>
                <Table alignContent={"center"}>
                    <Tr>
                        <Th color={"white"} mx={"auto"} fontWeight={"bold"}>
                            Clock-In
                        </Th>
                        <Th color={"white"} fontWeight={"bold"}>
                            Clock-Out
                        </Th>
                    </Tr>
                        {absen?.map((item)=>(
                    <Tbody>
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
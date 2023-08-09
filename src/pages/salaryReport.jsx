import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";

export const DailySalary = () => {
  const [absen, setAbsen] = useState([]);
  const token = localStorage.getItem("token");

  const getAbsen = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/salaries/salary', {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response);
      setAbsen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(token);

  useEffect(() => {
    getAbsen();
  }, []);

  const monthlyData = {};
  const yearlyData = {};

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  absen.forEach(item => {
    const date = new Date(item.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthlySalary = item.dailySalary; 

    if (!monthlyData[year]) {
      monthlyData[year] = {};
    }

    if (!yearlyData[year]) {
      yearlyData[year] = 0;
    }

    if (!monthlyData[year][month]) {
      monthlyData[year][month] = 0;
    }

    monthlyData[year][month] += monthlySalary;
    yearlyData[year] += monthlySalary;
  });

  return (
    <Box bg={"blue.900"} minH={"100vh"}>
      <Box textAlign={"center"} width="90%" mx={"auto"}>
        <Text mt={5} color={"orange.400"} fontWeight={"bold"} mb={5} fontFamily={"Verdana"} fontSize={"60px"}>
          SALARY LOG
        </Text>
        <TableContainer>
          <Table alignContent={"center"}>
            <Tr>
              <Th color={"white"} fontWeight={"bold"}>
                Date
              </Th>
              <Th color={"white"} fontWeight={"bold"}>
                Daily Paycheck (IDR)
              </Th>
            </Tr>
            {absen?.map((item) => (
              <Tbody key={item.date}>
                <Td mx={"auto"} color={"white"}>
                  {item.date}
                </Td>
                <Td mx={"auto"} color={"white"}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.dailySalary)}
                </Td>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
        <Box mt={5}>
          <Text color={"orange.400"} fontWeight={"bold"} fontSize={"24px"}>
            Monthly Report
          </Text>
          {Object.keys(monthlyData).map((year) => (
            <Box key={year}>
              <Text color={"white"} fontWeight={"bold"} fontSize={"18px"} mt={2}>
                {year}
              </Text>
              {Object.keys(monthlyData[year]).map((month) => (
                <Text key={`${year}-${month}`} color={"white"} fontSize={"16px"}>
                  {monthNames[month]} - {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(monthlyData[year][month])}
                </Text>
              ))}
            </Box>
          ))}
          <Text color={"orange.400"} fontWeight={"bold"} fontSize={"24px"} mt={5}>
            Yearly Report
          </Text>
          {Object.keys(yearlyData).map((year) => (
            <Text key={year} color={"white"} fontSize={"16px"}>
              {year} - {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(yearlyData[year])}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

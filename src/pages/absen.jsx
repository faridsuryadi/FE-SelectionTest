import { Navigate } from "react-router-dom"
import { Clock } from "../components/clock"
import { useSelector } from "react-redux"
import { Box, Button, Center, Flex, HStack, Heading, Text, Textarea } from "@chakra-ui/react"
import { ClockIn } from "../components/clockin"
import { ClockOut } from "../components/clockout"
import { Footer } from "../components/footer"
import { AbsenTable } from "../components/absenLog"

export const Absen = () => {
    const token = localStorage.getItem("token")
    const data = useSelector((state)=>state.user.value)

    return token && !data.isAdmin?(
        <Box bg={'blue.900'} minH={"100vh"}>
            <Text mt={2} textAlign={"center"}color={"orange.400"} fontFamily={"Verdana"} fontWeight={"bold"} fontSize={"60px"}>
                KOMPENI
            </Text>
    <Text textAlign={"center"}color={"white"} fontFamily={"Verdana"} fontWeight={"bold"} fontSize={"20px"}>
        Hi {data?.fullName} !
    </Text>
    <Clock/>
    <Center>
    <Box w={"400px"}>
    <Text mt={2} textAlign={"center"}color={"orange.400"} fontFamily={"Verdana"} fontWeight={"bold"} fontSize={"15px"}>
                Shift
            </Text>
    <Text textAlign={"center"}color={"orange.400"} fontFamily={"Verdana"} fontWeight={"bold"} fontSize={"15px"}>
                09:00 - 16:30
            </Text>
    <Textarea placeholder="note"/>
    <Center mt={5} gap={3} >
        <ClockIn></ClockIn>
        <ClockOut></ClockOut>
    </Center>
    <AbsenTable/>
    </Box>
    </Center>
        </Box>
    
    ):(<Navigate to="/login"/>)
}
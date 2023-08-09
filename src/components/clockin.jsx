import { Button, useToast } from "@chakra-ui/react"
import Axios  from "axios";

export const ClockIn = () => {

const token = localStorage.getItem('token')
const toast = useToast()
    const handleClockin = async() => {
        try {
            const response = await Axios.post("http://localhost:8000/api/absen/clockin",{},{
                headers: { authorization: `Bearer ${token}` },
              })
              window.location.reload()

        } catch (error) {
            toast({
                title: "Failed Clock-In",
                description : "Can't Clock-In Twice",
                status:"error",
                isClosable:true,
                position:"top"
            })
            console.log(error);
        }
    }
    return(
        <Button flex={1} bg={"white"} color={"blue.900"} onClick={handleClockin}>
        Clock-In
    </Button>
        )
}
import { Button, Toast, useToast } from "@chakra-ui/react"
import  Axios  from "axios"

export const ClockOut = () => {
    const token = localStorage.getItem('token')
    const toast = useToast()
    const handleClockout = async() => {
        try {
            const response = await Axios.post("http://localhost:8000/api/absen/clockout",{},{
                headers: { authorization: `Bearer ${token}` },
              })
              window.location.reload()
        } catch (error) {
            toast({
                title: "Failed Clock-Out",
                description : "Can't Clock-Out Twice",
                status:"error",
                isClosable:true,
                position:"top"
            })
            console.log(error);
        }
    }
    return(
    <Button flex={1} bg={"orange.400"} color={"blue.900"} onClick={handleClockout}>
        Clock-Out
    </Button>
    )
}
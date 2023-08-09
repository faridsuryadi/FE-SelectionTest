import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formattedTime = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  
    return (
      <Box textAlign="center">
        
        <Text fontSize="6xl" color={"white"}>{formattedTime}</Text>
      </Box>
    );
  };

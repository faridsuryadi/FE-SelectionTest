import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    InputGroup,
    InputRightElement,
    Center,
    IconButton,
    HStack,
    useToast
  } from '@chakra-ui/react';
  import { AtSignIcon, EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Form, Formik, Field, ErrorMessage} from "formik"
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../redux/userSlice';
  
  export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.user.value)
    const toast  = useToast()


    const LoginSchema = Yup.object().shape({ 
      email: Yup.string()
          .email("Invalid email address")
          .required("Email required"),
  
      password : Yup.string()
      .min(8, "Minimum 8 character")
      .matches(/^(?=.*[A-Z])/, "Atleast 1 capital")
      .matches(/^(?=.*(\W|_))/, "Atleast 1 symbol")
      .required("Password required"),
      })
   
      const handleSubmit = async (values) => {
        try {
          const response = await Axios.post("http://localhost:8000/api/users/login", values);
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log(response);
          dispatch(setValue(response.data.ceklogin));
      
          if (response.data.ceklogin.isAdmin) {
            navigate("/admin"); 
          } else {
            navigate("/"); 
          }
        } catch (error) {
          toast({
            title: "Failed Login",
            description : error.response.data.message,
            status:"error",
            duration:3000,
            isClosable:true,
            position:"top"
        })
          console.error(error);
        }
      };
      
    return(
        <Center>
          <Formik
        onSubmit={(values) => {
          handleSubmit(values);
        
        }}
        initialValues={{email:'',password:'' }}
        validationSchema={LoginSchema}
        >

        <Flex
        h={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'blue.900'}
        w={"100%"}>

        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={"center"} color={"orange.400"}>Login to your account</Heading>
          </Stack>
          <Box 
            as={Form}
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>
              <FormControl id="email" >
                <FormLabel >Email Address</FormLabel>
                <Input as={Field} type="email" name="email" />
                <ErrorMessage
                            component="div"
                            name="email"
                            style={{color:"red"}}/>
              </FormControl>

              <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input as={Field} type={showPassword ? 'text' : 'password'} name="password"/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <ErrorMessage
                            component="div"
                            name="password"
                            style={{color:"red"}}/>
            </FormControl>

              <Stack spacing={10}>
               

                <Button
                  type='submit'
                  bg={'blue.700'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.400',
                  }}>
                  Sign in
                </Button>
                
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
                    </Formik>
                    </Center>
    )
}
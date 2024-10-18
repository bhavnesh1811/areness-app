import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  Flex,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create motion components for animations
const MotionFlex = motion(Flex);
const MotionStack = motion(Stack);
const MotionImage = motion(Image);

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const nav = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      nav("/");
    }
  }, [token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Alphanumeric and underscore, min 3 characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    setError(""); // Reset error message

    // Validate username and password
    if (!usernameRegex.test(username)) {
      setError(
        "Username must be at least 3 characters and can only contain letters, numbers, and underscores."
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/users/register`,
        {
          firstname,
          lastname,
          username,
          email,
          password,
        }
      );

      // Display success message
      toast({
        title: "Registration Successful",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear input fields
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");
      nav("/login");
    } catch (error) {
      // Handle registration error
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <MotionFlex
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      position="relative"
      backgroundImage={
        "600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JMcw1r2Q4XMUmPVN7BMkpYBcvW9a182joUhR7-ChMqYiRWhlRlGFW3lVR~Ovb8fIs0ir0IhPuB4WrosmDNpPF~duv6eF7UXt2TtR-NHQS7Tv26cVHuuCXexxnBXkNAG-G5dHUQoDyehGo1GV~ug-sX~uAcak0Y9qvIZAHodhYp4KdsF53sUfGqsnYJq3sMsyft0JAtTm3Zinjf8dCmglGCy"
      }
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <MotionStack
        spacing={4}
        w={"full"}
        maxW={"md"}
        margin={"auto"}
        padding={8}
        bg="rgba(255, 255, 255, 0.8)" // White background with some transparency
        borderRadius="md"
        boxShadow="lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading fontSize={"2xl"} textAlign={"center"}>
          Create an Account
        </Heading>
        <form onSubmit={handleRegister}>
          <FormControl id="firstname" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastname" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
          <FormControl id="username" isRequired isInvalid={!!error}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6} marginTop={4}>
            <Button colorScheme={"blue"} variant={"solid"} type="submit">
              Register
            </Button>
          </Stack>
        </form>
        <Text textAlign={"center"}>
          Already have an account? <a href="/login">Login</a>
        </Text>
      </MotionStack>
      <MotionFlex
        flex={1}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <MotionImage
          alt={"Register Image"}
          objectFit={"cover"}
          src={
            "https://s3-alpha-sig.figma.com/img/6d08/add4/e1ff0f0155d84c990839d2578e5bc3bb?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=imcP9IZBqz57yNU2yRXzoyoWH6XIc28kW9IchyQYolwQbFFRhS9Hv9kBjwabY2k3tSRhGmTEmYBdXW55RpwEJ4l2WtWkIccJNHh7t-kenFXUzCYMU6LCwjnZk9hgAsHyJvbOefBmIBIH4lq4NF1pBiEM475Tudo6UwBIcD-BHGIo-~1l-evx01ak10Ty627jrPOzxhHXAbxjD0p~U~vqzDZBZa1-yxq25hu2MpYWeSQ8y~uSgSSl1M7BE8q5AA9VKb6YKyk-nOG1k2unHcrB4kG1eQ8~Ogu2Qg2rifAFPBtWdjegS0ibmAKYj2eAfPO7TdFRezlJkOPznJ03ftYYOg__"
          }
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </MotionFlex>
    </MotionFlex>
  );
};

export default Register;

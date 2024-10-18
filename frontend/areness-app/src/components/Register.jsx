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
  Box,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Motion Components
const MotionFlex = motion.create(Flex);
const MotionStack = motion.create(Stack);
const MotionImage = motion.create(Image);

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      nav("/");
    }
  }, [token, nav]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    setError("");

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

    if (password !== confirmPassword) {
      setError("Password and confirm password did not match.");
      return;
    }

    if (!isChecked) {
      return toast({
        title: "Terms and Conditions",
        description: "You must agree to the terms and conditions.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
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

      toast({
        title: "Registration Successful",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");
      nav("/login");
    } catch (error) {
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
      justifyContent="center"
      alignItems="center"
      backgroundColor="#FF7373"
      backgroundImage={`url("https://s3-alpha-sig.figma.com/img/598b/e375/6c1c4a778dc678d9b5c27f1c8875582d?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JMcw1r2Q4XMUmPVN7BMkpYBcvW9a182joUhR7-ChMqYiRWhlRlGFW3lVR~Ovb8fIs0ir0IhPuB4WrosmDNpPF~duv6eF7UXt2TtR-NHQS7Tv26cVHuuCXexxnBXkNAG-G5dHUQoDyehGo1GV~ug-sX~uAcak0Y9qvIZAHodhYp4KdsF53sUfGqsnYJq3sMsyft0JAtTm3Zinjf8dCmglGCy1r~rRNtpdx8-o~TIP~EJ2ry2PELHv6w~Do3hX1e6PuuyqaI8Mry-r1tcwUrd4IeRrqsrUHeKp-DsAgZfH2oFaIlLUcIiCipwtySLzlNGkb9ZD~AfpciC4HjDoHdMFgg__")`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundBlendMode={"multiply"}
    >
      {/* Container Flex */}
      <MotionFlex
        direction={{ base: "column", md: "row" }} // Stack vertically on small screens, side by side on larger screens
        maxW={"5xl"}
        w={"full"}
        bg="white"
        borderRadius="lg"
        boxShadow="2xl"
        overflow="hidden"
      >
        {/* Left Image Section */}
        <Flex flex={1} display={{ base: "none", md: "flex" }}>
          <MotionImage
            alt={"Register Image"}
            objectFit={"cover"}
            maxW={"100%"}
            marginTop={{ base: "20px", md: "80px" }}
            src={
              "https://s3-alpha-sig.figma.com/img/6d08/add4/e1ff0f0155d84c990839d2578e5bc3bb?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=imcP9IZBqz57yNU2yRXzoyoWH6XIc28kW9IchyQYolwQbFFRhS9Hv9kBjwabY2k3tSRhGmTEmYBdXW55RpwEJ4l2WtWkIccJNHh7t-kenFXUzCYMU6LCwjnZk9hgAsHyJvbOefBmIBIH4lq4NF1pBiEM475Tudo6UwBIcD-BHGIo-~1l-evx01ak10Ty627jrPOzxhHXAbxjD0p~U~vqzDZBZa1-yxq25hu2MpYWeSQ8y~uSgSSl1M7BE8q5AA9VKb6YKyk-nOG1k2unHcrB4kG1eQ8~Ogu2Qg2rifAFPBtWdjegS0ibmAKYj2eAfPO7TdFRezlJkOPznJ03ftYYOg__"
            }
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </Flex>

        {/* Right Form Section */}
        <MotionStack
          spacing={4}
          w={"full"}
          maxW={"md"}
          margin={"auto"}
          padding={8}
          flex={1}
        >
          <Heading fontSize={"2xl"} textAlign={"center"} mb={4}>
            Sign Up
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

            <FormControl id="confirmPassword" isRequired isInvalid={!!error}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>

            <Flex alignItems="center" gap={2}>
              <Checkbox onChange={handleCheckboxChange}>
                I agree to all terms
              </Checkbox>
            </Flex>

            <Stack spacing={6} marginTop={4}>
              <Button
                w={{ base: "full", md: "30%" }}
                color={"#FFFFFF"}
                background={"#FF9090"}
                variant={"solid"}
                type="submit"
              >
                Register
              </Button>
            </Stack>
          </form>
          <Text textAlign={"left"} fontSize={"sm"}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Sign In
            </Link>
          </Text>
        </MotionStack>
      </MotionFlex>
    </MotionFlex>
  );
};

export default Register;

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiFacebook, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

// Create motion components for animations
const MotionFlex = motion.create(Flex);
const MotionStack = motion.create(Stack);
const MotionImage = motion.create(Image);

export default function Login() {
  // State for form fields and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const nav = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      nav("/");
    }
  }, [token]);

  // Regular expressions for validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Alphanumeric and underscore, min 3 characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter and one number

  const handleSubmit = (e) => {
    e.preventDefault();
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

    const data = {
      username,
      password,
    };

    const login = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/users/login`,
        data
      );
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        window.location.href = "/";
      }
    };
    login();
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
      <MotionFlex
        direction={{ base: "column", md: "row" }} // Stack vertically on small screens, side by side on larger screens
        maxW={"5xl"}
        w={"full"}
        bg="white"
        borderRadius="lg"
        boxShadow="2xl"
        overflow="hidden"
      >
        <MotionStack
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="username" isInvalid={!!error}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!error}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.500"}>Forgot password?</Text>
                </Stack>
                <Button colorScheme={"blue"} variant={"solid"} type="submit">
                  Sign in
                </Button>
              </Stack>
            </form>

            <Flex
              margin={"auto"}
              justifyItems={"center"}
              alignItems={"center"}
              gap={"4px"}
            >
              <Text mr={2}>Or login with</Text>
              <FiFacebook />
              <FaGoogle />
              <FiX />
            </Flex>

            <Text mr={4}>
              Dont have account?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Create One
              </Link>
            </Text>
          </Stack>
        </MotionStack>

        {/* Image Section */}
        <Flex flex={1} display={{ base: "none", md: "flex" }}>
          <MotionImage
            alt={"Register Image"}
            objectFit={"cover"}
            maxW={"100%"}
            marginTop={{ base: "20px", md: "80px" }}
            src={
              "https://s3-alpha-sig.figma.com/img/aebf/3f1c/e468166d30a3ba064e731222dc4e66ae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bQBq4HHCEnjVt7S5KFC54t8NvG3wpIvxmmdguVZhPXFmVUetFOIdsMhz6JnlrWw2CrYvNVyS7XShLnWeOeqw1ce6bZSwP~plgBAeE1boRp6Mzu2T9Z-axzIQpcAp2cmZzF6cmClkUPaT-xDmrLDcpDDhEzHmHYxYlOrft1gP2Xs3U2fCl5wxCduPixU31JyeYO19e54v881RkogZ9QBIoWua2YlengbhMYUG6PeX~XGhcO7usYD8ETvk2UL6LPm8iC~A~0rWaySztX5mLARI5xV8hf01VSPfMKMbqdDD6ljF0gmN6CT2D~Bg2HeDwLVPr9T~6uV~MNGbDCQ76OToog__"
            }
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </Flex>
      </MotionFlex>
    </MotionFlex>
  );
}

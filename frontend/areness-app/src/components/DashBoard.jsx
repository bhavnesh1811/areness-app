import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import axios from "axios";

const DashBoard = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token") || "";

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/users/getUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header correctly
          },
        }
      );
      console.log(res.data); // Log the response data
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar />

      <Flex background={"F5F8FF"}>
        <Sidebar />
        <Box>
          <Flex>Welcome Back, {user?.username}</Flex>
        </Box>
      </Flex>
    </>
  );
};

export default DashBoard;

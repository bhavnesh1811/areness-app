import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  Flex,
  Box,
  Grid,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Text,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import axios from "axios";

// Dummy tasks data
const dummyTasks = [
  {
    id: 1,
    title: "Attend Nischal's Birthday Party",
    description: "Buy gifts on the way and pick up Nischal at 6 PM.",
    status: "In Progress",
    image: "https://via.placeholder.com/50",
    date: "20 June",
    time: "5:00 PM",
  },
  {
    id: 2,
    title: "Landing Page Design for TravelDays",
    description: "Get work done by EOD and discuss with client before leaving.",
    status: "In Progress",
    image: "https://via.placeholder.com/50",
    date: "20 June",
    time: "4:00 PM",
  },
  {
    id: 3,
    title: "Presentation on Final Product",
    description:
      "Make sure everything is functioning well. Present the final product to the team.",
    status: "Not Started",
    image: "https://via.placeholder.com/50",
    date: "21 June",
    time: "10:00 AM",
  },
  {
    id: 4,
    title: "Walk the Dog",
    description: "Take the dog to the park and bring treats for her.",
    status: "Completed",
    image: "https://via.placeholder.com/50",
    date: "19 June",
    time: "7:00 AM",
  },
  {
    id: 5,
    title: "Conduct Meeting",
    description: "Conduct a team meeting and finalize requirements.",
    status: "Completed",
    image: "https://via.placeholder.com/50",
    date: "19 June",
    time: "1:00 PM",
  },
];

const DashBoard = () => {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]); // State for tasks

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/users/getUser`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
    setTasks(dummyTasks);
  }, []);

  return (
    <>
      <Navbar />
      <Flex background={"F5F8FF"} height="100vh" p={4}>
        <Sidebar user={user} />
        <Box mt={"20px"} w="100%">
          <Heading mb={6}>Welcome Back, {user?.username || "User"}</Heading>

          {/* Task status component (circular progress for each task category) */}
          <Flex justifyContent="space-between" mb={6}>
            <Box textAlign="center">
              <CircularProgress value={84} size="100px" color="green.400">
                <CircularProgressLabel>84%</CircularProgressLabel>
              </CircularProgress>
              <Text mt={2}>Completed</Text>
            </Box>
            <Box textAlign="center">
              <CircularProgress value={46} size="100px" color="blue.400">
                <CircularProgressLabel>46%</CircularProgressLabel>
              </CircularProgress>
              <Text mt={2}>In Progress</Text>
            </Box>
            <Box textAlign="center">
              <CircularProgress value={13} size="100px" color="red.400">
                <CircularProgressLabel>13%</CircularProgressLabel>
              </CircularProgress>
              <Text mt={2}>Not Started</Text>
            </Box>
          </Flex>

          {/* Tasks grid */}
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Grid>
        </Box>
      </Flex>
    </>
  );
};

export default DashBoard;

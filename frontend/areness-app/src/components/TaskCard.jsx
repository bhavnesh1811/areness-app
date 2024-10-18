import React from "react";
import { Box, Flex, Image, Text, Badge } from "@chakra-ui/react";

const TaskCard = ({ task }) => {
  return (
    <Box
      p={4}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      maxW="350px"
      mb={4}
    >
      <Flex mb={4}>
        <Image
          src={task.image}
          alt={task.title}
          borderRadius="lg"
          boxSize="50px"
          objectFit="cover"
        />
        <Flex flexDir="column" ml={4}>
          <Text fontSize="lg" fontWeight="bold">
            {task.title}
          </Text>
          <Badge colorScheme={task.status === "Completed" ? "green" : "yellow"}>
            {task.status}
          </Badge>
        </Flex>
      </Flex>
      <Text color="gray.500">{task.description}</Text>
      <Flex justifyContent="space-between" mt={4}>
        <Text color="gray.400" fontSize="sm">
          {task.date}
        </Text>
        <Text color="gray.400" fontSize="sm">
          {task.time}
        </Text>
      </Flex>
    </Box>
  );
};

export default TaskCard;

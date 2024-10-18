import React from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Text,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react";
import { FiSearch, FiBell, FiCalendar } from "react-icons/fi";

const Navbar = () => {
  // Use responsive styles for the search input and other elements
  const searchInputSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={4}
      bg="#F8F8F8"
      boxShadow="md"
    >
      {/* Dashboard Text Box */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" color={"#FF7373"}>
          Dash<span style={{ color: "#000000" }}>board</span>
        </Text>
      </Box>

      {/* Search Bar Box */}
      <Box width={{ base: "40%", md: "50%" }}>
        <Flex>
          <Input
            placeholder="Search..."
            size={searchInputSize}
            borderRadius="md"
            variant="outline"
          />
          <IconButton
            aria-label="Search"
            icon={<FiSearch />}
            variant="outline"
            borderRadius="md"
            ml={2}
            color="white"
            background={"#FF7373"}
          />
        </Flex>
      </Box>

      {/* Container for Notifications and Today's Date */}
      <Box>
        <Flex align="center">
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="outline"
            mr={2}
            color="white"
            background={"#FF7373"}
          />
          <IconButton
            aria-label="Calendar"
            icon={<FiCalendar />}
            variant="outline"
            mr={4}
            color="white"
            background={"#FF7373"}
          />
          <Text fontSize="md">{new Date().toLocaleDateString()}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;

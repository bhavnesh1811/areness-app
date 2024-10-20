"use client";

import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Avatar,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

const LinkItems = [
  { name: "DashBoard", icon: FiHome },
  { name: "Vital Task", icon: FiTrendingUp },
  { name: "My Tasks", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
  { name: "Logout", icon: FiLogOut },
];

export default function Sidebar({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" mt={"20px"}>
      <SidebarContent
        onClose={onClose}
        user={user}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user} />
        </DrawerContent>
      </Drawer>
      {/* Mobile nav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content goes here */}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, user, ...rest }) => {
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };


  return (
    <Center
      bg={useColorModeValue("#FF6767", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="absolute"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="16" justifyContent="space-between">
        <Center>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 1,
            }}
          />
        </Center>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Text color={"white"}>
        {user?.firstname} {user?.lastname}
      </Text>
      <Text color={"white"}>{user?.email}</Text>
      {LinkItems.map((link) => (
        <React.Fragment key={link.name}>
          {link.name === "Logout" ? (
            <button
              onClick={handleLogout}
              style={{display:"flex",justifyContent:"center",color:"#FFFFFF",alignItems:"center",marginLeft:"20px"}}
            >
              {link.icon && (
                <link.icon className="mr-2 text-gray-600" size={20} />
              )}
              Logout
            </button>
          ) : (
            <NavItem icon={link.icon}>{link.name}</NavItem>
          )}
        </React.Fragment>
      ))}
    </Center>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      color={"white"}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "white",
          color: "#FF7373",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              bg: "white",
              color: "#FF7373",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

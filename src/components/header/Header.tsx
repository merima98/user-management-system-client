import {
  Box,
  Center,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  MenuList,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Moon, Sun, User } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../../state";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setLoggedOut = useAuth((state) => state.setLoggedOut);

  const linkColor = useColorModeValue("gray.300", "orange");
  const backgroundColor = useColorModeValue("white", "gray.800");

  function logout() {
    setLoggedOut(false);
  }

  return (
    <Container
      zIndex={3}
      maxW={"100%"}
      position={"fixed"}
      borderBottom={"1px solid"}
      borderColor={linkColor}
      bg={backgroundColor}
      p={3}
      top={0}
      mb={2}
    >
      <Center>
        {isLoggedIn ? (
          <Flex w={"100%"} justifyContent={"space-around"}>
            <Box fontSize={"sm"}>
              <Link to="/">User management system</Link>
            </Box>

            <Box cursor={"pointer"} fontSize={"sm"}>
              <Link to="/new-user">New user</Link>
            </Box>
            <Box>
              <Menu>
                <MenuButton transition="all 0.2s">
                  <User width={20} height={16} />
                </MenuButton>
                <MenuList zIndex={2}>
                  <MenuItem fontSize={12} cursor={"default"}>
                    <Link to={`/}`}>
                      <Text>Your profile</Text>
                    </Link>
                  </MenuItem>
                  <MenuItem fontSize={12} cursor={"default"}>
                    <Link to="/" onClick={logout}>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              {colorMode === "light" ? (
                <Sun
                  onClick={toggleColorMode}
                  width={20}
                  height={16}
                  cursor="pointer"
                />
              ) : (
                <Moon
                  onClick={toggleColorMode}
                  width={20}
                  height={16}
                  cursor="pointer"
                />
              )}
            </Box>
          </Flex>
        ) : (
          <Flex w={"100%"} justifyContent={"space-around"}>
            <Box fontSize={"sm"}>
              <Link to="/">User management system</Link>
            </Box>

            <Box cursor={"pointer"} fontSize={"sm"}>
              <Link to="/login">Login</Link>
            </Box>
            <Box>
              {colorMode === "light" ? (
                <Sun
                  onClick={toggleColorMode}
                  width={20}
                  height={16}
                  cursor="pointer"
                />
              ) : (
                <Moon
                  onClick={toggleColorMode}
                  width={20}
                  height={16}
                  cursor="pointer"
                />
              )}
            </Box>
          </Flex>
        )}
      </Center>
    </Container>
  );
}
export default Header;

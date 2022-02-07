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
import { toInteger } from "lodash";
import { useQuery } from "react-query";

import { useAuth, useUser } from "../../state";
import queries from "../../api/queries";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setLoggedOut = useAuth((state) => state.setLoggedOut);
  const removeUserId = useUser((state) => state.removeUserId);
  const userId = useUser((state) => state.userId);

  const linkColor = useColorModeValue("gray.300", "orange");
  const backgroundColor = useColorModeValue("white", "gray.800");

  function logout() {
    setLoggedOut(false);
    removeUserId();
  }

  const { data } = useQuery(["my-profile-data", userId], () =>
    queries.getUserById(toInteger(userId))
  );

  const user = data?.data[0];

  return (
    <Container
      zIndex={4}
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
        {isLoggedIn && user?.permissionId === 1 ? (
          <Flex w={"100%"} justifyContent={"space-around"}>
            <Box fontSize={"sm"}>
              <Link to="/">User management system</Link>
            </Box>

            <Box cursor={"pointer"} fontSize={"sm"}>
              <Link to="/new-user" data-cy="new-user-link">
                New user
              </Link>
            </Box>

            <Box>
              <Menu>
                <MenuButton transition="all 0.2s">
                  <User width={20} height={16} />
                </MenuButton>
                <MenuList zIndex={2}>
                  <MenuItem fontSize={12} cursor={"default"}>
                    <Link to={`/user/my-profile`}>
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
        ) : isLoggedIn && user?.permissionId !== 1 ? (
          <Flex w={"100%"} justifyContent={"space-around"}>
            <Box fontSize={"sm"}>
              <Link to="/">User management system</Link>
            </Box>
            <Box>
              <Menu>
                <MenuButton transition="all 0.2s">
                  <User width={20} height={16} />
                </MenuButton>
                <MenuList zIndex={2}>
                  <MenuItem fontSize={12} cursor={"default"}>
                    <Link to={`/user/my-profile`}>
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

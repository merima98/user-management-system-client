import {
  Button,
  Center,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  Box,
  AlertDialogFooter,
  AlertDialogHeader,
  Spinner,
  AlertDialogOverlay,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query/react";
import { Link, useNavigate } from "react-router-dom";
import { Cell } from "react-table";

import mutations from "../../api/mutations";
import queries from "../../api/queries";
import { useAuth } from "../../state";
import UserTable from "../user/UserTable";

function UserListHeader() {
  const defaultPageSize = 10;
  const emptyColor = useColorModeValue("blue.200", "orange.200");
  const spinnerColor = useColorModeValue("blue.500", "orange.500");
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [userId, setUserId] = useState(0);

  const { data, isLoading } = useQuery(
    ["users-list", pageSize],
    () => queries.getUsers(pageSize),
    {
      keepPreviousData: true,
    }
  );
  const users = data ? data.data : [];

  function formatStatus(status: number) {
    return status ? "Active" : "Inactive";
  }

  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const deleteUserMutation = useMutation(mutations.deleteUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users-list");
      navigate("/");
      toast({
        title: `User deleted!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    },
  });
  const loggedUserId = Number(window.localStorage.getItem("userId"));
  const currentLoggedUserQuery = useQuery("current-logged-user", () =>
    queries.getUserById(loggedUserId)
  );
  const loggedUser = currentLoggedUserQuery?.data;

  const columns = React.useMemo(
    () => [
      {
        Header: "First name",
        accessor: "firstName",
      },
      {
        Header: "Last name",
        accessor: "lastName",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: function updatedAtCell(props: Cell) {
          return <>{formatStatus(props.value)}</>;
        },
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: function idCell(props: Cell) {
          return isLoggedIn &&
            loggedUser?.data &&
            loggedUser?.data[0]?.permissionId === 1 ? (
            <Flex flexDirection={{ base: "column", sm: "row", md: "column" }}>
              <Link to={`/permission/user/${props.value}`}>
                <Button
                  mb={1}
                  size="xs"
                  zIndex={-1}
                  w={20}
                  colorScheme={"blue"}
                >
                  Assign
                </Button>
              </Link>
              <Link to={`/user/${props.value}`}>
                <Button
                  zIndex={-1}
                  mb={1}
                  w={20}
                  size="xs"
                  colorScheme={"blue"}
                >
                  Edit
                </Button>
              </Link>
              <Box>
                <Button
                  w={20}
                  mb={1}
                  zIndex={1}
                  size="xs"
                  colorScheme={"red"}
                  cursor={"pointer"}
                  onClick={() => {
                    setIsOpenAlert(true);
                    setUserId(props.value);
                  }}
                >
                  Delete
                </Button>
                <AlertDialog
                  isOpen={isOpenAlert}
                  onClose={onCloseAlert}
                  leastDestructiveRef={cancelRef}
                >
                  <AlertDialogOverlay background={"blackAlpha.50"}>
                    <AlertDialogContent boxShadow={"none"}>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete user
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        Are you sure you want to delete this user?
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          size="xs"
                          onClick={onCloseAlert}
                        >
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          size="xs"
                          onClick={() => {
                            deleteUserMutation.mutate(userId);
                            setIsOpenAlert(false);
                          }}
                          ml={2}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>
            </Flex>
          ) : (
            <Link to={`/user/${props.value}`}>
              <Button colorScheme="green" size="xs">
                View
              </Button>
            </Link>
          );
        },
      },
    ],
    [isOpenAlert, deleteUserMutation, userId, isLoggedIn, loggedUser?.data]
  );
  function loadMoreUsers() {
    let newPageSize = pageSize;
    newPageSize += defaultPageSize;
    setPageSize(newPageSize);
  }
  return (
    <>
      {isLoading ? (
        <Center mt={40}>
          <Spinner
            thickness="4px"
            speed="0.75s"
            emptyColor={emptyColor}
            color={spinnerColor}
            size="xl"
          />
        </Center>
      ) : (
        <>
          <UserTable data={users} columns={columns} />
          <Center>
            <Button mb={3} colorScheme="blue" size="xs" onClick={loadMoreUsers}>
              Load more
            </Button>
          </Center>
        </>
      )}
    </>
  );
}

export default UserListHeader;

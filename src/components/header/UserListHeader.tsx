import { Button, Center, Flex, Table, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { useQuery, useQueryClient } from "react-query";

import queries from "../../api/queries";
import { User } from "../../models/User";
import UserList from "../user/UserList";

function UserListHeader() {
  const [condition, setCondition] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const defaultPageSize = 10;
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const queryClient = useQueryClient();
  const { data } = useQuery(["users-list", condition, order, pageSize], () =>
    queries.getUsers(condition, order, pageSize)
  );

  const users = data ? data?.data : [];

  function sortUsers(attribute: string, order: string) {
    setCondition(attribute);
    setOrder(order);
    queryClient.invalidateQueries("users-list");
  }

  function loadMoreUsers() {
    let newPageSize = pageSize;
    newPageSize += defaultPageSize;
    setPageSize(newPageSize);
  }
  return (
    <Center flexDirection={"column"}>
      <Table size="sm" mb={8} mt={20} w={"50vw"}>
        <Thead>
          <Tr>
            <Th>
              <Flex flexDirection={"row"}>
                First name{" "}
                <ArrowUp
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("firstName", "asc")}
                />
                <ArrowDown
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("firstName", "desc")}
                />
              </Flex>
            </Th>
            <Th>
              <Flex flexDirection={"row"}>
                Last name{" "}
                <ArrowUp
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("lastName", "asc")}
                />
                <ArrowDown
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("lastName", "desc")}
                />
              </Flex>
            </Th>
            <Th>
              <Flex flexDirection={"row"}>
                Username{" "}
                <ArrowUp
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("username", "asc")}
                />
                <ArrowDown
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("username", "desc")}
                />
              </Flex>
            </Th>
            <Th>
              <Flex flexDirection={"row"}>
                Email{" "}
                <ArrowUp
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("email", "asc")}
                />
                <ArrowDown
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("email", "desc")}
                />
              </Flex>
            </Th>
            <Th>
              <Flex flexDirection={"row"}>
                Status{" "}
                <ArrowUp
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("status", "asc")}
                />
                <ArrowDown
                  height={"20px"}
                  cursor={"pointer"}
                  onClick={() => sortUsers("status", "desc")}
                />
              </Flex>
            </Th>
            <Th>Permission</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        {users.map((user: User) => {
          return (
            <UserList
              email={user.email}
              password={user.password}
              firstName={user.firstName}
              lastName={user.lastName}
              id={user.id}
              username={user.username}
              status={user.status}
              permissionId={user.permissionId}
              key={user.id}
            />
          );
        })}
      </Table>
      <Button mb={3} colorScheme="blue" size="xs" onClick={loadMoreUsers}>
        Load more
      </Button>
    </Center>
  );
}
export default UserListHeader;

import { Button, Center, Flex } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query/react";
import { Link } from "react-router-dom";
import { Cell } from "react-table";

import queries from "../../api/queries";
import UserTable from "../user/UserTable";

function UserListHeader() {
  const defaultPageSize = 10;
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const { data } = useQuery(
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
          return (
            <Flex flexDirection={"column"}>
              <Link to={`/permission/user/${props.value}`}>
                <Button
                  mb={1}
                  size="sm"
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
                  size="sm"
                  colorScheme={"blue"}
                >
                  Edit
                </Button>
              </Link>
              <Button
                w={20}
                mb={1}
                zIndex={-1}
                size="sm"
                colorScheme={"red"}
                cursor={"pointer"}
              >
                Delete
              </Button>
            </Flex>
          );
        },
      },
    ],
    []
  );
  function loadMoreUsers() {
    let newPageSize = pageSize;
    newPageSize += defaultPageSize;
    setPageSize(newPageSize);
  }
  return (
    <>
      <UserTable data={users} columns={columns} />
      <Center>
        <Button mb={3} colorScheme="blue" size="xs" onClick={loadMoreUsers}>
          Load more
        </Button>
      </Center>
    </>
  );
}
export default UserListHeader;

import { Button, Center } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query/react";
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

  function buttonFunction(props: any) {
    console.log("Props value,", props);
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
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: function idCell(props: Cell) {
          return (
            <>
              <Button
                mb={1}
                size="sm"
                zIndex={-1}
                w={20}
                colorScheme={"blue"}
                onClick={() => buttonFunction(props.value)}
              >
                Assign
              </Button>
              <Button
                zIndex={-1}
                mb={1}
                w={20}
                size="sm"
                colorScheme={"blue"}
                onClick={() => buttonFunction(props.value)}
              >
                Edit
              </Button>
              <Button
                w={20}
                mb={1}
                zIndex={-1}
                size="sm"
                colorScheme={"red"}
                onClick={() => buttonFunction(props.value)}
              >
                Delete
              </Button>
            </>
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

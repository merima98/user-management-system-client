import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { User } from "../../models/User";

function UserList(props: User) {
  const {
    firstName,
    lastName,
    username,
    id,
    email,
    password,
    status,
    permissionId,
  } = props;

  function determinStatus(status: number) {
    return status ? "Active" : "Inactive";
  }
  return (
    <Tbody>
      <Tr>
        <Td>{firstName}</Td>
        <Td>{lastName}</Td>
        <Td>{username}</Td>
        <Td>{email}</Td>
        <Td>{determinStatus(status)}</Td>
        <Td>
          <Button colorScheme="blue" size="xs" zIndex={-1}>
            Assign
          </Button>
        </Td>
        <Td>
          <Button colorScheme="blue" size="xs" zIndex={-1}>
            Edit
          </Button>
        </Td>
        <Td>
          <Button colorScheme="red" size="xs" zIndex={-1}>
            Delete
          </Button>
        </Td>
      </Tr>
    </Tbody>
  );
}
export default UserList;

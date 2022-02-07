import {
  Container,
  FormControl,
  useToast,
  Text,
  Flex,
  Select,
  Button,
  useColorModeValue,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query/react";
import { useParams } from "react-router-dom";

import mutations from "../../api/mutations";
import queries from "../../api/queries";
import { User } from "../../models/User";

function UserPermissionDetails() {
  const { handleSubmit, register } = useForm();
  const emptyColor = useColorModeValue("blue.200", "orange.200");
  const spinnerColor = useColorModeValue("blue.500", "orange.500");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const userId = params.id;

  const updateUserPermissionMutation = useMutation(
    mutations.updateUserPermission,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("user");
        toast({
          title: `Permission updated!`,
          position: "top",
          status: "success",
          isClosable: true,
        });
        onClose();
      },
    }
  );

  function onSubmit(values: FieldValues) {
    const permissionId: number = Number(values.permissionId);
    const userData = {
      id: Number(params.id),
      permissionId: permissionId,
    };
    updateUserPermissionMutation.mutate(userData);
  }

  const { data, isLoading } = useQuery("user", () =>
    queries.getUserById(Number(userId))
  );
  function fromatPermission(permission: number) {
    return permission === 1 ? "Admin" : "Regular user";
  }

  return (
    <Container p={10} marginTop={20}>
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
          {data?.data.map((user: User) => {
            return (
              <Flex flexDirection={"column"} key={user.id}>
                <Flex
                  justifyContent={"space-between"}
                  mb={2}
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    First name
                  </Text>
                  <Text>{user?.firstName}</Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  mb={2}
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    Last name
                  </Text>
                  <Text>{user?.lastName}</Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  mb={2}
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    Email
                  </Text>
                  <Text>{user?.email}</Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  mb={2}
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    Status
                  </Text>
                  <Text>{fromatPermission(user?.permissionId)}</Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  flexDirection={{ base: "column", sm: "row" }}
                  mb={2}
                >
                  <Button colorScheme="blue" size="xs" onClick={onOpen} mb={1}>
                    Change permission
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ModalContent>
                        <ModalHeader>Update permission</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={3}>
                          <FormControl>
                            <Select {...register("permissionId")} type="number">
                              <option value={1}>Admin</option>
                              <option value={2}>Regular user</option>
                            </Select>
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="submit"
                            colorScheme="green"
                            size="xs"
                            mr={1}
                            isLoading={updateUserPermissionMutation.isLoading}
                          >
                            Save
                          </Button>
                          <Button size="xs" onClick={onClose}>
                            Discard changes
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </form>
                  </Modal>
                </Flex>
              </Flex>
            );
          })}
        </>
      )}
    </Container>
  );
}

export default UserPermissionDetails;

import {
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  Text,
  Flex,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query/react";
import { toInteger } from "lodash";

import mutations from "../../api/mutations";
import queries from "../../api/queries";
import { User } from "../../models/User";

function CurrentUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const userId = toInteger(window.localStorage.getItem("userId"));

  const updateUserDataMutation = useMutation(mutations.updateUserData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("my-profile");
      toast({
        title: `Profile data updated!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
      onClose();
    },
  });

  function onSubmit(values: FieldValues) {
    let firstName: string = values.firstName;
    let lastName: string = values.lastName;
    let email: string = values.email;
    let status: number = toInteger(values.status);
    let userData = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      status: status,
    };
    updateUserDataMutation.mutate(userData);
  }
  const { data } = useQuery("my-profile", () =>
    queries.getUserById(toInteger(userId))
  );

  function formatStatus(status: number) {
    return status ? "Active" : "Inactive";
  }

  return (
    <Container
      border={"1px solid"}
      borderColor={"gray.200"}
      p={10}
      marginTop={20}
    >
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
              <Text>{formatStatus(user?.status)}</Text>
            </Flex>

            <Flex
              justifyContent={"space-between"}
              flexDirection={{ base: "column", sm: "row" }}
              mb={2}
            >
              <Button colorScheme="blue" size="xs" onClick={onOpen} mb={1}>
                Change user data
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalContent>
                    <ModalHeader>Update your profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={3}>
                      <FormControl isInvalid={errors.firstName}>
                        <Input
                          mb={1}
                          placeholder="First name"
                          defaultValue={user?.firstName}
                          type={"text"}
                          {...register("firstName", {
                            required: "First name is required field!",
                          })}
                        />
                        <FormErrorMessage mb={1}>
                          {errors.firstName && errors.firstName.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.lastName}>
                        <Input
                          mb={1}
                          placeholder="Last name"
                          defaultValue={user?.lastName}
                          type={"text"}
                          {...register("lastName", {
                            required: "Last name is required field!",
                          })}
                        />
                        <FormErrorMessage mb={1}>
                          {errors.lastName && errors.lastName.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.email}>
                        <Input
                          mb={1}
                          placeholder="Email"
                          defaultValue={user?.email}
                          type={"email"}
                          {...register("email", {
                            required: "Email is required filed!",
                          })}
                        />
                        <FormErrorMessage mb={1}>
                          {errors.email && errors.email.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.status}>
                        <FormLabel>User status</FormLabel>
                        <Select {...register("status")} type="number">
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </Select>
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        colorScheme="green"
                        size="xs"
                        mr={1}
                        isLoading={updateUserDataMutation.isLoading}
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
    </Container>
  );
}

export default CurrentUser;

import { Mail, Lock } from "react-feather";
import {
  Button,
  Container,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
  Stack,
  useToast,
  RadioGroup,
  Radio,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { ErrorOption, FieldValues, useForm } from "react-hook-form";
import { Eye, EyeOff, ChevronRight } from "react-feather";
import { useMutation, useQueryClient } from "react-query/react";
import { useNavigate } from "react-router-dom";

import mutations from "../../api/mutations";

function NewUserForm() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const iconColor = useColorModeValue("black", "orange");
  const inputBackgroundColor = useColorModeValue("white", "gray.700");

  const createNewUserMutation = useMutation(mutations.register, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users-list");
      toast({
        title: `User added!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      navigate("/");
    },
    onError: (error: ErrorOption) => {
      setError("email", error, { shouldFocus: true });
      toast({
        title: `Email is already in use!`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    },
  });

  function onSubmit(values: FieldValues) {
    let newUser: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
      status: number;
      permissionId: number;
    } = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
      status: Number(values.status),
      permissionId: Number(values.permissionId),
    };
    createNewUserMutation.mutate(newUser);
  }

  function handleClick() {
    setShow(!show);
  }

  return (
    <Container border="1px" borderColor="gray.200" p={10} marginTop={20}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl isInvalid={errors.firstName}>
            <InputGroup>
              <InputLeftElement
                zIndex={2}
                children={
                  <ChevronRight color={iconColor} width={20} height={16} />
                }
              />
              <Input
                data-cy="input-firstName"
                placeholder="First name"
                type={"text"}
                {...register("firstName", {
                  required: "First name is required field!",
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={3}>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.lastName}>
            <InputGroup>
              <InputLeftElement
                zIndex={2}
                children={
                  <ChevronRight color={iconColor} width={20} height={16} />
                }
              />
              <Input
                data-cy="input-lastName"
                placeholder="Last name"
                type={"text"}
                {...register("lastName", {
                  required: "Last name is required field!",
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={3}>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement
                zIndex={2}
                children={<Mail color={iconColor} width={20} height={16} />}
              />
              <Input
                data-cy="input-new-user-email"
                placeholder="Email"
                type={"email"}
                _focus={{ backgroundColor: inputBackgroundColor }}
                {...register("email", {
                  required: "Email is required!",
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={3}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username}>
            <InputGroup>
              <InputLeftElement
                zIndex={2}
                children={
                  <ChevronRight color={iconColor} width={20} height={16} />
                }
              />
              <Input
                data-cy="input-username"
                placeholder="Username"
                type={"text"}
                {...register("username", {
                  required: "Username is required field!",
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={3}>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement
                zIndex={2}
                children={<Lock color={iconColor} width={20} height={16} />}
              />
              <Input
                data-cy="input-new-user-password"
                placeholder="Password"
                autoComplete="Passowrd"
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 5,
                    message: "Minimum length should be 5!",
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? (
                    <EyeOff color={iconColor} width={20} height={16} />
                  ) : (
                    <Eye color={iconColor} width={20} height={16} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage mb={3}>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.status}>
            <FormLabel>User status</FormLabel>
            <InputGroup>
              <RadioGroup defaultValue={1}>
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="red"
                    value={0}
                    {...register("status")}
                    type="number"
                  >
                    Inactive user
                  </Radio>
                  <Radio
                    colorScheme="green"
                    value={1}
                    {...register("status")}
                    type="number"
                  >
                    Active user
                  </Radio>
                </Stack>
              </RadioGroup>
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={errors.permissionId}>
            <FormLabel>User role</FormLabel>
            <InputGroup>
              <RadioGroup defaultValue={2}>
                <Stack spacing={5} direction="row">
                  <Radio
                    type="number"
                    colorScheme="green"
                    value={1}
                    {...register("permissionId")}
                  >
                    Admin
                  </Radio>
                  <Radio
                    colorScheme="green"
                    type="number"
                    value={2}
                    {...register("permissionId")}
                  >
                    Regular user
                  </Radio>
                </Stack>
              </RadioGroup>
            </InputGroup>
          </FormControl>
          <Button
            data-cy="create-user-button"
            type="submit"
            boxShadow={"sm"}
            _hover={{ boxShadow: "md" }}
            isLoading={createNewUserMutation.isLoading}
          >
            Add user
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default NewUserForm;

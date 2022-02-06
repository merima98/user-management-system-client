import { Mail, Lock } from "react-feather";
import {
  Button,
  Container,
  InputRightElement,
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  Input,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ErrorOption, useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import mutations from "../api/mutations";
import { useAuth } from "../state";

function Login() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const iconColor = useColorModeValue("black", "orange");
  const inputBackgroundColor = useColorModeValue("white", "gray.700");

  const loginMutation = useMutation(mutations.login, {
    onSuccess: (data) => {
      setIsLoggedIn(true, data.data.user.id, data.data.accessToken);
      navigate("/");
    },
    onError: (error: ErrorOption) => {
      setError("email", error, { shouldFocus: true });
      setError("password", error, { shouldFocus: true });
      toast({
        title: `Email or password is incorrect!`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    },
  });

  function onSubmit(values: FormControlOptions) {
    loginMutation.mutate(values);
  }

  function handleClick() {
    setShow(!show);
  }

  return (
    <Container border="1px" borderColor="gray.200" p={10} marginTop={20}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement
                zIndex={1}
                children={<Mail color={iconColor} width={20} height={16} />}
              />
              <Input
                placeholder="Email"
                type={"email"}
                _focus={{ backgroundColor: inputBackgroundColor }}
                {...register("email", {
                  required: "Email is required!",
                })}
              />
            </InputGroup>
            <FormErrorMessage mb={"1rem"}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement
                zIndex={1}
                children={<Lock color={iconColor} width={20} height={16} />}
              />
              <Input
                _focus={{ backgroundColor: inputBackgroundColor }}
                placeholder="Password"
                autoComplete="Passowrd"
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Password is required!",
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
            <FormErrorMessage mb={"1rem"}>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            boxShadow={"sm"}
            _hover={{ boxShadow: "md" }}
            isLoading={loginMutation.isLoading}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default Login;

import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";

function UserSearchForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values: FieldValues) {
    console.log("Values are, ", values);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <Select height={6} placeholder="Select attribure">
          <option value="firstName" {...register("attribute")}>
            First name
          </option>
          <option value="lastName" {...register("attribute")}>
            Last name
          </option>
          <option value="email" {...register("attribute")}>
            Email
          </option>
          <option value="username" {...register("attribute")}>
            Username
          </option>
        </Select>
        <FormControl isInvalid={errors.search}>
          <InputGroup>
            <Input
              height={6}
              placeholder={errors.search ? errors.search.message : "Search"}
              type={"text"}
              {...register("search", {
                required: "Type something!",
              })}
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          height={6}
          boxShadow={"sm"}
          _hover={{ boxShadow: "md" }}
        >
          Filter
        </Button>
      </Flex>
    </form>
  );
}
export default UserSearchForm;

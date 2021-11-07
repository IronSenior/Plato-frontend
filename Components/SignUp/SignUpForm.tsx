import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import UserDTO from "../../models/userDTO";
import { 
  Image,
  Center,
  Button,
  Box,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';


export type UserFormData = {
    username: string;
    usermail: string;
    password: string;
}

type Props = {
    onSubmitForm(data: UserFormData): void;
    user?: UserDTO;
};

export const SignUpForm: React.FunctionComponent<Props> = ({ onSubmitForm, user }) => {
  const { handleSubmit, register, setValue } = useForm<UserFormData>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue("usermail", event.target.value)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue("password", event.target.value)
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue("username", event.target.value)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    register("username", { required: true });
    register("usermail", { required: true });
    register("password", { required: true });
    if (user) {
      setValue("username", user.username);
      setValue("usermail", user.usermail);
      setValue("password", user.password);
    }
  }, [user]);

  return (
    <Center pt="100">
      <Box maxW="sm" overflow="hidden">
        <Center pt="50">
          <Image src="/logo.png" alt="Plato logo" />
        </Center>
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            textAlign="center"
          >
            <Heading size="md">
              Crear Usuario
            </Heading>
          </Box>
          <Center mt="5">
            <form onSubmit={handleSubmit((contactData) => onSubmitForm(contactData))}>
              <Input
                type="text"
                placeholder="Username"
                required={true}
                onChange={handleUsernameChange}
              />
              <InputGroup mt="5">
                <Input
                  type="email"
                  placeholder="Email"
                  required={true}
                  onChange={handleEmailChange}
                />
              </InputGroup>
              <InputGroup size="md" mt="5">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Contraseña"
                  required={true}
                  onChange={handlePasswordChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Center mt="5">
                <Button type="submit">Confirmar</Button>
              </Center>
            </form>
          </Center>
        </Box>
      </Box>
    </Center>
  );
};
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

export type LogInFormData = {
    usermail: string;
    password: string;
}

type Props = {
    onSubmitForm(data: LogInFormData): void;
    user?: UserDTO;
};

export const LogInForm: React.FunctionComponent<Props> = ({ onSubmitForm, user }) => {
  const { handleSubmit, register, setValue } = useForm<LogInFormData>();

  const handleEmailChange = (event) => setValue("usermail", event.target.value)
  const handlePasswordChange = (event) => setValue("password", event.target.value)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    register("usermail", { required: true });
    register("password", { required: true });
    if (user) {
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
              Iniciar Sesión
            </Heading>
          </Box>
          <Center mt="5">
            <form onSubmit={handleSubmit((contactData) => onSubmitForm(contactData))}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children="@"
                />
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
              <Center mt="3">
                <Button type="submit">Confirmar</Button>
              </Center>
            </form>
          </Center>
        </Box>
      </Box>
    </Center>
  );
};
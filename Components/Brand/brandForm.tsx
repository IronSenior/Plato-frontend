import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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


export type BrandFormData = {
    name: string,
    image: string
}

type Props = {
    onSubmitForm(data: BrandFormData): void;
};

export const BrandForm: React.FunctionComponent<Props> = ({ onSubmitForm }) => {
  const { handleSubmit, register, setValue } = useForm<BrandFormData>();

  const handleNameChange = (event) => setValue("name", event.target.value)
  const handleImageChange = (event) => setValue("image", event.target.value)

  useEffect(() => {
    register("name", { required: true });
    register("image", { required: true });
  }, []);

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
              <Input
                type="text"
                placeholder="Nombre"
                required={true}
                onChange={handleNameChange}
              />
              <Input
                mt="5"
                type="text"
                placeholder="Imagen"
                required={true}
                onChange={handleImageChange}
              />
              <Center mt="3">
                <Button type="submit">Crear</Button>
              </Center>
            </form>
          </Center>
        </Box>
      </Box>
    </Center>
  );
};
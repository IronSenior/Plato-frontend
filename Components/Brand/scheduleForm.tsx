import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
    Image,
    Center,
    Button,
    Box,
    Heading,
    InputGroup,
    Input,
    Text,
    Textarea,
    InputLeftElement,
    InputRightElement
  } from '@chakra-ui/react';

export type ScheduleFormData = {
    description: string,
    publicationDate: string,
    publicationTime: string
}

type Props = {
    onSubmitForm(data: ScheduleFormData): void;
};

export const ScheduleForm: React.FunctionComponent<Props> = ({ onSubmitForm }) => {
    const { handleSubmit, register, setValue, getValues } = useForm<ScheduleFormData>();

    const [description, setDescription] = useState("")
    const handleDescriptionChange = (event) => {
      setValue("description", event.target.value);
      setDescription(event.target.value);
    }
    const handleDateChange = (event) => setValue("publicationDate", event.target.value)
    const handleTimeChange = (event) => setValue("publicationTime", event.target.value)
    

    useEffect(() => {
        register("description", { required: true });
        register("publicationDate", { required: true });
        register("publicationTime", { required: true });
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
                Programar publicación
              </Heading>
            </Box>
            <Center mt="5">
              <form onSubmit={handleSubmit((contactData) => onSubmitForm(contactData))}>
                <Textarea
                  type="text"
                  placeholder="¿Qué está pasando?"
                  required={true}
                  maxlength="280"
                  onChange={handleDescriptionChange}
                />
                <Text float="right" fontSize="10">{description.length}/280</Text>
                <Input
                  mt="5"
                  type="date"
                  placeholder="Fecha"
                  required={true}
                  onChange={handleDateChange}
                />
                <Input
                  mt="5"
                  type="time"
                  placeholder="Hora"
                  required={true}
                  onChange={handleTimeChange}
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
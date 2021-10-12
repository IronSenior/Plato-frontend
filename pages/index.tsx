import React from 'react';
import Link from 'next/link';
import { 
  Image,
  Center,
  Button,
  Box,
  Spinner,
  Heading
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/client';

export default function Home() {

  const [session, loading] = useSession();

  return (
    <Center pt="100">
      <Box maxW="sm" overflow="hidden">
        <Center pt="50">
          <Image src="/logo.png" alt="Plato logo"/>
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
              Plato: Controla tus redes
            </Heading>
          </Box>
          {session ? (
            <Center pt="5">
              <Link href="/brand">
                <Button colorScheme="teal" mr="4">
                  Marcas
                </Button>
              </Link>
              <Link href="/brand/create">
                <Button colorScheme="teal" mr="4">
                  Crear Marca
                </Button>
              </Link>
              <Button colorScheme="teal" onClick={() => signOut()}>
                Cerrar Sesión
              </Button>
            </Center>
          ) : (
            <Center pt="5">
              <Link href="/signup">
                <Button colorScheme="teal" mr="4">
                  Registrarme
                </Button>
              </Link>
              <Link href="/login">
                <Button colorScheme="teal">
                  Iniciar sesión
                </Button>
              </Link>
            </Center>
          )}

        </Box>
      </Box>
    </Center>
  );
}


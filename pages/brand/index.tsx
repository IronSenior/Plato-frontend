import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link';
import { 
    Image,
    Center,
    Button,
    Box,
    Heading,
    Avatar
} from '@chakra-ui/react';


export default function Brands() {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ brands, setBrands ] = useState([]);
    const [ session, loading ] = useSession();
    const router = useRouter();
    const { brandId } = router.query;

    useEffect(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/brand/user/${session.userId}/`,
                    {headers: {"Authorization" : `Bearer ${session.access_token}`}}
                ).then(
                    (response) => {
                        setBrands(response.data);
                    }
                )
            }
        },
        [session]
    )

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
                        Mis Marcas
                    </Heading>
                    </Box>
                    <Center pt="5">
                        {brands.map((brand, index) => (  
                            <Link href={`/brand/${brand.brandId}`}>
                                <Avatar name={brand.name} src={brand.image} mr={2}/>
                            </Link>
                        ))}
                    </Center>
                </Box>
            </Box>
        </Center>
    );
}
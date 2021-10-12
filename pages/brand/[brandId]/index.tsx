import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { AddTwitterButton } from "../../../components/Twitter/AddTwitterButton";
import { 
    Image,
    Center,
    Button,
    Spinner,
    VStack,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Container,
    Box,
    Heading
} from '@chakra-ui/react';
import { TweetsList } from "../../../components/Twitter/TweetsList";


export default function Accounts() {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ twitterAccount, setTwitterAccount ] = useState(null);
    const [ session, loading ] = useSession();
    const router = useRouter();
    const { brandId } = router.query;

    useEffect(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/brand/${brandId}/`,
                    {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
                ).then(
                    (response) => {
                        setTwitterAccount(response.data.account);
                    }
                ).catch(
                    (error) => {
                        setTwitterAccount(null);
                    }
                )
            }
        },
        [session]
    )

    if (loading) {
        return (<Spinner />)
    }

    return (
        <VStack pt="">
        <Container maxW="sm" overflow="hidden">
          <Center pt="50">
            <Link href="/">
                <Image src="/logo.png" alt="Plato logo" maxH="20"/>
            </Link>
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
          </Box>
        </Container>
        <Tabs width="90%">
            <TabList>
                <Tab>
                    <Image src="/twitter.png" maxW="8"></Image>
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    {twitterAccount ? (
                        <Box ml="10" mt="5">
                            <Link href={`/brand/${brandId}/schedule/?accountId=${twitterAccount.accountId}`}>
                                <Button mb="4">
                                    Programar Tweet
                                </Button>
                            </Link>
                            <TweetsList accountId={twitterAccount.accountId}></TweetsList>
                        </Box>
                    ) : (
                        <AddTwitterButton/>
                    )}
                </TabPanel>
            </TabPanels>
        </Tabs>
      </VStack>
    );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { 
    List,
    ListItem,
    Spinner,
    ListIcon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { CheckCircleIcon, CalendarIcon } from "@chakra-ui/icons";
import { TweetReport } from "./TweetReport";


type Props = {
    accountId: string;
};

export const TweetsList: React.FunctionComponent<Props> = ({ accountId }) => {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ tweets, setTweets ] = useState([""]);
    const [ session, loading ] = useSession();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/tweet/${accountId}/`,
                    {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
                ).then(
                    (response) => {
                        setTweets(response.data);
                    }
                ).catch(
                    (error) => {
                        setTweets([""]);
                    }
                )
            }
        },
        [session]
    )

    if (loading) {
        return (<Spinner />);
    }
    
    return (
        <List spacing={3}>
            {tweets.map((tweet, index) => (  
                <>
                <ListItem>
                    <ListIcon as={tweet.published ? CheckCircleIcon : CalendarIcon}/>
                    <Button onClick={onOpen}>{ tweet.description }</Button>
                </ListItem>
                <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                    <ModalOverlay/>
                    <ModalContent height={{xl: "500px"}} p="10">
                        <ModalHeader>Reporte de Tweet</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <TweetReport tweetId={tweet.tweetId}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                </>
            ))}
        </List>
    );
}

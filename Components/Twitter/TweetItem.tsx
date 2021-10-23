import React from "react";
import { 
    ListItem,
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
    tweet: object;
};

export const TweetItem: React.FunctionComponent<Props> = ({ tweet }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
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
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

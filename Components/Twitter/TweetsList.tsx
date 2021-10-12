import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { 
    List,
    ListItem,
    Spinner,
    ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon, CalendarIcon } from "@chakra-ui/icons";


type Props = {
    accountId: string;
};

export const TweetsList: React.FunctionComponent<Props> = ({ accountId }) => {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ tweets, setTweets ] = useState([""]);
    const [ session, loading ] = useSession();
    const router = useRouter();

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

    console.log(tweets);

    if (loading) {
        return (<Spinner />);
    }
    
    return (
        <List spacing={3}>
            {tweets.map((tweet, index) => (  
            <ListItem>
                <ListIcon as={tweet.published ? CheckCircleIcon : CalendarIcon}/>
                { tweet.description }
            </ListItem>
            ))}
        </List>
    );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { 
    List,
    Spinner,
} from '@chakra-ui/react';
import { TweetItem } from "./TweetItem";


type Props = {
    accountId: string;
};

function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
}

export const TweetsList: React.FunctionComponent<Props> = ({ accountId }) => {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ tweets, setTweets ] = useState([]);
    const [ session, loading ] = useSession();
    const router = useRouter();

    useEffect(
        () => {
            if (session) {
                const pastWeek = getLastWeek().getTime() / 1000
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/tweet/${accountId}/?sinceDate=${pastWeek}`,
                    {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
                ).then(
                    (response) => {
                        setTweets(response.data);
                    }
                ).catch(
                    (error) => {
                        if (error.response){
                            if(error.response.status >= 400){
                                router.push("/login");
                                signOut();
                            }
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                        setTweets([]);
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
                <TweetItem key={tweet.id} tweet={ tweet }/>
            ))}
        </List>
    );
}

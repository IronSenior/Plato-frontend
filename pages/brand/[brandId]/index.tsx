import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { AddTwitterButton } from "../../../components/Twitter/AddTwitterButton";


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
                        console.log(response);
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
    
    console.log(twitterAccount);

    return (
        <div>
            {twitterAccount ? (
                <Link href={`/brand/${brandId}/schedule`}>
                    <a>Sign up</a>
                </Link>
            ) : (
                <AddTwitterButton/>
            )}
        </div>
    );
}
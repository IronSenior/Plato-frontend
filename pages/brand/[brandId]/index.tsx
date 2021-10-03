import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { AddTwitterButton } from "../../../components/Twitter/AddTwitterButton";


export default function Accounts() {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ twitterAccount, setTwitterAccount ] = useState([]);
    const [ session, test ] = useSession();
    const router = useRouter();
    const { brandId } = router.query;

    useEffect(
        () => {
            axios.get(
                `${NEXT_PUBLIC_PLATO_API_URL}/twitter/brand/${brandId}/`,
                {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
            ).then(
                (response) => {
                    setTwitterAccount(response.data.account);
                }
            )
        },
        []
    )

    console.log(twitterAccount);

    return (
        <div>
            {twitterAccount ? (
                <span>Ya tienes Twitter</span>
            ) : (
                <AddTwitterButton/>
            )}
        </div>
    );
}
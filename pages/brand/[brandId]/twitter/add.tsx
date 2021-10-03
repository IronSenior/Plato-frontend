import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import uuid from "uuid";


export default function LogIn() {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ session, test ] = useSession();
    const router = useRouter()

    useEffect(
        () => {
            const options = {
                headers: {"Authorization" : `Bearer ${session!.access_token}`},
            }
            const body = {
                account: {
                    accountId: uuid.v4(),
                    brandId: uuid.v4(),
                    userId: session!.userId,
                    oauthToken: router.query.oauth_token,
                    // oauthTokenSecret: router.query.oauth_token_secret,
                    oauthVerifier: router.query.oauth_verifier
                }
            };
            axios.post(`${NEXT_PUBLIC_PLATO_API_URL}/twitter/account/add/`, body, options);
            window.close();
        }
    )

  return null;
}
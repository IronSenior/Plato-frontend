import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as uuid from "uuid";


export default function LogIn() {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ session, loading ] = useSession();
    const router = useRouter()

    useEffect(
        () => {
            if (session) {
                const options = {
                    headers: {"Authorization" : `Bearer ${session.access_token}`},
                }
                const body = {
                    account: {
                        accountId: uuid.v4(),
                        brandId: router.query.brandId,
                        userId: session.userId,
                        oauthToken: router.query.oauth_token,
                        oauthVerifier: router.query.oauth_verifier
                    }
                };
                axios.post(`${NEXT_PUBLIC_PLATO_API_URL}/twitter/account/add/`, body, options);
                router.push(`/brand/${router.query.brandId}`);
            }
        },
        [session]
    )

  return null;
}
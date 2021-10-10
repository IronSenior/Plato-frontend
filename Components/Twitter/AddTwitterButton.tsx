import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import UserDTO from "../../models/userDTO";
import axios from "axios";
import { useRouter } from "next/router";


export const AddTwitterButton: React.FunctionComponent = () => {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [authUrl, setAuthUrl] = useState("");
    const [ session, loading ] = useSession();
    const router = useRouter();
    const { brandId } = router.query;

    const getAuthUrl = useCallback(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/account/token/request/?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fbrand%2Ftwitter%2Fadd%2F%3FbrandId%3D${brandId}`,
                    {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
                ).then(
                    (response) => {
                        setAuthUrl(response.data.authUrl);
                    }
                )
            }
        },
        [session]
    )
    
    useEffect(
        () => {
            if (session){
                getAuthUrl();
            }
        },
        [session]
    )

  return (
    <a href={authUrl}>Add Twitter</a>
  );
};
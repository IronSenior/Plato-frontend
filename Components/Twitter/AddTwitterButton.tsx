import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import UserDTO from "../../models/userDTO";
import axios from "axios";
import { useRouter } from "next/router";
import { TwitterLoginButton } from "react-social-login-buttons";
import { Button } from "@chakra-ui/button";


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
                    }
                )
            }
        },
        [loading]
    )
    
    useEffect(
        () => {
            if (session){
                getAuthUrl();
            }
        },
        [loading]
    )

  return (
        <a href={authUrl}>
            <TwitterLoginButton>
                <span>Añadir Twitter</span>
            </TwitterLoginButton>
        </a>
  );
};
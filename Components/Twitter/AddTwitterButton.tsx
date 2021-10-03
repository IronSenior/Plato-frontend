import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import UserDTO from "../../models/userDTO";
import axios from "axios";


export const AddTwitterButton: React.FunctionComponent = () => {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [authUrl, setAuthUrl] = useState("");
    const [ session, test ] = useSession();

    const getAuthUrl = useCallback(
        () => {
            axios.get(
                `${NEXT_PUBLIC_PLATO_API_URL}/twitter/account/token/request`,
                {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
            ).then(
                (response) => {
                    setAuthUrl(response.data.authUrl);
                }
            )
        },
        []
    )
    
    useEffect(
        () => {
            getAuthUrl();
        },
        []
    )

  return (
    <a href={authUrl}>Add Twitter</a>
  );
};
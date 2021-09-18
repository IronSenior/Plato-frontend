import axios from "axios";
import React, { useCallback } from "react";

import { LogInFormData, LogInForm } from "../Components/Login/LogInForm";


export default function LogIn() {

  const NEXT_PUBLIC_PLATO_API_URL = process.env.NEXT_PUBLIC_PLATO_API_URL;

  const onLogIn = useCallback(
    async (userData: LogInFormData) => {
        axios
            .post(`${NEXT_PUBLIC_PLATO_API_URL}/user/login/`, userData)
            .then((response) => {
                console.log(response);
            });
    },
    []
  );

  return <LogInForm onSubmitForm={onLogIn} />;
}
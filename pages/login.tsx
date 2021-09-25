import axios from "axios";
import React, { useCallback } from "react";
import { signIn } from "next-auth/client";
import Router from 'next/router'

import { LogInFormData, LogInForm } from "../components/Login/LogInForm";


export default function LogIn() {

  const onLogIn = useCallback(
    async (userData: LogInFormData) => {
        signIn("credentials", {redirect: false, ...userData});
        Router.push("/");
    },
    []
  );

  return <LogInForm onSubmitForm={onLogIn} />;
}
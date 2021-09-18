import axios from "axios";
import React, { useCallback } from "react";
import * as uuid from "uuid";

import { UserFormData, SignUpForm } from "../Components/SignUp/SignUpForm";


export default function SignUp() {
  const { NEXT_PUBLIC_PLATO_API_URL } = process.env;

  const onSignUp = useCallback(
    async (userData: UserFormData) => {
      const body = { user: { userId: uuid.v4(), ...userData } };
      await axios.post(`${NEXT_PUBLIC_PLATO_API_URL}/user/create/`, body);
    },
    []
  );

  return <SignUpForm onSubmitForm={onSignUp} />;
}
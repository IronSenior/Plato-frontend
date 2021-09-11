import axios from "axios";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as uuid from "uuid";

import { UserFormData, SignUpForm } from "./components/SignUpForm";


export default function SignUp() {
  const history = useHistory();

  const { REACT_APP_PLATO_API_URL } = process.env;

  const onSignUp = useCallback(
    async (userData: UserFormData) => {
      const body = { user: { userId: uuid.v4(), ...userData } };
      await axios.post(`${REACT_APP_PLATO_API_URL}/user/create/`, body);
      history.push("/");
    },
    [history]
  );

  return <SignUpForm onSubmitForm={onSignUp} />;
}
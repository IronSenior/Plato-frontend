import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import UserDTO from "../../Models/userDTO";

export type LogInFormData = {
    usermail: string;
    password: string;
}

type Props = {
    onSubmitForm(data: LogInFormData): void;
    user?: UserDTO;
};

export const LogInForm: React.FunctionComponent<Props> = ({ onSubmitForm, user }) => {
  const { handleSubmit, register, setValue } = useForm<LogInFormData>();

  useEffect(() => {
    if (user) {
      setValue("usermail", user.usermail);
      setValue("password", user.password);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit((contactData) => onSubmitForm(contactData))}>
      <label>
        Email{" "}
        <input {...register("usermail", { required: true })} type="email" />
      </label>
      <label>
        Password <input {...register("password", { required: true })} type="password" />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../models/userDTO";

export type UserFormData = {
    username: string;
    usermail: string;
    password: string;
}

type Props = {
    onSubmitForm(data: UserFormData): void;
    user?: UserDTO;
};

export const SignUpForm: React.FunctionComponent<Props> = ({ onSubmitForm, user }) => {
  const { handleSubmit, register, setValue } = useForm<UserFormData>();

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("usermail", user.email);
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
        Username{" "}
        <input {...register("username", { required: true })} type="text" />
      </label>
      <label>
        Password <input {...register("password", { required: true })} type="password" />
      </label>
      <input type="submit" value="Send" />
    </form>
  );
};
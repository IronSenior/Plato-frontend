import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export type BrandFormData = {
    name: string,
    image: string
}

type Props = {
    onSubmitForm(data: BrandFormData): void;
};

export const BrandForm: React.FunctionComponent<Props> = ({ onSubmitForm }) => {
  const { handleSubmit, register, setValue } = useForm<BrandFormData>();

  return (
    <form onSubmit={handleSubmit((brandData) => onSubmitForm(brandData))}>
      <label>
        Name{" "}
        <input {...register("name", { required: true })} type="text" />
      </label>
      <label>
        Image <input {...register("image", { required: true })} type="text" />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};
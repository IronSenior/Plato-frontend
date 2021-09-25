import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import * as uuid from "uuid";
import { BrandForm, BrandFormData } from "../../components/Brand/brandForm";

export default function CreateBrand() {

  const { NEXT_PUBLIC_PLATO_API_URL } = process.env;

  const onBrandCreate = useCallback(
    async (brandData: BrandFormData) => {
        const body = { 
            headers: {"Authorization" : `Bearer ${"hola"}`},
            brand: {id: uuid.v4(), userId: "hola", ...brandData}
        };
        axios.post(`${NEXT_PUBLIC_PLATO_API_URL}/brand/create/`, body);
    },
    [history]
  );

  return <BrandForm onSubmitForm={onBrandCreate} />;
}
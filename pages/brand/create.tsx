import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import * as uuid from "uuid";
import { BrandForm, BrandFormData } from "../../Components/Brand/brandForm";

export default function CreateBrand() {

  const { REACT_APP_PLATO_API_URL } = process.env;

  const onBrandCreate = useCallback(
    async (brandData: BrandFormData) => {
        const body = { 
            headers: {"Authorization" : `Bearer ${"hola"}`},
            brand: {id: uuid.v4(), userId: "hola", ...brandData}
        };
        axios.post(`${REACT_APP_PLATO_API_URL}/brand/create/`, body);
    },
    [history]
  );

  return <BrandForm onSubmitForm={onBrandCreate} />;
}
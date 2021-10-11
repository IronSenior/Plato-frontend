import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import * as uuid from "uuid";
import { BrandForm, BrandFormData } from "../../components/Brand/brandForm";

export default function CreateBrand() {

  const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
  const [ session, test ] = useSession();
  const router = useRouter()

  const onBrandCreate = useCallback(
    async (brandData: BrandFormData) => {
        const options = {
            headers: {"Authorization" : `Bearer ${session.access_token}`},
        }
        const body = {
            brand: {id: uuid.v4(), userId: session.userId, ...brandData}
        };
        axios.post(`${NEXT_PUBLIC_PLATO_API_URL}/brand/create/`, body, options);
        router.push("/brand")
    },
    []
  );

  return <BrandForm onSubmitForm={onBrandCreate} />;
}
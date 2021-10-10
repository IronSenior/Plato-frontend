import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link';


export default function Brands() {

    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ brands, setBrands ] = useState([]);
    const [ session, loading ] = useSession();
    const router = useRouter();
    const { brandId } = router.query;

    useEffect(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/brand/user/${session.userId}/`,
                    {headers: {"Authorization" : `Bearer ${session.access_token}`}}
                ).then(
                    (response) => {
                        setBrands(response.data);
                    }
                )
            }
        },
        [session]
    )

    return (
        <div>
            {brands.map((brand, index) => (  
                <Link href={`/brand/${brand.brandId}`}>
                    <a>{brand.name}</a>
                </Link>
            ))}  
        </div>
    );
}
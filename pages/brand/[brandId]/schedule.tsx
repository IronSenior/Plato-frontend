import axios from "axios";
import React, { useCallback, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import Router, { useRouter } from 'next/router'
import * as uuid from "uuid";

import { ScheduleFormData, ScheduleForm } from "../../../components/Brand/scheduleForm";


function parseDate(date: string, time: string) {
    const dateTime = Date.parse(`${date} ${time}`);
    return dateTime;
}


export default function Schedule() {

    const [session, loading] = useSession();
    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const router = useRouter();
    const { brandId } = router.query;

    const onSchedule = useCallback(
        async (publicationData: ScheduleFormData) => {
            const options = {
                headers: {"Authorization" : `Bearer ${session!.access_token}`},
            }
            // This is a temporal solution to convert string date to timestamp
            const publicationDateTime = parseDate(
                publicationData.publicationDate,
                publicationData.publicationTime
            )
            const body = {
                tweet: {
                    tweetId: uuid.v4(),
                    accountId: router.query.accountId,
                    publicationDate: publicationDateTime,
                    description: publicationData.description
                }
            };
            console.log(body);
            axios.post(`${NEXT_PUBLIC_PLATO_API_URL}/twitter/tweet/schedule/`, body, options);
            router.push(`/brand/${brandId}`);
        },
        []
    );

    return <ScheduleForm onSubmitForm={onSchedule}/>;
}
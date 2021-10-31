import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";
import { ReportPoint, getEmptyReport, Series, getTimeAxes, getValueAxes } from "../../utils/report";


type Props = {
    tweetId: string;
};

function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
}

export const TweetReport: React.FunctionComponent<Props> = ({ tweetId }) => {
    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ reports, setReports ] = useState<ReportPoint[]>([]);
    const [ session, loading ] = useSession();
    const router = useRouter();

    useEffect(
        () => {
            if (session) {
                const lastWeek = getLastWeek().getTime() / 1000
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/tweet/${tweetId}/report/?sinceDate=${lastWeek}`,
                    {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
                ).then(
                    (response) => {
                        setReports(response.data);
                    }
                ).catch(
                    (error) => {
                        if (error.response){
                            if(error.response.status >= 400){
                                router.push("/login");
                                signOut();
                            }
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                        setReports([]);
                    }
                )
            }
        },
        [session, tweetId]
    )

    const primaryAxis = getTimeAxes();
    const secondaryAxes = getValueAxes();

    if (!session || !reports.length) {
        return (<Spinner />);
    }

    const chartData: Series[] = getEmptyReport([
        "Retweets", "Likes", "Impresiones",
        "Clicks en perfil", "Respuestas", "Citas"
    ])
    const [
        retweets, likes, impressions,
        profileClicks, replies, quotes
    ] = chartData;

    reports.forEach(
        (report: ReportPoint) => {
            retweets.data.push({
                reportDate: new Date(report.reportDate),
                value: report.retweetCount
            })
            likes.data.push({
                reportDate: new Date(report.reportDate),
                value: report.favCount
            })
            impressions.data.push({
                reportDate: new Date(report.reportDate),
                value: Math.ceil(report.impressionCount/100)
            })
            profileClicks.data.push({
                reportDate: new Date(report.reportDate),
                value: report.profileClickCount
            })
            replies.data.push({
                reportDate: new Date(report.reportDate),
                value: report.replyCount
            })
            quotes.data.push({
                reportDate: new Date(report.reportDate),
                value: report.quoteCount
            })
        }
    )


    return (
        <Chart
            options={{
                data: chartData,
                primaryAxis,
                secondaryAxes,
            }}
        />
    );
}
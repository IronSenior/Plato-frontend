import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";


type TweetReport = {
    reportDate: Date,
    retweetCount: number,
}

type Series = {
    label: string,
    data: TweetReport[]
}

type Props = {
    tweetId: string;
};


export const TweetReport: React.FunctionComponent<Props> = ({ tweetId }) => {
    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ reports, setReports ] = useState<TweetReport[]>([]);
    const [ session, loading ] = useSession();
    const router = useRouter();

    useEffect(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/report/${tweetId}/`,
                    {headers: {"Authorization" : `Bearer ${session!.access_token}`}}
                ).then(
                    (response) => {
                        setReports(response.data);
                    }
                ).catch(
                    (error) => {
                        setReports([]);
                    }
                )
            }
        },
        [session]
    )

    const chartData: Series[] = [{
        label: "Retweets",
        data: []
    }]
    reports.forEach(
        (report: TweetReport) => {
            chartData[0].data.push({
                reportDate: new Date(report.reportDate),
                retweetCount: report.retweetCount
            })
        }
    )

    chartData.push({
        label: "Likes",
        data: []
    });
    reports.forEach(
        (report: TweetReport) => {
            chartData[1].data.push({
                reportDate: new Date(report.reportDate),
                retweetCount: report.favCount
            })
        }
    )

    chartData.push({
        label: "Impressions",
        data: []
    });
    reports.forEach(
        (report: TweetReport) => {
            chartData[2].data.push({
                reportDate: new Date(report.reportDate),
                retweetCount: report.impressionCount/100
            })
        }
    )

    chartData.push({
        label: "Profile Clicks",
        data: []
    });
    reports.forEach(
        (report: TweetReport) => {
            chartData[3].data.push({
                reportDate: new Date(report.reportDate),
                retweetCount: report.profileClickCount
            })
        }
    )

    chartData.push({
        label: "Reply Count",
        data: []
    });
    reports.forEach(
        (report: TweetReport) => {
            chartData[4].data.push({
                reportDate: new Date(report.reportDate),
                retweetCount: report.replyCount
            })
        }
    )

    const primaryAxis = useMemo(
        (): AxisOptions<TweetReport> => ({
          getValue: datum => datum.reportDate,
          scaleType: "time"
        }),
        []
    )
    
    const secondaryAxes = useMemo(
        (): AxisOptions<TweetReport>[] => [{
            getValue: datum => datum.retweetCount,
        }],
        []
    )

    if (!session || !reports.length) {
        return (<Spinner />);
    }

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
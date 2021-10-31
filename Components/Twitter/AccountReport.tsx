import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";
import { getEmptyReport, getTimeAxes, getValueAxes, ReportPoint, Series } from "../../utils/report";


type Props = {
    accountId: string;
};

function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
}

export const AccountReport: React.FunctionComponent<Props> = ({ accountId }) => {
    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ reports, setReports ] = useState<ReportPoint[]>([]);
    const [ session, loading ] = useSession();
    const router = useRouter();

    useEffect(
        () => {
            if (session) {
                const lastWeek = getLastWeek().getTime() / 1000;
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/account/${accountId}/report/?sinceDate=${lastWeek}`,
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
        [session, accountId]
    )

    const primaryAxis = getTimeAxes();
    const secondaryAxes = getValueAxes();

    if (!session || !reports.length) {
        return (<Spinner />);
    }
    
    const chartData: Series[] = getEmptyReport(["Seguidores", "Siguiendo"])
    const [followers, friends] = chartData;
    reports.forEach(
        (report: ReportPoint) => {
            followers.data.push({
                reportDate: new Date(report.reportDate),
                value: report.followersCount
            });
            friends.data.push({
                reportDate: new Date(report.reportDate),
                value: report.friendsCount
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
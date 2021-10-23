import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";


type AccountReport = {
    reportDate: Date,
    valueCount: number,
}

type Series = {
    label: string,
    data: AccountReport[]
}

type Props = {
    accountId: string;
};


export const AccountReport: React.FunctionComponent<Props> = ({ accountId }) => {
    const { NEXT_PUBLIC_PLATO_API_URL } = process.env;
    const [ reports, setReports ] = useState<AccountReport[]>([]);
    const [ session, loading ] = useSession();

    useEffect(
        () => {
            if (session) {
                axios.get(
                    `${NEXT_PUBLIC_PLATO_API_URL}/twitter/account/${accountId}/report/`,
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
        [session, accountId]
    )
    
    const chartData: Series[] = [{
        label: "Seguidores",
        data: []
    }]
    reports.forEach(
        (report: AccountReport) => {
            chartData[0].data.push({
                reportDate: new Date(report.reportDate),
                valueCount: report.followersCount
            })
        }
    )

    chartData.push({
        label: "Siguiendo",
        data: []
    });
    reports.forEach(
        (report: AccountReport) => {
            chartData[1].data.push({
                reportDate: new Date(report.reportDate),
                valueCount: report.friendsCount
            })
        }
    )

    const primaryAxis = useMemo(
        (): AxisOptions<AccountReport> => ({
          getValue: datum => datum.reportDate,
          scaleType: "time"
        }),
        []
    )
    
    const secondaryAxes = useMemo(
        (): AxisOptions<AccountReport>[] => [{
            getValue: datum => datum.valueCount,
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
import { useMemo } from "react"
import { AxisOptions } from "react-charts"

export type ReportPoint = {
    reportDate: Date,
    value: number,
}

export type Series = {
    label: string,
    data: ReportPoint[]
}

export function getTimeAxes() {
    return useMemo(
        (): AxisOptions<ReportPoint> => ({
            getValue: datum => datum.reportDate,
            scaleType: "time"
        }),
        []
    )
}

export function getValueAxes() {
    return useMemo(
        (): AxisOptions<ReportPoint>[] => [{
            getValue: datum => datum.value,
        }],
        []
    )
}

export function getEmptyReport(categories: Array<string>): Series[] {
    const reportData: Series[] = []
    categories.forEach(
        (category) => {
            reportData.push({
                label: category,
                data: []
            })
        }
    )
    return reportData;
}
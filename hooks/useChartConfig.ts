import { useMemo } from "react";

type DataType = "time" | "ordinal" | "linear";
type ElementType = "line" | "area" | "bar"

interface ChartConfig {
  rows: any[]
  columnNames: string[]
  dataType: DataType
  elementType: ElementType
}

const MAX_RESULTS = 5000

export const useChartConfig = (config: ChartConfig) => {
  const { rows, columnNames, dataType, elementType } = config

  const primaryAxis = useMemo(() => ({
    getValue: datum => {
      switch (dataType) {
        case "time":
          return new Date(Date.parse(datum[columnNames[0]]))
        default:
          return datum[columnNames[0]]
      }
    },
  }), [columnNames, dataType])

  const secondaryAxes = useMemo(() => ([
    {
      getValue: datum => {
        return datum[columnNames[1]]
      },
      type: elementType
    },
  ]), [columnNames, elementType])

  const data = useMemo(() => (
      dataType === "time"
      ? rows
          ?.sort((a, b) => primaryAxis.getValue(a).getTime() - primaryAxis.getValue(b).getTime())
          ?.slice(-MAX_RESULTS)
      : rows
    ), [rows, dataType])

  return {
    primaryAxis,
    secondaryAxes,
    data
  }
}
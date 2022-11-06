import { capitalize } from "./utils";
import { useChartConfig } from "../hooks/useChartConfig";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

export const DuneChartLine = ({ title, rows, columns }) => {
  const { primaryAxis, secondaryAxes, data } = useChartConfig({
    rows,
    columnNames: columns,
    dataType: "time",
    elementType: "line"
  })

  // @ts-ignore
  return <Chart
    options={{
      data: [{
        label: capitalize(title),
        data
      }],
      primaryAxis,
      secondaryAxes,
      padding: {
        bottom: 64,
        top: 16,
        left: 24,
        right: 24
      },
      initialWidth: 500,
      initialHeight: 280,
      defaultColors: ["#E0694A"],
    }}
  />
}

export default DuneChartLine
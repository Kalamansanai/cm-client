import { useTheme } from "@mui/material";
import { ComputedDatum, ResponsiveBar } from "@nivo/bar";
import { useContext } from "react";
import { barChartDataWrapper } from "../components/componentUtils";
import { LocationContext } from "../scenes/dashboard/NewDashboard";
import { tokens } from "../theme";

const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { location } = useContext(LocationContext);

  const data = barChartDataWrapper(location?.monthly_logs);

  if (!data) {
    return null;
  }

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      keys={["water", "electricity", "gas"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.45}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "water",
          },
          id: "dots",
        },
        {
          match: {
            id: "gas",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "month",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "consumption",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(
        data: ComputedDatum<{
          month: string;
          water: number;
          waterColor: string;
          electricity: number;
          electricityColor: string;
          gas: number;
          gasColor: string;
        }>,
      ) =>
        data.id + ": " + data.formattedValue + " in country: " + data.indexValue
      }
    />
  );
};

export default BarChart;

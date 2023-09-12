import { Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useContext } from "react";
import { barChartDataWrapper } from "../components/componentUtils";
import configJson from "../data/barchartConfig.json";
import { LocationContext } from "../scenes/dashboard/NewDashboard";
import { tokens } from "../theme";
import { IBarChartConfig } from "../types";

const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { location } = useContext(LocationContext);

  const data = barChartDataWrapper(location?.monthly_logs);
  const config: IBarChartConfig = configJson;

  if (!data) {
    return <>No data is available</>;
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography height="10%" variant="h3" mt="10px">
        {config.title}
      </Typography>
      <div
        style={{
          height: "90%",
          width: "100%",
        }}
      >
        <ResponsiveBar
          data={data}
          label={(bar: any) => `${bar.value}${config.label}`}
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
          keys={config.keys}
          indexBy={config.indexBy}
          margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
          padding={0.45}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "dark2" }}
          // defs={[
          //   {
          //     id: "dots",
          //     type: "patternDots",
          //     background: "inherit",
          //     color: "rgba(255, 255, 255, 0.3)",
          //     size: 4,
          //     padding: 1,
          //     stagger: true,
          //   },
          //   {
          //     id: "lines",
          //     type: "patternLines",
          //     background: "inherit",
          //     color: "rgba(255, 255, 255, 0.9)",
          //     rotation: -95,
          //     lineWidth: 6,
          //     spacing: 10,
          //   },
          // ]}
          fill={[
            {
              match: {
                id: "electricity",
              },
              id: "dots",
            },
            {
              match: {
                id: "gas",
              },
              id: "lines",
            },
            {
              match: {
                id: "wate",
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
            legend: config.bottomLegend,
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: config.leftLegend,
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 3.6]],
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
          ariaLabel="Monthly consumption bar chart"
        />
      </div>
    </div>
  );
};

export default BarChart;

import { CircularProgress, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useContext, useMemo, useState } from "react";
import { ApiResponse } from "../apis/api.util";
import { GetPieCostChartData } from "../apis/data_api";
import { GlobalContext } from "../App";
import configJson from "../data/piechartConfig.json";
import { LocationContext } from "../scenes/dashboard/NewDashboard";
import { tokens } from "../theme";
import { customColors, IPieChartConfig, PieData } from "../types";
import { allZero } from "./componentUtils";
import CustomTooltip from "./CustomTooltip";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState<PieData[]>([]);
  const { location } = useContext(LocationContext);
  const config: IPieChartConfig = configJson;
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(GlobalContext);

  useMemo(async () => {
    setLoading(true);
    if (location) {
      const response: ApiResponse = await GetPieCostChartData(location.id);
      const data = response.Unwrap(setUser);
      if (data) {
        const order = ["gas", "water", "electricity"];
        const sortedData = data.sort((a: PieData, b: PieData) => {
          return order.indexOf(a.id) - order.indexOf(b.id);
        });
        setData(sortedData);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <CircularProgress sx={{ color: `${colors.grey[100]}` }} />;
  }

  if (data.length == 0) {
    return <>No data is available</>;
  }

  if (allZero(data)) {
    return <>There is no data to display</>;
  }

  const formattedData = data.map((item) => ({
    ...item,
    label: `${item.id}: ${item.value} Ft`,
  }));

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
        <ResponsivePie
          data={formattedData}
          valueFormat={(value) => `${value} Ft`}
          tooltip={({ datum }) => (
            <CustomTooltip
              id={datum.id}
              value={datum.value}
              color={datum.color}
              symbol=" Ft"
            />
          )}
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
          }}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={(bar) => customColors[bar.id] || "#000000"}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolShape: "circle",
              symbolSize: 20,
              toggleSerie: true,
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
        />
      </div>
    </div>
  );
};

export default PieChart;

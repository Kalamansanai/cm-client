import { useTheme } from "@mui/material";
import React from "react";

interface PayloadEntry {
  name: string;
  value: number;
  color: string;
}

type CustomTooltipProps = {
  id?: string | number;
  value?: string | number;
  color?: string;
  symbol?: string;
  additionalInfo?: string;
  type?: "recharts" | "nivo";
  active?: boolean;
  payload?: PayloadEntry[];
  label?: any;
  children?: any;
};

const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const {
    id,
    value,
    color,
    symbol = "",
    type,
    active,
    payload,
    label,
    children,
  } = props;
  const theme = useTheme();

  let formattedValue =
    typeof value === "number" ? value.toFixed(3).replace(".", ",") : value;

  if (type === "recharts") {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: theme.palette.mode === "dark" ? "#ecebeb" : "#1F2A40",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {payload.map((entry: PayloadEntry, index: number) => (
            <div key={`item-${index}`} style={{ color: entry.color }}>
              <strong>{entry.name}</strong>
              {`: ${entry.value.toFixed(3).replace(".", ",")}`}
            </div>
          ))}
          {children}
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div
      style={{
        background: theme.palette.mode === "dark" ? "#ecebeb" : "#1F2A40",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <span style={{ color: color }}>
        <strong>{id}</strong>
        {`: ${formattedValue}${symbol} `}
      </span>
      {children}
    </div>
  );
};

export default CustomTooltip;

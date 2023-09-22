import { useTheme } from "@mui/material";
import React from "react";

type CustomTooltipProps = {
  id: string | number;
  value: string | number;
  color: string;
  symbol?: string;
  additionalInfo?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const { id, value, color, symbol = "", additionalInfo = "" } = props;
  const theme = useTheme();

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
        {`: ${value}${symbol} ${additionalInfo}`}
      </span>
    </div>
  );
};

export default CustomTooltip;

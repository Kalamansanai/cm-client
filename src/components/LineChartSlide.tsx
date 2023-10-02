import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { ILineChartResponse } from "types";
import NewLineChart from "./NewLineChart";

type Props = {
  data: ILineChartResponse[];
};

export default function LineChartSlide({ data }: Props) {
  const [index, setIndex] = useState(0);
  const max = data.length - 1;
  const typeNames = ["Water", "Electricity", "Gas"];

  function handlePrevClick() {
    if (index == 0) {
      setIndex(max);
    } else {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (index == max) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ height: "100%", width: "100%" }}
    >
      <Typography variant="h3">{typeNames[index]}</Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", width: "100%" }}
      >
        <IconButton onClick={handlePrevClick}>
          <ArrowBackIosNew />
        </IconButton>
        <NewLineChart response_data={data[index]} />
        <IconButton onClick={handleNextClick}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
}

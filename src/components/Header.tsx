import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  detectorName?: string;
  align?: "left" | "right" | "center";
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  align = "left",
  detectorName,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        align={align}
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 0 0" }}
      >
        {title}
        {detectorName ? `, ${detectorName}` : ""}
      </Typography>
      <Typography align={align} variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

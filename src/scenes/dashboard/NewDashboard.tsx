import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { IDashboardCardConfig, IDashboardLayoutConfig, ILocation } from "types";
import { ApiResponse } from "../../apis/api.util";
import { GetLocation } from "../../apis/location_api";
import { GlobalContext } from "../../App";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import layoutConfigJson from "../../data/layout.json";
import { tokens } from "../../theme";
import getCardComponentByType from "./dashboard.utils";

export const LocationContext = createContext<{
  location: ILocation | null;
}>({
  location: null,
});

export default function NewDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const layoutConfig: IDashboardLayoutConfig = layoutConfigJson;

  const { user, setUser } = useContext(GlobalContext);
  const [location, setLocation] = useState<ILocation | null>(null);

  async function SetLocation() {
    if (user) {
      const response: ApiResponse = await GetLocation();
      const location: ILocation = response.Unwrap(setUser);
      if (location) {
        setLocation(location);
      }
    }
  }

  useEffect(() => {
    SetLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="10%"
          width="100%"
        >
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <Box>
            <CustomButton
              icon={<DownloadOutlinedIcon />}
              text="Download Reports"
              color={colors.blueAccent[600]}
              secondColor={colors.blueAccent[500]}
            />
          </Box>
        </Box>
        <Grid
          container
          spacing={0}
          width="100%"
          display="flex"
          justifyContent="flex-start"
        >
          {layoutConfig &&
            layoutConfig.cards.map((card, i) => (
              <Card key={i} card={card} level={0} />
            ))}
        </Grid>
      </Box>
    </LocationContext.Provider>
  );
}

type Props = {
  card: IDashboardCardConfig;
  level: number;
};

function Card({ card, level }: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { location } = useContext(LocationContext);
  const component: JSX.Element | undefined = getCardComponentByType(
    card.componentType,
  );

  const cardHeight = 200 * card.heightLevel;
  const divideLevel = card.divideLevel;
  return (
    <Grid
      item
      xs={card.size.xs}
      sm={card.size.sm}
      md={card.size.md}
      lg={card.size.lg}
      xl={card.size.xl}
    >
      {!card.children ? (
        <Box
          height={`${cardHeight / divideLevel ** level}px`}
          sx={{ borderRadius: "5px", padding: "5px" }}
        >
          <Box
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={"5px !important"}
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "10px",
            }}
          >
            {location ? (
              component
            ) : (
              <CircularProgress sx={{ color: `${colors.grey[100]}` }} />
            )}
          </Box>
        </Box>
      ) : (
        <Grid container item spacing={0}>
          {card.children.map((child: IDashboardCardConfig, i) => (
            <Card key={i} card={child} level={level + 1} />
          ))}
        </Grid>
      )}
    </Grid>
  );
}

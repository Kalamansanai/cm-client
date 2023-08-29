import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, Button, CircularProgress, Grid, useTheme } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { IDashboardCardConfig, IDashboardLayoutConfig, ILocation } from "types";
import { GetLocation } from "../../apis/location_api";
import { GlobalContext } from "../../App";
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

  const { user } = useContext(GlobalContext);
  const [location, setLocation] = useState<ILocation | null>(null);

  async function SetLocation() {
    if (user) {
      const response: ILocation = await GetLocation();
      setLocation(response);
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
            <Button
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
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

  const cardHeight = 200;
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
          height={`${cardHeight / 2 ** level}px`}
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
              getCardComponentByType(card.componentType)
            ) : (
              <CircularProgress sx={{ color: "white" }} />
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

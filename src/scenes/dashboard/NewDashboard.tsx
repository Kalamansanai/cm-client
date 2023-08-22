import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, Button, Grid } from "@mui/material";
import { IDashboardCardConfig, IDashboardLayoutConfig } from "types";
import Header from "../../components/Header";
import layoutConfigJson from "../../data/layout.json";
import getCardComponentByType from "./dashboard.utils";

export default function NewDashboard() {
  const layoutConfig: IDashboardLayoutConfig = layoutConfigJson;

  return (
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
              backgroundColor: "black",
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
  );
}

type Props = {
  card: IDashboardCardConfig;
  level: number;
};

function Card({ card, level }: Props) {
  const cardHeight = 400;
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
            sx={{ backgroundColor: "black", borderRadius: "10px" }}
          >
            {getCardComponentByType(card.componentType)}
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

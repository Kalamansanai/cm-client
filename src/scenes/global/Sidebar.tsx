import {
  BarChartOutlined as BarChartOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  MenuOpen as MenuOpenIcon,
  MenuOutlined as MenuOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  PieChartOutlineOutlined as PieChartOutlineOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  TimelineOutlined as TimelineOutlinedIcon,
} from "@mui/icons-material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Avatar,
  Box,
  IconButton,
  PaletteMode,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useMemo, useRef, useState } from "react";
import { Menu, MenuItem, Sidebar as SB } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { tokens } from "../../theme";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Item: React.FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isActive = selected === title;

  return (
    <MenuItem
      active={isActive}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const setCollapsedAndSave =
  (setIsCollapsed: (arg0: any) => void) => (isCollapsed: any) => {
    setIsCollapsed(isCollapsed);
    localStorage.setItem("sidebarIsCollapsed", JSON.stringify(isCollapsed));
  };

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(GlobalContext);
  const setIsCollapsedAndSave = useMemo(
    () => setCollapsedAndSave(setIsCollapsed),
    [setIsCollapsed],
  );

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) {
      return names[0][0].toUpperCase();
    } else if (names.length > 1) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return "";
  };

  const useUserColor = (name: string) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const colorsList = useMemo(
      () => [
        colors.greenAccent[300],
        colors.greenAccent[400],
        colors.greenAccent[500],
        colors.greenAccent[600],
        colors.redAccent[300],
        colors.redAccent[400],
        colors.redAccent[500],
        colors.redAccent[600],
        colors.blueAccent[300],
        colors.blueAccent[400],
        colors.blueAccent[500],
        colors.blueAccent[600],
      ],
      [colors],
    );

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    const index = Math.abs(hash % colorsList.length);
    return colorsList[index];
  };
  const userColor = useUserColor(`${user?.name}`);

  return (
    <SB
      style={{
        minWidth: isCollapsed ? 80 : 240,
        borderColor: colors.grey[200],
        height: "100vh",
        position: "absolute",
        zIndex: isCollapsed ? 0 : 1,
        transition: "all 0.2s ease-out",
      }}
      backgroundColor={`${colors.primary[400]}`}
      collapsed={isCollapsed}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              color: active
                ? "#6870fa !important"
                : `${colors.grey[200]} !important`,
              "&:hover": {
                backgroundColor: "#335B8C !important",
                color: "#868dfb !important",
                borderRadius: "8px !important",
                fontWeight: "bold !important",
              },
            };
          },
        }}
      >
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsedAndSave(!isCollapsed)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          icon={
            isCollapsed ? (
              isHovered ? (
                <MenuOpenIcon sx={{}} />
              ) : (
                <MenuOutlinedIcon sx={{}} />
              )
            ) : undefined
          }
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
            display: "flex",
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" fontWeight={600}>
                Consumption Meter
              </Typography>
              <IconButton
                onClick={() => {
                  setIsCollapsedAndSave((prevState: any) => !prevState);
                  setIsHovered(false);
                }}
              >
                {isHovered ? <MenuOpenIcon /> : <MenuOutlinedIcon />}
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {user && !isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar
                sx={{ width: 50, height: 50, backgroundColor: userColor }}
              >
                {getInitials(user?.name)}
              </Avatar>
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.greenAccent[500]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {user?.name}
              </Typography>
            </Box>
          </Box>
        )}

        <Box>
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Data
          </Typography>

          <Item
            title="Detectors"
            to="/detectors"
            icon={<VideocamIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Pages
          </Typography>
          <Item
            title="Login"
            to="/login"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Registration"
            to="/registration"
            icon={<PersonAddAltOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Charts
          </Typography>
          <Item
            title="Bar Chart"
            to="/bar"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Pie Chart"
            to="/pie"
            icon={<PieChartOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Line Chart"
            to="/line"
            icon={<TimelineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </SB>
  );
};

export default Sidebar;

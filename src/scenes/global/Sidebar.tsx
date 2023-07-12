import React, { useState } from "react";
import { Sidebar as SB, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { HomeOutlined as HomeOutlinedIcon } from "@mui/icons-material";
import { PeopleOutlined as PeopleOutlinedIcon } from "@mui/icons-material";
import { ReceiptOutlined as ReceiptOutlinedIcon } from "@mui/icons-material";
import { PersonOutlined as PersonOutlinedIcon } from "@mui/icons-material";
import { BarChartOutlined as BarChartOutlinedIcon } from "@mui/icons-material";
import { PieChartOutlineOutlined as PieChartOutlineOutlinedIcon } from "@mui/icons-material";
import { TimelineOutlined as TimelineOutlinedIcon } from "@mui/icons-material";
import { MenuOutlined as MenuOutlinedIcon } from "@mui/icons-material";
import { MenuOpen as MenuOpenIcon } from "@mui/icons-material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
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

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SB
      style={{ border: "none" }}
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
          onClick={() => setIsCollapsed(!isCollapsed)}
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
                  setIsCollapsed((prevState) => !prevState);
                  setIsHovered(false);
                }}
              >
                {isHovered ? <MenuOpenIcon /> : <MenuOutlinedIcon />}
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Profile Name
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
            title="Data Grid"
            to="/grid"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
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

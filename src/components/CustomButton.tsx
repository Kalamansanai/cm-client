import {
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

interface CustomButtonProps {
  icon: React.ReactNode;
  text: string;
  onClickHandler?: () => void;
  color: string;
  secondColor: string;
  loading?: boolean;
}

const StyledButton = styled(Button)<{ colorProp: string; secondColor: string }>`
  background-color: ${(props) => props.colorProp};
  color: ${(props) => props.theme.palette.grey[100]};
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 10px 10px 10px;

  &:hover {
    background-color: ${(props) => props.secondColor};
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    min-width: 32px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  text,
  onClickHandler,
  color,
  secondColor,
  loading,
}) => {
  const theme = useTheme();
  const isIconSize = useMediaQuery(theme.breakpoints.down("lg"));

  const buttonContent = loading ? (
    <CircularProgress sx={{ color: `${theme.palette.grey[100]}` }} />
  ) : (
    <>
      {React.cloneElement(icon as React.ReactElement, {
        sx: { mr: !isIconSize ? "10px" : "" },
      })}
      {!isIconSize && <span>{text}</span>}
    </>
  );

  return (
    <StyledButton
      colorProp={color}
      secondColor={secondColor}
      onClick={onClickHandler}
    >
      {buttonContent}
    </StyledButton>
  );
};

export default CustomButton;

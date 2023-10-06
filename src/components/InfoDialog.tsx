import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, IconButton, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { tokens } from "../theme";

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  detector: {
    type: string;
    detector_id: string;
  };
  data: {
    char_num: number;
    coma_position: number;
  };
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  open,
  onClose,
  detector,
  data,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          fontSize: 25,
          alignItems: "center",
          m: 0,
          p: 2,
        }}
      >
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <InfoOutlinedIcon
            sx={{ fontSize: 25, color: colors.greenAccent[500] }}
          />
          <Typography
            sx={{ fontSize: 25, color: colors.greenAccent[500], marginLeft: 1 }}
          >
            Detector Information
          </Typography>
        </Box>
        <Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 7,
              right: 19,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Box
          mb={2}
          mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Typography
            sx={{ color: colors.grey[100], marginRight: 1, fontSize: 16 }}
          >
            Detector type:
          </Typography>
          <Typography sx={{ fontSize: 16 }}> {detector.type}</Typography>
        </Box>
        <Divider />
        <Box
          mb={2}
          mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Typography
            sx={{ color: colors.grey[100], marginRight: 1, fontSize: 16 }}
          >
            Mac address:
          </Typography>
          <Typography sx={{ fontSize: 16 }}> {detector.detector_id}</Typography>
        </Box>
        <Divider />
        <Box
          mb={2}
          mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Typography
            sx={{ color: colors.grey[100], marginRight: 1, fontSize: 16 }}
          >
            Char number:
          </Typography>
          <Typography sx={{ fontSize: 16 }}> {data.char_num}</Typography>
        </Box>
        <Divider />
        <Box
          mb={2}
          mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Typography sx={{ color: colors.grey[100], marginRight: 1 }}>
            Coma position:
          </Typography>
          <Typography sx={{ fontSize: 16 }}> {data.coma_position}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;

import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteDetector } from "../../apis/detector_api";
import { User } from "../../types";
import { GlobalContext } from "../../App";
import { tokens } from "../../theme";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        m: 0,
        p: 2,
        fontSize: 25,
        color: colors.redAccent[500],
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type deleteProps = {
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  detector_id: string;
};

export default function DeletePopup({
  openPopup,
  setOpenPopup,
  detector_id,
}: deleteProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext);

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleDelete = async () => {
    await DeleteDetector(detector_id);

    const updatedDetectors = (user?.detectors || []).filter(
      (detector) => detector.detector_id !== detector_id
    );

    const updatedUser: User = {
      ...(user as User),
      detectors: updatedDetectors,
    };

    setUser(updatedUser);
    navigate("/detectors");
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Delete this detector
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography
            sx={{ textAlign: "justify", textJustify: "inter-word", margin: 2 }}
            gutterBottom
          >
            Are you sure you want to delete this detector ? Deleting a detector
            is permanent, and you wont be able to use this device, only if you
            add it again.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button sx={{ color: colors.blueAccent[500] }} onClick={handleClose}>
            No, keep it.
          </Button>
          <Button sx={{ color: colors.redAccent[500] }} onClick={handleDelete}>
            Yes, delete.
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

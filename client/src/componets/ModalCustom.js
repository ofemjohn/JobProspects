import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginForm from "../componets/Login/LoginForm";
import Signup from "../componets/Signup/Signup";
import Modal, { modalClasses } from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalCustom = ({ open, setOpen, type, setType }) => {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon sx={{ fontSize: "40px", color: "#008080" }} />
          </IconButton>
          {type === "login" ? (
            <LoginForm setType={setType} />
          ) : (
            <Signup setType={setType} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCustom;

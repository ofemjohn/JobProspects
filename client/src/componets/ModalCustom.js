import * as React from "react";
import Box from "@mui/material/Box";
import LoginForm from "../componets/Login/LoginForm";
import Signup from "../componets/Signup/Signup";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompanyLogin from "./Login/CompanyLogin";

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
            <LoginForm setType={setType} setOpen={setOpen} />
          ) : type === "signup" ? (
            <Signup setType={setType} />
          ) : (
            <CompanyLogin setType={setType} setOpen={setOpen} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCustom;

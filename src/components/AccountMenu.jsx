import * as React from "react";

import styled from "styled-components";

import { singOut } from "../backend/controllers/usuarios";

import Box from "@mui/material/Box";
import EditNotificationsRoundedIcon from "@mui/icons-material/EditNotificationsRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickPerfil = () => {
    window.location.href = "/perfil";
  };

  const handleClickReglamento = () => {
    window.location.href = "/reglamento";
  };

  const handleClickManual = () => {
    window.location.href = "/manual";
  };

  const handleSingOut = () => {
    singOut().then(() => {
      window.location.href = "/";
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip color="primary" title="Menu" placement="right">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Img src="./book-User-Icon.svg" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={(handleClose, handleClickPerfil)}>
          <LocalLibraryRoundedIcon /> Mi Perfil
        </MenuItem>

        <MenuItem onClick={(handleClose, handleClickReglamento)}>
          <EditNotificationsRoundedIcon />
          Reglamento
        </MenuItem>
        <MenuItem onClick={(handleClose, handleClickManual)}>
          {/* <TaskRoundedIcon /> */}
          <RecentActorsIcon />
          Manual de Usuario
        </MenuItem>

        {/* <MenuItem onClick={handleClose}>
          <MenuBookRoundedIcon />
          Mis Reservas
        </MenuItem> */}
        <Divider />

        <MenuItem onClick={(handleClose, handleSingOut)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;

const Img = styled.img`
  width: 34px;
`;

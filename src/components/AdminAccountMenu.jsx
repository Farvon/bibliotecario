import * as React from "react";
import styled from "styled-components";

import { singOut } from "../backend/controllers/usuarios";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

const AdminAccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDocument = () => {
    window.location.href = "/documentacion";
  };

  const handleSingOut = () => {
    singOut().then(() => {
      window.location.reload();
    });
  };
  return (
    <React.Fragment>
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
            {/* <Avatar sx={{ width: 30, height: 30 }}>M</Avatar> */}
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
        {/* <MenuItem onClick={handleClose}>
          <LocalLibraryRoundedIcon /> Mis Datos
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MenuBookRoundedIcon />
          Mis Reservas
        </MenuItem>
        <Divider /> */}

        <MenuItem onClick={(handleClose, handleDocument)}>
          <ListItemIcon>
            <SummarizeIcon fontSize="small" />
          </ListItemIcon>
          Documentación del Proyecto
        </MenuItem>
        <MenuItem onClick={(handleClose, handleSingOut)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AdminAccountMenu;

const Img = styled.img`
  width: 34px;
`;

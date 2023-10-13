import * as React from "react";

import HojaPerfil from "./HojaPerfil";
import MisRetiros from "./MisRetiros";
import MisReservas from "./MisReservas";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { brown } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";

const theme = createTheme({
  palette: {
    primary: brown,
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserBasicTabs({ user }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            indicatorColor="primary"
          >
            <Tab
              icon={<LocalLibraryRoundedIcon />}
              label="Perfil"
              {...a11yProps(0)}
            />
            <Tab
              icon={<AutoStoriesIcon />}
              label="Mis Reservas"
              {...a11yProps(1)}
            />
            <Tab
              icon={<MenuBookRounded />}
              label="Mis Retiros"
              {...a11yProps(2)}
            />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HojaPerfil user_id={user.id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MisReservas user_id={user.id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MisRetiros user_id={user.id} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
}

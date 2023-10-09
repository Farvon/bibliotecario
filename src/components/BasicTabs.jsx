import * as React from "react";
import { useEffect, useState } from "react";

import { getReservasAprobadas } from "../backend/controllers/reservas";
import Body from "./Body";
import Reservas from "./Reservas";
import Retiros from "./Retiros";

import Badge from "@mui/material/Badge";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { brown } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservasAprobadas().then((data) => setReservas(data));
  }, []);

  var contador = 0;

  reservas.map((reserva) => {
    const fechaRetiroString = reserva.fecha_retiro; // Supongamos que esto es "2023-03-10"
    const partesFechaRetiro = fechaRetiroString.split("-");
    const fechaRetiro = new Date(
      partesFechaRetiro[0], // Año
      partesFechaRetiro[2] - 1, // Mes (restamos 1 porque en JavaScript los meses van de 0 a 11)
      partesFechaRetiro[1] // Día
    );

    const fechaHoy = new Date();
    const diferenciaEnMilisegundos = fechaHoy - fechaRetiro;
    const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    dias > 2 ? contador++ : null;
  });

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
            <Tab label="Reservas" {...a11yProps(0)} />
            <Tab label="Retiros" {...a11yProps(1)} />
            {contador > 0 ? (
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
                sx={{ top: "15px", left: "-15px", padding: "0 4px" }}
              ></Badge>
            ) : null}

            <Tab label="Gestionar Biblioteca" {...a11yProps(2)} />
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Reservas />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Retiros />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Body admin={true} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
}

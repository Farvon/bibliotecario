import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MenuCarreras({ carreras, setCarreraSrc }) {
  const [carreraSelected, setCarreraSelected] = React.useState("");

  const handleChange = (event) => {
    setCarreraSelected(event.target.value);
    setCarreraSrc(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Carrera</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={carreraSelected}
        label="Carrera"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        {carreras.map((carrera) => (
          <MenuItem value={carrera.id} key={carrera.id}>
            <em>{carrera.carrera}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

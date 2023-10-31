import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MenuCarreras({
  carreras,
  showAcciones,
  carreraToFilter,
  setCarreraToFilter,
}) {
  return (
    <>
      {showAcciones ? (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Carrera</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={carreraToFilter ? carreraToFilter : ""}
            label="Carrera"
            onChange={(e) => setCarreraToFilter(e.target.value)}
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
      ) : null}
    </>
  );
}

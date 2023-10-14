import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Reglamento = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,

          width: 500,
          maxWidth: 500,
          minWidth: 300,
          height: "80vh",
        },
      }}
    >
      <Paper>
        <embed
          src="./Historia Institucional.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </Paper>
    </Box>
  );
};

export default Reglamento;

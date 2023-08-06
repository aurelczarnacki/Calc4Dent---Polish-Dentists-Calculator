import React, { useState, useEffect } from "react";
import Table from "@mui/joy/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/joy";
import Box from "@mui/joy/Box";

const ListaKodow: React.FC = () => {
  const [codes, setCodes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCodes(data))
      .catch((error) => console.error("Błąd pobierania danych:", error));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography level="h1" sx={{ mt: 6, mb: 2, color: "white" }}>
        Lista Kodów
      </Typography>
      <Box width="2/3" sx={{ mt: 2, maxHeight: "600px", overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#0a0a0a", width: "200px" }}>
                <Typography color="primary">Nazwa</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: "#0a0a0a" }}>
                <Typography color="primary">Kod</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: "#0a0a0a" }}>
                <Typography color="primary">Punkty</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codes.map((code, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#141414" : "#212121",
                }}
              >
                <TableCell>
                  <Typography color="primary">{code.Name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary">{code.Code}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary">{code.Value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default ListaKodow;
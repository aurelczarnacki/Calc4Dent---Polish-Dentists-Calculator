import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import { Typography } from "@mui/joy";
import { format } from "date-fns";

const Historia: React.FC = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("history");
    const historyData = savedData ? JSON.parse(savedData) : [];

    setHistoryData(historyData);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("history");
    setHistoryData([]);
  };

  const handleDeleteItem = (index: number) => {
    const updatedHistory = [...historyData];
    updatedHistory.splice(index, 1);
    setHistoryData(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography level="h1" sx={{ color: "white", mt: 6, mb: 2 }}>
          Historia
        </Typography>
        <Box width="2/3" sx={{ mt: 2, maxHeight: "600px", overflowY: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#0a0a0a" }}>
                  <Typography color="primary">Data</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#0a0a0a" }}>
                  <Typography color="primary">Wynik</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#0a0a0a" }}>
                  <Typography color="primary">Usuń</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#141414" : "#212121",
                  }}
                >
                  <TableCell>
                    <Typography color="primary">
                      {format(new Date(data.date), "dd-MM-yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="primary">{data.result}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearHistory}
          sx={{ mt: 2 }}
        >
          Wyczyść historię
        </Button>
      </Box>
    </div>
  );
};

export default Historia;
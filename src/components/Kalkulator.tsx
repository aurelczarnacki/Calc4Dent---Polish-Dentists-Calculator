import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/SaveAlt";
import CalculateIcon from "@mui/icons-material/Calculate";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/joy";
import Box from "@mui/joy/Box";

const QuantityInput = ({ value, onChange }: { value: number; onChange: (newValue: number) => void }) => {
  const buttonStyle = {
    width: "35px",
    minWidth: "30px",
    height: "35px",
  };
  return (
    <div>
      <Button
        variant="outlined"
        style={buttonStyle}
        onClick={() => onChange(value - 1)}
      >
        <RemoveIcon />
      </Button>
      <span> {value} </span>
      <Button
        variant="outlined"
        style={buttonStyle}
        onClick={() => onChange(value + 1)}
      >
        <AddIcon />
      </Button>
    </div>
  );
};

const Kalkulator: React.FC = () => {
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [codes, setCodes] = useState<any[]>([]);
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCodes(data))
      .catch((error) => console.error("Błąd pobierania danych:", error));
  }, []);

  const handleAdd = () => {
    const codeData = codes.find((item) => item.Code === code);

    if (codeData) {
      setPoints(points + codeData.Value * quantity);
      const operationData = {
        code: code,
        value: codeData.Value,
        quantity: quantity,
      };
      setHistory([...history, operationData]);
      setCode("");
      setQuantity(1);
    } else {
      alert("Podany kod nie istnieje w bazie danych!");
    }
  };

  const handleSave = () => {
  const currentDate = new Date().toISOString();

  const dataToSave = {
    date: currentDate,
    result: points,
  };

  const savedData = localStorage.getItem("history");
  const historyData = savedData ? JSON.parse(savedData) : [];

  historyData.push(dataToSave);

  localStorage.setItem("history", JSON.stringify(historyData));

  setCode("");
  setQuantity(1);
  setPoints(0);
  setHistory([]);

  };
  const handleClear = () => {
    setCode("");
    setQuantity(1);
    setPoints(0);
    setHistory([]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography level="h1" sx={{ mt: 6, mb: 2, color: "white" }}>
        Kalkulator
        <CalculateIcon />
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        width="2/3"
        sx={{ mt: 3 }}
      >
        <Input
          placeholder="Kod świadczenia..."
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <QuantityInput value={quantity} onChange={setQuantity} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        width="2/3"
      >
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          color="inherit"
          onClick={handleAdd}
          sx={{ width: "290px", height: "40px" }}
        >
          Dodaj
        </Button>
      </Box>
      <Typography level="h3" sx={{ my: 4, color: "white" }}>
        Wynik: {points}
      </Typography>
      <Box display="flex" justifyContent="space-between" width="2/3">
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleClear}
          sx={{ width: 120, mx: 2 }}
        >
          Wyczyść
        </Button>
        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          color="success"
          onClick={handleSave}
          sx={{ width: 120, mx: 2 }}
        >
          Zapisz
        </Button>
      </Box>
      <Box width="2/3" sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
        <Typography level="h4" sx={{ color: "white" }}>
          Dodane kody:
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#0a0a0a" }}>
                <Typography color="primary">Kod</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: "#0a0a0a" }}>
                <Typography color="primary">Wartość</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: "#0a0a0a" }}>
                <Typography color="primary">Ilość</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#141414" : "#212121",
                }}
              >
                <TableCell>
                  <Typography color="primary">{item.code}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary">{item.value}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary">{item.quantity}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Kalkulator;

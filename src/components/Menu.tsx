import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "black", 
    color: "white", 
    width: "250px", 
  },
}));

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 9999,
        }}
        onClick={toggleMenu}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <CustomDrawer
        anchor="left"
        open={isMenuOpen}
        onClose={toggleMenu}
      >
        <List sx={{ my: 8 }}>
          <ListItem component={Link} to="/kalkulator" onClick={toggleMenu}>
            <ListItemText primary="Kalkulator" />
          </ListItem>
          <ListItem component={Link} to="/historia" onClick={toggleMenu}>
            <ListItemText primary="Historia" />
          </ListItem>
          <ListItem
            component={Link}
            to="/lista-kodow"
            onClick={toggleMenu}
          >
            <ListItemText primary="Lista Kodów" />
          </ListItem>
        </List>
      </CustomDrawer>
    </>
  );
};

export default Menu;
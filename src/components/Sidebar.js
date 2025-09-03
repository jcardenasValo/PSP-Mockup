import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Recaudador', icon: <AccountBalanceIcon />, path: '/recaudador' },
  { text: 'Cuentas CBU', icon: <MonetizationOnIcon />, path: '/cuentas-cbu' },
  { text: 'Cajas/Sucursales Clientes', icon: <StoreIcon />, path: '/cajas-clientes' },
  { text: 'Cuenta CVU', icon: <MonetizationOnIcon />, path: '/cuenta-cvu' },
  { text: 'Clientes Recaudadora', icon: <PeopleIcon />, path: '/clientes-recaudadora' },
  { text: 'Deudas', icon: <MonetizationOnIcon />, path: '/deudas' },
  { text: 'Consulta Movimientos', icon: <DashboardIcon />, path: '/movimientos' },
  { text: 'Roles', icon: <PeopleIcon />, path: '/roles' },
];

export default function Sidebar({ drawerWidth = 240, menuItems }) {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

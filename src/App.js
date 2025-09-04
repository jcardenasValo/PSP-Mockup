import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './components/Sidebar';
import RoleSelector from './components/RoleSelector';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Recaudador from './pages/Recaudador';
import CuentasCBU from './pages/CuentasCBU';
import CajasClientes from './pages/CajasClientes';
import CuentaCVU from './pages/CuentaCVU';
import ClientesRecaudadora from './pages/ClientesRecaudadora';
import Deudas from './pages/Deudas';
import Movimientos from './pages/Movimientos';
import Roles from './pages/Roles';
// ...existing code...
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Opciones por rol
  const bancoMenu = [
    { text: 'Inicio', icon: <DashboardIcon />, path: '/' },
    { text: 'Recaudador', icon: <AccountBalanceIcon />, path: '/recaudador' },
    { text: 'Cuentas CBU', icon: <MonetizationOnIcon />, path: '/cuentas-cbu' },
  ];
  const recaudadoraMenu = [
    { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes-recaudadora' },
    { text: 'Cajas/Sucursales Clientes', icon: <StoreIcon />, path: '/cajas-clientes' },
    { text: 'Cuenta CVU', icon: <MonetizationOnIcon />, path: '/cuenta-cvu' },
    { text: 'Deudas', icon: <MonetizationOnIcon />, path: '/deudas' },
    { text: 'Consulta Movimientos', icon: <DashboardIcon />, path: '/movimientos' },
    { text: 'Roles', icon: <PeopleIcon />, path: '/roles' },
  ];

  // Paleta inspirada en National Geographic
  const natgeoPalette = {
    primary: {
      main: darkMode ? '#E1C16E' : '#B71C1C', // rojo en claro, dorado en oscuro
      contrastText: darkMode ? '#222' : '#fff'
    },
    secondary: {
      main: darkMode ? '#00796B' : '#fff', // blanco en claro, verde en oscuro
      contrastText: darkMode ? '#fff' : '#B71C1C'
    },
    background: {
      default: darkMode ? '#222' : '#fff', // blanco en claro, fondo oscuro en oscuro
      paper: darkMode ? '#333' : '#fff',
    },
    text: {
      primary: darkMode ? '#F5F3E7' : '#B71C1C', // rojo en claro
      secondary: darkMode ? '#E1C16E' : '#B71C1C',
    },
    error: {
      main: '#B71C1C',
    },
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...natgeoPalette,
    },
    typography: {
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {!loggedIn ? (
          <Login onLogin={(userRole) => { setRole(userRole); setLoggedIn(true); }} />
        ) : !role ? (
          <RoleSelector onSelect={setRole} />
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar drawerWidth={240} menuItems={role === 'banco' ? bancoMenu : recaudadoraMenu} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span />
                <IconButton color="secondary" onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Toolbar>
              <Routes>
                {role === 'banco' && (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/recaudador" element={<Recaudador />} />
                    <Route path="/cuentas-cbu" element={<CuentasCBU />} />
                  </>
                )}
                {role === 'recaudadora' && (
                  <>
                    <Route path="/clientes-recaudadora" element={<ClientesRecaudadora />} />
                    <Route path="/cajas-clientes" element={<CajasClientes />} />
                    <Route path="/cuenta-cvu" element={<CuentaCVU />} />
                    <Route path="/deudas" element={<Deudas />} />
                    <Route path="/movimientos" element={<Movimientos />} />
                    <Route path="/roles" element={<Roles />} />
                  </>
                )}
              </Routes>
            </Box>
          </Box>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;

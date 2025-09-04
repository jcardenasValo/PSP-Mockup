
import { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const [recaudadorasAlta, setRecaudadorasAlta] = useState(0);
  const [cuentasCBUPesos, setCuentasCBUPesos] = useState(0);
  const [cuentasCBUDolares, setCuentasCBUDolares] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:4000/recaudadoras')
        .then(res => res.json())
        .then(data => setRecaudadorasAlta(data.length));

      fetch('http://localhost:4000/cuentas-cbu')
        .then(res => res.json())
        .then(data => {
          let totalPesos = 0;
          let totalDolares = 0;
          data.forEach(cuenta => {
            if (cuenta.codigoMoneda === 'ARS') {
              totalPesos += cuenta.saldo;
            } else if (cuenta.codigoMoneda === 'USD') {
              totalDolares += cuenta.saldo;
            }
          });
          setCuentasCBUPesos(totalPesos);
          setCuentasCBUDolares(totalDolares);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Tablero Banco</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Recaudadoras dadas de alta</Typography>
          <Typography variant="h3" color="primary">{recaudadorasAlta}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Monto total CBU (Pesos)</Typography>
          <Typography variant="h3" color="success.main">${cuentasCBUPesos.toLocaleString()}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Monto total CBU (Dólares)</Typography>
          <Typography variant="h3" color="info.main">US$ {cuentasCBUDolares.toLocaleString()}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

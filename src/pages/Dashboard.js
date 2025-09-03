
import { Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

const mockData = {
  cuentasCBU: 12,
  totalDeuda: 150000,
  cuentasCVU: 8,
};

export default function Dashboard() {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Cuentas CBU</Typography>
          <Typography variant="h3" color="primary">{mockData.cuentasCBU}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Total Deuda Pendiente</Typography>
          <Typography variant="h3" color="error">${mockData.totalDeuda.toLocaleString()}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Cuentas CVU Vigentes</Typography>
          <Typography variant="h3" color="secondary">{mockData.cuentasCVU}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

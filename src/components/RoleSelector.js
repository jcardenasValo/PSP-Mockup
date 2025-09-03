import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function RoleSelector({ onSelect }) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>Selecciona tu rol</Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={() => onSelect('banco')}>Administrador Banco</Button>
        <Button variant="contained" onClick={() => onSelect('recaudadora')}>Administrador Recaudadora</Button>
      </Stack>
    </Box>
  );
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const users = [
  { username: 'banco', password: 'admin1234', role: 'banco' },
  { username: 'recaudadora', password: 'admin1234', role: 'recaudadora' },
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setError('');
      onLogin(user.role);
    } else {
      setError('Usuario o clave incorrectos');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 350, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>Iniciar sesión</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Usuario" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
          <TextField label="Clave" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained">Ingresar</Button>
        </Stack>
      </form>
    </Box>
  );
}

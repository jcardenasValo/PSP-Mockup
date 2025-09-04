import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';

export default function CrudTable({ columns, initialRows, formFields, title, fechaModificacionAuto, fechaUltimoMovimientoAuto }) {
  // Persistencia con backend
  const entityMap = {
    'Recaudador': 'recaudadoras',
    'Cuentas CBU': 'cuentas-cbu',
    'Clientes': 'clientes',
    'Cajas/Sucursales Clientes': 'cajas-clientes',
    'Cuenta CVU': 'cuenta-cvu',
    'Deudas': 'deudas',
    'Consulta Movimientos': 'movimientos',
    'Roles': 'roles',
  };
  const endpoint = entityMap[title];
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    if (!endpoint) return;
    fetch(`http://localhost:4000/${endpoint}`)
      .then(res => res.json())
      .then(data => setRows(data));
  }, [endpoint]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('');

  const handleOpen = (row) => {
    let newForm = row || {};
    if (!row) {
      // Alta: set fechaModificacion/fechaUltimoMovimiento al momento actual si corresponde
      if (fechaModificacionAuto) newForm.fechaModificacion = dayjs().format('YYYY-MM-DD');
      if (fechaUltimoMovimientoAuto) newForm.fechaUltimoMovimiento = dayjs().format('YYYY-MM-DD');
    }
    setForm(newForm);
    setEditId(row ? row.id : null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({});
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const persistRows = async (newRows) => {
    setRows(newRows);
  };

  const handleSave = async () => {
    let newForm = { ...form };
    if (fechaModificacionAuto) newForm.fechaModificacion = dayjs().format('YYYY-MM-DD');
    if (fechaUltimoMovimientoAuto) newForm.fechaUltimoMovimiento = dayjs().format('YYYY-MM-DD');
    // Convertir saldo a número si existe
    if ('saldo' in newForm) {
      newForm.saldo = Number(newForm.saldo);
    }
    if (endpoint) {
      if (editId) {
        // Modificación (PUT)
        await fetch(`http://localhost:4000/${endpoint}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newForm)
        });
      } else {
        // Alta (POST)
        await fetch(`http://localhost:4000/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newForm)
        });
      }
      // Refrescar datos
      const res = await fetch(`http://localhost:4000/${endpoint}`);
      const data = await res.json();
      setRows(data);
    } else {
      // Fallback localStorage
      if (editId) {
        persistRows(rows.map(r => r.id === editId ? { ...newForm, id: editId } : r));
      } else {
        persistRows([...rows, { ...newForm, id: Date.now() }]);
      }
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    if (endpoint) {
      await fetch(`http://localhost:4000/${endpoint}/${id}`, { method: 'DELETE' });
      // Refrescar datos
      const res = await fetch(`http://localhost:4000/${endpoint}`);
      const data = await res.json();
      setRows(data);
    } else {
      persistRows(rows.filter(r => r.id !== id));
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRows = rows.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const actionColumn = {
    field: 'actions',
    headerName: 'Acciones',
    width: 180,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() => handleOpen(params.row)}>Modificar</Button>
        <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(params.row.id)}>Baja</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <h2 style={{ flexGrow: 1 }}>{title}</h2>
        <TextField
          label="Filtro/Consulta"
          value={filter}
          onChange={handleFilterChange}
          size="small"
        />
        <Button variant="contained" onClick={() => handleOpen()}>
          Alta
        </Button>
      </Stack>
      <DataGrid
        rows={filteredRows}
        columns={[...columns, actionColumn]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{ mt: 2 }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Modificar' : 'Alta'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {formFields.map(field => {
              if (field.type === 'date') {
                return (
                  <LocalizationProvider key={field.name} dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={field.label}
                      value={form[field.name] ? dayjs(form[field.name]) : null}
                      onChange={value => setForm({ ...form, [field.name]: value ? value.format('YYYY-MM-DD') : '' })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                );
              }
              if (field.type === 'select') {
                return (
                  <TextField
                    key={field.name}
                    select
                    label={field.label}
                    name={field.name}
                    value={form[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                  >
                    {field.options.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </TextField>
                );
              }
              return (
                <TextField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={handleChange}
                  fullWidth
                />
              );
            })}
            {/* Campos de fecha automáticos y no editables */}
            {fechaModificacionAuto && (
              <TextField
                label="Fecha Última Modificación"
                name="fechaModificacion"
                value={form.fechaModificacion || dayjs().format('YYYY-MM-DD')}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            )}
            {fechaUltimoMovimientoAuto && (
              <TextField
                label="Fecha Último Movimiento"
                name="fechaUltimoMovimiento"
                value={form.fechaUltimoMovimiento || dayjs().format('YYYY-MM-DD')}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

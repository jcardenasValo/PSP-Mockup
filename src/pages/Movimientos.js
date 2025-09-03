import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'cuenta', headerName: 'Cuenta', width: 180 },
  { field: 'moneda', headerName: 'Moneda', width: 120 },
  { field: 'tipo', headerName: 'Tipo Movimiento', width: 140 },
  { field: 'fecha', headerName: 'Fecha', width: 120 },
  { field: 'importe', headerName: 'Importe', width: 120 },
];

const formFields = [
  { name: 'cuenta', label: 'Cuenta' },
  { name: 'moneda', label: 'Moneda' },
  { name: 'tipo', label: 'Tipo Movimiento' },
  { name: 'fecha', label: 'Fecha' },
  { name: 'importe', label: 'Importe' },
];

export default function Movimientos() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Consulta Movimientos"
    />
  );
}

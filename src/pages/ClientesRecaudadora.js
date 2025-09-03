import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'razonSocial', headerName: 'Razón Social', width: 180 },
  { field: 'domicilio', headerName: 'Domicilio', width: 180 },
  { field: 'cuit', headerName: 'CUIT', width: 120 },
];

const formFields = [
  { name: 'razonSocial', label: 'Razón Social' },
  { name: 'domicilio', label: 'Domicilio' },
  { name: 'cuit', label: 'CUIT' },
];

export default function ClientesRecaudadora() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Clientes Recaudadora"
    />
  );
}

import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'denominacion', headerName: 'Caja/Sucursal Denominación', width: 200 },
  { field: 'cuit', headerName: 'CUIT', width: 120 },
  { field: 'domicilio', headerName: 'Domicilio', width: 180 },
];

const formFields = [
  { name: 'denominacion', label: 'Caja/Sucursal Denominación' },
  { name: 'cuit', label: 'CUIT' },
  { name: 'domicilio', label: 'Domicilio' },
];

export default function CajasClientes() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Cajas/Sucursales Clientes"
    />
  );
}

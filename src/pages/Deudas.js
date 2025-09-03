import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'moneda', headerName: 'Moneda', width: 120 },
  { field: 'importe', headerName: 'Importe', width: 120 },
  { field: 'fechaAlta', headerName: 'Fecha Alta', width: 120, type: 'date' },
  { field: 'fechaVencimiento', headerName: 'Fecha Vencimiento', width: 140, type: 'date' },
  { field: 'cuentaCVUAsociada', headerName: 'Número Cuenta CVU Asociada', width: 180 },
];

const formFields = [
  { name: 'moneda', label: 'Moneda' },
  { name: 'importe', label: 'Importe' },
  { name: 'fechaAlta', label: 'Fecha Alta', type: 'date' },
  { name: 'fechaVencimiento', label: 'Fecha Vencimiento', type: 'date' },
  { name: 'cuentaCVUAsociada', label: 'Número Cuenta CVU Asociada' },
];

export default function Deudas() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Deudas"
    />
  );
}

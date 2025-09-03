import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'razonSocial', headerName: 'Razón Social', width: 180 },
  { field: 'cuit', headerName: 'CUIT', width: 120 },
  { field: 'domicilio', headerName: 'Domicilio', width: 180 },
  {
    field: 'fechaAlta',
    headerName: 'Fecha Alta',
    width: 120,
    type: 'date',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'fechaModificacion',
    headerName: 'Fecha Última Modificación',
    width: 180,
    type: 'date',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
];

const formFields = [
  { name: 'razonSocial', label: 'Razón Social' },
  { name: 'cuit', label: 'CUIT' },
  { name: 'domicilio', label: 'Domicilio' },
  { name: 'fechaAlta', label: 'Fecha Alta', type: 'date' },
];

export default function Recaudador() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Recaudador"
      fechaModificacionAuto
    />
  );
}

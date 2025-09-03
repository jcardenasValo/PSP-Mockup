import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'rol', headerName: 'Rol', width: 180 },
  { field: 'descripcion', headerName: 'Descripción', width: 220 },
];

const formFields = [
  { name: 'rol', label: 'Rol' },
  { name: 'descripcion', label: 'Descripción' },
];

export default function Roles() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Gestión de Roles"
    />
  );
}

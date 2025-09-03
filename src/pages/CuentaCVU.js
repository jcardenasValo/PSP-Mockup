import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'codigoMoneda', headerName: 'Código Moneda', width: 140 },
  { field: 'descripcionMoneda', headerName: 'Descripción Moneda', width: 180 },
  { field: 'numeroCuentaCVU', headerName: 'Número Cuenta CVU', width: 180 },
  { field: 'saldo', headerName: 'Saldo', width: 120 },
  { field: 'cuentaCBUAsociada', headerName: 'Número Cuenta CBU Asociada', width: 180 },
];

const formFields = [
  { name: 'codigoMoneda', label: 'Código Moneda' },
  { name: 'descripcionMoneda', label: 'Descripción Moneda' },
  { name: 'numeroCuentaCVU', label: 'Número Cuenta CVU' },
  { name: 'saldo', label: 'Saldo' },
  { name: 'cuentaCBUAsociada', label: 'Número Cuenta CBU Asociada' },
];

export default function CuentaCVU() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Cuenta CVU"
    />
  );
}

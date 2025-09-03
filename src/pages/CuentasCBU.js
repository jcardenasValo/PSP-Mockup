import React from 'react';
import CrudTable from '../components/CrudTable';

const columns = [
  { field: 'codigoMoneda', headerName: 'Código Moneda', width: 140 },
  { field: 'monedaDescripcion', headerName: 'Moneda Descripción', width: 180 },
  { field: 'numeroCuentaCBU', headerName: 'Número Cuenta CBU', width: 180 },
  { field: 'saldo', headerName: 'Saldo', width: 120 },
  {
    field: 'fechaUltimoMovimiento',
    headerName: 'Fecha Último Movimiento',
    width: 180,
    type: 'date',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
];

const formFields = [
  { name: 'codigoMoneda', label: 'Código Moneda' },
  { name: 'monedaDescripcion', label: 'Moneda Descripción' },
  { name: 'numeroCuentaCBU', label: 'Número Cuenta CBU' },
  { name: 'saldo', label: 'Saldo' },
];

export default function CuentasCBU() {
  return (
    <CrudTable
      columns={columns}
      initialRows={[]}
      formFields={formFields}
      title="Cuentas CBU"
      fechaUltimoMovimientoAuto
    />
  );
}

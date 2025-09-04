import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar base de datos SQLite
let db;
(async () => {
  db = await open({
    filename: './psp.db',
    driver: sqlite3.Database
  });

  // Crear tablas si no existen
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recaudadoras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      razonSocial TEXT,
      cuit TEXT,
      domicilio TEXT,
      fechaAlta TEXT,
      fechaModificacion TEXT
    );
    CREATE TABLE IF NOT EXISTS cuentas_cbu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigoMoneda TEXT,
      monedaDescripcion TEXT,
      numeroCuentaCBU TEXT,
      saldo REAL,
      fechaUltimoMovimiento TEXT,
      recaudadoraId INTEGER NOT NULL,
      FOREIGN KEY (recaudadoraId) REFERENCES recaudadoras(id)
    );
  `);
})();

// Endpoints básicos
app.get('/recaudadoras', async (req, res) => {
  const rows = await db.all('SELECT * FROM recaudadoras');
  res.json(rows);
});

app.post('/recaudadoras', async (req, res) => {
  const { razonSocial, cuit, domicilio, fechaAlta, fechaModificacion } = req.body;
  const result = await db.run(
    'INSERT INTO recaudadoras (razonSocial, cuit, domicilio, fechaAlta, fechaModificacion) VALUES (?, ?, ?, ?, ?)',
    razonSocial, cuit, domicilio, fechaAlta, fechaModificacion
  );
  res.json({ id: result.lastID });
});

app.get('/cuentas-cbu', async (req, res) => {
  const rows = await db.all('SELECT * FROM cuentas_cbu');
  res.json(rows);
});

app.post('/cuentas-cbu', async (req, res) => {
  const { codigoMoneda, monedaDescripcion, numeroCuentaCBU, saldo, fechaUltimoMovimiento, recaudadoraId } = req.body;
  if (!recaudadoraId) {
    return res.status(400).json({ error: 'recaudadoraId es obligatorio' });
  }
  const result = await db.run(
    'INSERT INTO cuentas_cbu (codigoMoneda, monedaDescripcion, numeroCuentaCBU, saldo, fechaUltimoMovimiento, recaudadoraId) VALUES (?, ?, ?, ?, ?, ?)',
    codigoMoneda, monedaDescripcion, numeroCuentaCBU, saldo, fechaUltimoMovimiento, recaudadoraId
  );
  res.json({ id: result.lastID });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

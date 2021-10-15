const express = require("express");
const { Pool } = require("pg");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

const pool = new Pool({
  connectionString: "postgres://postgres:davi0809@localhost:5432/atividadeextra",
});

pool.on("connect", () => {
  console.log("Conectou");
});

app.get("/usuarios", async (req, res) => {
  const { rows: user } = await pool.query(
    `select * from usuarios where nome = ${req.query.nome};`
  );
  res.status(200).json({ response: user });
});

app.post("/usuarios", async (req, res ) => {
  const { rows: user } = await pool.query(
    "INSERT INTO usuarios (nome, senha) VALUES ($1, $2)",
    ['test', 'senha'],
  );
  res.status(200).send('success');
});

app.listen(3000, () => {
  console.log("iniciado");
});


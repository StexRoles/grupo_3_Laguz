/* MODULOS REQUERIDOS */

const express = require('express');
const app = express();
const path = require('path');

/* SERVIDOR */

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});

/* METODO PARA ELEMTOS ESTATICOS */

app.use(express.static(path.join(__dirname, '/public')));

/* METODOS GET */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});
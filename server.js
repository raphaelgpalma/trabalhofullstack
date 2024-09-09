const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());


app.use(express.static(path.join(__dirname, 'frontend')));


app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

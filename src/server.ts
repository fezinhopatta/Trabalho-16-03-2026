// src/server.ts

import express from 'express';
import rotasFilmes from './routes/filmes';

const app = express();
const PORTA = 3000;


app.use(express.json());


app.use('/filmes', rotasFilmes);


app.get('/', (req, res) => {
    res.send('API de Gerenciamento de Filmes rodando! 🎬');
});

app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
});
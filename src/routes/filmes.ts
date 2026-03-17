// src/routes/filmes.ts

import { Router, Request, Response } from 'express';
import { Filme } from '../models/filme';

const router = Router();

let filmes: Filme[] = [];
let proximoId = 1;

// 1. Criar um novo filme (POST)
router.post('/', (req: Request, res: Response) => {
    const { titulo, diretor, ano, assistido } = req.body;

    if (!titulo || !diretor || !ano || assistido === undefined) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const novoFilme: Filme = {
        id: proximoId++,
        titulo,
        diretor,
        ano,
        assistido
    };

    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

// 2. Listar todos (GET)
router.get('/', (req: Request, res: Response) => {
    res.json(filmes);
});

// 3. Buscar por ID (GET)
router.get('/:id', (req: Request, res: Response) => {
    // CORREÇÃO: Forçamos o id a ser string para o parseInt não reclamar
    const idStr = req.params.id as string; 
    const id = parseInt(idStr);
    
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({ erro: 'Filme não encontrado.' });
    }

    res.json(filme);
});

// 4. Atualizar (PUT)
router.put('/:id', (req: Request, res: Response) => {
    const idStr = req.params.id as string;
    const id = parseInt(idStr);
    const { titulo, diretor, ano, assistido } = req.body;

    const filmeExistente = filmes.find(f => f.id === id);

    if (!filmeExistente) {
        return res.status(404).json({ erro: 'Filme não encontrado.' });
    }

    // CORREÇÃO: Em vez de usar index, atualizamos as propriedades do objeto encontrado
    // O TypeScript agora sabe que 'filmeExistente' não é undefined aqui
    filmeExistente.titulo = titulo ?? filmeExistente.titulo;
    filmeExistente.diretor = diretor ?? filmeExistente.diretor;
    filmeExistente.ano = ano ?? filmeExistente.ano;
    filmeExistente.assistido = assistido ?? filmeExistente.assistido;

    res.json(filmeExistente);
});

// 5. Deletar (DELETE)
router.delete('/:id', (req: Request, res: Response) => {
    const idStr = req.params.id as string;
    const id = parseInt(idStr);
    
    const index = filmes.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Filme não encontrado.' });
    }

    const filmeRemovido = filmes.splice(index, 1);
    res.json({ mensagem: 'Removido!', filme: filmeRemovido[0] });
});

export default router;
const express = require('express');
const { PrismaClient } = require('@prisma/client')

const routes = express.Router();
const prisma = new PrismaClient()

// GET /videos
routes.get('/videos', async (req, res) => {
    const videos = await prisma.video.findMany();

    res.json(videos);
});

// GET /videos/1
routes.get('/videos/:id', async (req, res) => {
    const { id } = req.params;

    const video = await prisma.video.findUnique({
        where: {
          id: Number(id),
        }
    });

    res.json(video);
});

// POST /videos
routes.post('/videos', async (req, res) => {
    const { titulo, descricao, url } = req.body;

    const result = await prisma.video.create({
        data : {
            titulo,
            descricao,
            url,
        },
    });

    res.json(result);
});

// PUT /videos
/*routes.put('/videos', async (req, res) => {
    
});

// DELETE /videos/1
routes.delete('/videos/:id', async (req, res) => {
    
});*/

module.exports = routes;
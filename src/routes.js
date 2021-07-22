const express = require('express');
const { PrismaClient } = require('@prisma/client')

const routes = express.Router();
const prisma = new PrismaClient()

// GET /videos
routes.get('/videos', async (req, res) => {
    const videos = await prisma.video.findMany();

    if(videos !== [])
        res.status(200).json(videos);
    else
        res.status(204).send();
});

// GET /videos/1
routes.get('/videos/:id', async (req, res) => {
    const { id } = req.params;

    const video = await prisma.video.findUnique({
        where: {
          id: Number(id),
        }
    });

    if(video !== null)
        res.status(200).json(video);
    else
        res.status(204).send();
});

// POST /videos
routes.post('/videos', async (req, res) => {
    const { titulo, descricao, url } = req.body;

    try {
        const result = await prisma.video.create({
            data : {
                titulo,
                descricao,
                url,
            },
        });

        res.status(200).json(result);
    } catch(error) {
        res.json({ error: error});
    }    
});

// PUT /videos
routes.put('/videos/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, url } = req.body;

    try {
        const updatedRecord = await prisma.video.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo,
                descricao,
                url
            },
        });

        res.json(updatedRecord);
    } catch(error) {
        res.status(204);
    }   
});

// DELETE /videos/1
routes.delete('/videos/:id', async (req, res) => {
    const {id } = req.params;
   
    try {
        const deletedVideo = await prisma.video.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(200).json(deletedVideo);
   } catch(error) {
        res.status(204).send();
   }
});

module.exports = routes;
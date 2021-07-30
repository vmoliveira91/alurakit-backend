const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    async getAllVideos(req, res) {
        const { search } = req.query;

        if(search === undefined) {
            const videos = await prisma.video.findMany();

            if(videos !== [])
                res.status(200).json(videos);
            else
                res.status(204).send();
        } else {
            const videos = await prisma.video.findMany({
                where: {
                    titulo: {
                        contains: search,
                    },
                },
            });

            if(videos !== [])
                res.status(200).json(videos);
            else
                res.status(204).send();
        }
    },

    async getVideoById(req, res) {
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
    },

    async createVideo(req, res) {
        const { titulo, descricao, url, categoria_id } = req.body;

        if(titulo === '' || descricao === '' || url === '')
            res.status(400).json({ errorMessage: 'O campo é obrigatório' });
        else {
            try {
                const result = await prisma.video.create({
                    data : {
                        titulo,
                        descricao,
                        url,
                        categoria_id,
                    },
                });
        
                res.status(200).json(result);
            } catch(error) {
                res.status(400).json({ error: error });
            } 
        }
    },

    async updateVideo(req, res) {
        const { id } = req.params;
        const { titulo, descricao, url, categoria_id } = req.body;

        if(titulo === '' || descricao === '' || url === '')
            res.status(400).json({ errorMessage: 'O campo é obrigatório' });
        else {
            try {
                const updatedRecord = await prisma.video.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        titulo,
                        descricao,
                        url,
                        categoria_id
                    },
                });

                res.status(200).json(updatedRecord);
            } catch(error) {
                res.status(400).json({ error: error });
            }
        }
    },

    async deleteVideoById(req, res) {
        const { id } = req.params;
   
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
    },

}
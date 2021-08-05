const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    async getAllVideos(req, res) {
        const { search, page } = req.query;
        let videos;

        if(search === undefined && page === undefined) {

            videos = await prisma.video.findMany();

        } else if(search !== undefined && page !== undefined) {
            
            videos = await prisma.video.findMany({
                skip: (Number(page) - 1) * 5,
                take: 5,
                where: {
                    titulo: {
                        contains: search,
                    },
                },
            });

        } else if(search !== undefined && page === undefined){
            
            videos = await prisma.video.findMany({
                where: {
                    titulo: {
                        contains: search,
                    },
                },
            });

        } else {

            videos = await prisma.video.findMany({
                skip: (Number(page) - 1) * 5,
                take: 5,
            });

        }

        if(videos !== [])
            res.status(200).json(videos);
        else
            res.status(204).send();
    },

    async getVideoById(req, res) {
        const { id } = req.params;

        if(id === 'free') {
            const videos = await prisma.video.findMany({
                skip: Math.floor(Math.random() * 5) + 1,
                take: 5,
            });

            if(videos !== null)
                res.status(200).json(videos);
            else
                res.status(204).send();
        } else {
            const video = await prisma.video.findUnique({
                where: {
                    id: Number(id),
                }
            });
    
            if(video !== null)
                res.status(200).json(video);
            else
                res.status(204).send();
        }
        
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
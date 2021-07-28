const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    async getAllCategories(req, res) {
        const categorias = await prisma.categoria.findMany();

        if(categorias !== [])
            res.status(200).json(categorias);
        else
            res.status(204).send();
    },

    async getCategoriaById(req, res) {
        const { id } = req.params;

        const categoria = await prisma.categoria.findUnique({
            where: {
                id: Number(id),
            }
        });

        if(categoria !== null)
            res.status(200).json(categoria);
        else
            res.status(204).send();
    },

    async createCategoria(req, res) {
        const { titulo, cor } = req.body;

        if(titulo === '' || cor === '')
            res.status(400).json({ errorMessage: 'O campo é obrigatório' });
        else {
            try {
                const result = await prisma.categoria.create({
                    data : {
                        titulo,
                        cor,
                    },
                });
        
                res.status(200).json(result);
            } catch(error) {
                res.status(400).json({ error: error });
            } 
        }
    },

    async updateCategoria(req, res) {
        const { id } = req.params;
        const { titulo, cor } = req.body;

        if(titulo === '' || cor === '')
            res.status(400).json({ errorMessage: 'O campo é obrigatório' });
        else {
            try {
                const updatedRecord = await prisma.categoria.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        titulo,
                        cor
                    },
                });

                res.status(200).json(updatedRecord);
            } catch(error) {
                res.status(400).json({ error: error });
            }
        }
    },

    async deleteCategoriaById(req, res) {
        const { id } = req.params;
   
        try {
            const deletedCategoria = await prisma.categoria.delete({
                where: {
                    id: Number(id),
                },
            });

            res.status(200).json(deletedCategoria);
        } catch(error) {
                res.status(204).send();
        }
    },

}
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const CategoriaController = require('./controllers/CategoriaController');
const VideoController = require('./controllers/VideoController');

const routes = express.Router();
const prisma = new PrismaClient();

// CATEGORIA - routes

routes.get('/categorias', CategoriaController.getAllCategories);
routes.get('/categorias/:id', CategoriaController.getCategoriaById);
routes.post('/categorias', CategoriaController.createCategoria);
routes.put('/categorias/:id', CategoriaController.updateCategoria);
routes.delete('/categorias/:id', CategoriaController.deleteCategoriaById);

// VIDEO - routes

routes.get('/videos', VideoController.getAllVideos);
routes.get('/videos/:id', VideoController.getVideoById);
routes.post('/videos', VideoController.createVideo);
routes.put('/videos/:id', VideoController.updateVideo);
routes.delete('/videos/:id', VideoController.deleteVideoById);

module.exports = routes;
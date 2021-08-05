const express = require('express');

const AuthController = require('./controllers/AuthController');
const CategoriaController = require('./controllers/CategoriaController');
const VideoController = require('./controllers/VideoController');

const routes = express.Router();

// CATEGORIA - routes

routes.get('/categorias', AuthController.verify, CategoriaController.getAllCategories);
routes.get('/categorias/:id', AuthController.verify, CategoriaController.getCategoriaById);
routes.get('/categorias/:id/videos', AuthController.verify, CategoriaController.getAllVideosFromCategoryId);
routes.post('/categorias', AuthController.verify, CategoriaController.createCategoria);
routes.put('/categorias/:id', AuthController.verify, CategoriaController.updateCategoria);
routes.delete('/categorias/:id', AuthController.verify, CategoriaController.deleteCategoriaById);

// VIDEO - routes

routes.get('/videos', AuthController.verify, VideoController.getAllVideos);
routes.get('/videos/:id', AuthController.verify, VideoController.getVideoById);
routes.post('/videos', AuthController.verify, VideoController.createVideo);
routes.put('/videos/:id', AuthController.verify, VideoController.updateVideo);
routes.delete('/videos/:id', AuthController.verify, VideoController.deleteVideoById);

// Auth - routes

routes.post('/login', AuthController.login);

module.exports = routes;
import express from 'express';
import { createCatalog, getAllCatalogs, getCatalogById, editCatalog, deleteCatalog } from '../controllers/catalog.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, createCatalog);
router.get('/all', getAllCatalogs);
router.get('/:catalogId', verifyToken, getCatalogById);
router.put('/:catalogId/edit', verifyToken, editCatalog);
router.delete('/:catalogId/delete', verifyToken, deleteCatalog);

export default router;
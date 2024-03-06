import express from 'express'
import {sendMessage, fetchMessages} from '../controllers/catalog.controllers.js'

const router = express.Router()

router.post('/', createCatalog)
router.get('/', fetchCatalogs)
router.get('/:chatId', fetchCatalog)


export default router
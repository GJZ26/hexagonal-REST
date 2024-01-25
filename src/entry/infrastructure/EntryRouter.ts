import express from 'express'
import { createController, getByPkController, listController } from './dependecies'

const entryRouter = express.Router()

entryRouter.get('/', listController.run.bind(listController))
entryRouter.get('/:id',getByPkController.run.bind(getByPkController))
entryRouter.post('/',createController.run.bind(createController))

export default entryRouter
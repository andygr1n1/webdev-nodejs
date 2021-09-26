import express from 'express'
import { getAllContacts, getAllContactsPageRendering } from './../controllers/contacts-controller'

export const contactsRouter = express.Router()

contactsRouter.get('/about-us', getAllContactsPageRendering)

contactsRouter.get('/contacts', getAllContacts)

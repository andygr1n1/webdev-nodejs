/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contact } from './../models/contact'
import { createPath } from '../helpers/create_path'
import { handleError } from '../helpers/handle_error'

export const getAllContactsPageRendering = (req: any, res: any) => {
    res.redirect('/contacts')
}

export const getAllContacts = (req: any, res: any) => {
    const title = 'Contacts'

    Contact.find()
        .then((contacts) => {
            console.log(contacts)
            res.render(createPath('contacts'), { contacts, title })
        })
        .catch((err) => {
            handleError(res, err)
        })
}

const fs = require('fs/promises');
const pathToContacts = require('path');
const { randomUUID } = require('crypto-random-string');
const contactsDB = require('./db/contact.json');

const readContent = async () => {
    const content = await fs.readFile(
        pathToContacts.join(__dirname, 'contact.json'), utf8,
    )
    const result = JSON.parse(content)
    console.log(result);
    return result;
}

async function listContacts() {
    return await readContent();
}

async function getContactById(contactId) {
    const contacts = await readContent()
    const [contact] = contacts.filter((c) => c.id === contactId)
    return contact ? contact : null
}

async function removeContact(contactId) {
    const contacts = await readContent()
    contacts = contacts.filter((c) => c.id !== contactId)
    return contacts;
}

async function addContact(name, email, phone) {
    const contacts = await readContent()
    const newContact = { id: randomUUID, name, email, phone }

}

module.exports = { listContacts, getContactById };
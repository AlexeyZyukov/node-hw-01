const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto-random-string');
const contactsDB = require('./db/contact.json');

const readContent = async () => {
    const content = await fs.readFile(
        path.join(__dirname, 'contact.json'), 'utf8',
    )
    const result = JSON.parse(content)
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
    await fs.writeFile(
        path.join(__dirname, 'contact.json'),
        JSON.stringify(contacts, null, 0)
    )
    return contacts;
}

async function addContact(name, email, phone) {
    const contacts = await readContent()
    const newContact = { id: randomUUID, name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(__dirname, 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    return contacts
}

module.exports = { listContacts, getContactById, addContact, removeContact };
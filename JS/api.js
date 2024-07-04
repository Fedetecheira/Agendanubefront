const API_URL = 'http://localhost:8080/api/contacts';

document.addEventListener('DOMContentLoaded', function() {
    const addContactForm = document.getElementById('addContactForm');
    const contactsList = document.getElementById('contactsList');
    const searchContacts = document.getElementById('searchContacts');
    const editContactModal = document.getElementById('editContactModal');
    
    let contacts = [];

    fetchContacts();

    addContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const contactName = document.getElementById('contactName').value;
        const contactNumber = document.getElementById('contactNumber').value;
        addContact(contactName, contactNumber);
    });

    searchContacts.addEventListener('input', function() {
        showContacts(this.value);
    });

    function fetchContacts() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                contacts = data;
                showContacts();
            })
            .catch(error => console.error('Error fetching contacts:', error));
    }

    function addContact(name, number) {
        const contact = { name, number };
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        })
        .then(response => response.json())
        .then(data => {
            contacts.push(data);
            showContacts();
        })
        .catch(error => console.error('Error adding contact:', error));
    }

    function editContact(index, name, number) {
        const contact = contacts[index];
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, number }),
        })
        .then(response => response.json())
        .then(data => {
            contacts[index] = data;
            showContacts();
        })
        .catch(error => console.error('Error editing contact:', error));
    }

    function deleteContact(index) {
        const contact = contacts[index];
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            contacts.splice(index, 1);
            showContacts();
        })
        .catch(error => console.error('Error deleting contact:', error));
    }

    function showContacts(query = '') {
        contactsList.innerHTML = '';
        contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()))
            .forEach((contact, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${contact.name} - ${contact.number}
                    <span>
                        <button class="btn btn-small" onclick="editContact(${index})">Editar</button>
                        <button class="btn btn-small btn-secondary" onclick="deleteContact(${index})">Eliminar</button>
                    </span>
                `;
                contactsList.appendChild(li);
            });
    }

    window.editContact = function(index) {
        const contact = contacts[index];
        document.getElementById('contactName').value = contact.name;
        document.getElementById('contactNumber').value = contact.number;
        contacts.splice(index, 1);
        showModal(addContactModal);
    };

    window.deleteContact = function(index) {
        deleteContact(index);
    };
});

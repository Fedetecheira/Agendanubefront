document.addEventListener('DOMContentLoaded', function() {
    const addContactBtn = document.getElementById('addContactBtn');
    const viewContactsBtn = document.getElementById('viewContactsBtn');
    const addContactModal = document.getElementById('addContactModal');
    const viewContactsModal = document.getElementById('viewContactsModal');
    const addContactForm = document.getElementById('addContactForm');
    const contactsList = document.getElementById('contactsList');
    const searchContacts = document.getElementById('searchContacts');
    const modalTitle = document.getElementById('modalTitle');
    const editIndexInput = document.getElementById('editIndex');

    let contacts = [];
    let editIndex = -1;

    addContactBtn.addEventListener('click', function() {
        editIndex = -1; 
        modalTitle.textContent = "Agregar Contacto";
        addContactForm.reset(); 
        showModal(addContactModal);
    });

    viewContactsBtn.addEventListener('click', function() {
        showContacts();
        showModal(viewContactsModal);
    });

    document.querySelectorAll('.close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-close');
            hideModal(document.getElementById(modalId));
        });
    });

    addContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const contactName = document.getElementById('contactName').value;
        const contactNumber = document.getElementById('contactNumber').value;

        if (editIndex === -1) {
            addContact(contactName, contactNumber);
        } else {
            updateContact(editIndex, contactName, contactNumber);
        }

        hideModal(addContactModal);
        addContactForm.reset(); 
    });

    searchContacts.addEventListener('input', function() {
        showContacts(this.value);
    });

    function showModal(modal) {
        modal.style.display = 'flex';
    }

    function hideModal(modal) {
        modal.style.display = 'none';
    }

    function addContact(name, number) {
        contacts.push({ name, number });
        showContacts();
    }

    function updateContact(index, name, number) {
        contacts[index] = { name, number };
        showContacts();
    }

    function showContacts(query = '') {
        contactsList.innerHTML = '';
        contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()))
            .forEach((contact, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `
                    ${contact.name} - ${contact.number}
                    <span class="float-right">
                        <button class="btn btn-small btn-info edit-btn">Editar</button>
                        <button class="btn btn-small btn-danger delete-btn">Borrar</button>
                    </span>
                `;
                const editBtn = li.querySelector('.edit-btn');
                const deleteBtn = li.querySelector('.delete-btn');

                editBtn.addEventListener('click', function() {
                    editContact(index);
                });

                deleteBtn.addEventListener('click', function() {
                    deleteContact(index);
                });

                contactsList.appendChild(li);
            });
    }

    function editContact(index) {
        const contact = contacts[index];
        document.getElementById('contactName').value = contact.name;
        document.getElementById('contactNumber').value = contact.number;
        editIndex = index; 
        modalTitle.textContent = "Editar Contacto";
        showModal(addContactModal);
    }

    function deleteContact(index) {
        contacts.splice(index, 1);
        showContacts();
    }
});

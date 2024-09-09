
const baseUrl = 'http://localhost:3000/api';

function displayPersons(persons) {
    const personList = document.getElementById('personList');
    personList.innerHTML = '';

    persons.forEach(person => {
        const personElement = document.createElement('div');
        personElement.className = 'person';
        personElement.innerHTML = `
            <h3>${person.name}</h3>
            <p>CPF: ${person.cpf}</p>
            <p>Phone: ${person.phone}</p>
            <button class="update-btn" data-id="${person.id}">Update</button>
            <button class="delete-btn" data-id="${person.id}">Delete</button>
        `;
        personList.appendChild(personElement);
    });
}


function addPerson(e) {
    e.preventDefault();

    
    const name = document.getElementById('name').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !cpf || !phone) {
        showMessage('Por favor, preencha todos os campos', false, 'add-tab');
        return;
    }

    fetch(`${baseUrl}/persons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, cpf, phone }),
    })
    .then(response => {
        if (!response.ok) throw new Error('Falha ao adicionar cadastro');
        return response.json();
    })
    .then(() => {
        showMessage('Cadastro realizado com sucesso!', true, 'add-tab');
        fetchPersons();
        document.getElementById('addForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Falha ao adicionar cadastro', false, 'add-tab');
    });
}


function updatePerson(e) {
    e.preventDefault();

    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value.trim();
    const cpf = document.getElementById('updateCpf').value.trim();
    const phone = document.getElementById('updatePhone').value.trim();

    if (!name || !cpf || !phone) {
        showMessage('Por favor, preencha todos os campos', false, 'update-delete-tab');
        return;
    }

    fetch(`${baseUrl}/persons/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, cpf, phone }),
    })
    .then(response => {
        if (!response.ok) throw new Error('Falha ao atualizar cadastro');
        return response.json();
    })
    .then(() => {
        showMessage('Cadastro atualizado com sucesso', true, 'update-delete-tab');
        fetchPersons();
        toggleUpdateForm(false);
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Falha ao atualizar cadastro', false, 'update-delete-tab');
    });
}


function deletePerson(id) {
    fetch(`${baseUrl}/persons/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) throw new Error('Falha ao deletar cadastro');
        return response.json();
    })
    .then(() => {
        showMessage('Cadastro deletado com sucesso!', true, 'update-delete-tab');
        fetchPersons();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Falha ao deletar cadastro', false, 'update-delete-tab');
    });
}

// Função para buscar os cadastros pela API
function fetchPersons() {
    fetch(`${baseUrl}/persons`)
        .then(response => {
            if (!response.ok) throw new Error('Falha ao buscar cadastros');
            return response.json();
        })
        .then(persons => displayPersons(persons))
        .catch(error => {
            console.error('Error:', error);
            showMessage('Falha ao carregar cadastros', false);
        });
}


function showMessage(message, success, tabId = 'add-tab') {
    const tabElement = document.getElementById(tabId);
    const messageElement = tabElement.querySelector('.message');

    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        messageElement.className = `message ${success ? 'success-message' : 'error-message'}`;
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }
}


function toggleUpdateForm(show) {
    document.getElementById('updateForm').style.display = show ? 'block' : 'none';
}


function showTab(index) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach((tab, i) => {
        tab.style.display = i === index ? 'block' : 'none';
    });

    buttons.forEach(button => button.classList.remove('active'));
    buttons[index].classList.add('active');

    if (index === 1) {
        fetchPersons(); // Buscar os cadastros ao exibir a aba de atualização/deleção
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    showTab(0); // Mostrar a aba de cadastro por padrão
});

// Event Listeners - Adicionar cadastro
document.getElementById('addForm').addEventListener('submit', addPerson);

// Event Listeners - Atualizar e deletar cadastros
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('update-btn')) {
        const personId = e.target.dataset.id;
        fetch(`${baseUrl}/persons/${personId}`)
            .then(response => response.json())
            .then(person => {
                document.getElementById('updateId').value = person.id;
                document.getElementById('updateName').value = person.name;
                document.getElementById('updateCpf').value = person.cpf;
                document.getElementById('updatePhone').value = person.phone;
                toggleUpdateForm(true);
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Failed to fetch person data.', false);
            });
    } else if (e.target.classList.contains('delete-btn')) {
        const personId = e.target.dataset.id;
        deletePerson(personId);
    }
});

// Event Listeners - Botões da aba de atualização/deleção
document.getElementById('updateBtn').addEventListener('click', updatePerson);
document.getElementById('cancelBtn').addEventListener('click', () => toggleUpdateForm(false));

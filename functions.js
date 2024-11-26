// Elementos do DOM
const form = document.getElementById('userForm');
const userTable = document.getElementById('userTable');

// Função para obter usuários do LocalStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para salvar usuários no LocalStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para renderizar a tabela
function renderTable() {
    const users = getUsers();
    userTable.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Função para adicionar um usuário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (name && email) {
        const users = getUsers();
        users.push({ name, email });
        saveUsers(users);
        renderTable();
        form.reset();
    } else {
        alert('Preencha todos os campos!');
    }
});

// Função para excluir um usuário
function deleteUser(index) {
    const users = getUsers();
    users.splice(index, 1);
    saveUsers(users);
    renderTable();
}

// Renderizar a tabela na inicialização
renderTable();


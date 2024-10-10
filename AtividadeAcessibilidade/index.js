document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const peopleTableBody = document.querySelector('#peopleTable tbody');
    let editIndex = -1; 

    function updateTable() {
        peopleTableBody.innerHTML = '';
        const people = JSON.parse(localStorage.getItem('pessoas')) || [];

        people.forEach((person, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.name}</td>
                <td>${person.dob}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Editar</button>
                    <button class="delete-btn" data-index="${index}">Excluir</button>
                </td>
            `;
            peopleTableBody.appendChild(row);
        });

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                loadPersonForEdit(index);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                deletePerson(index);
            });
        });
    }

    function loadPersonForEdit(index) {
        const people = JSON.parse(localStorage.getItem('pessoas')) || [];
        const person = people[index];

        document.getElementById('name').value = person.name;
        document.getElementById('dob').value = person.dob;
        editIndex = index;  
    }

    function deletePerson(index) {
        const people = JSON.parse(localStorage.getItem('pessoas')) || [];
        people.splice(index, 1); // Remove a pessoa pelo índice
        localStorage.setItem('pessoas', JSON.stringify(people));
        updateTable(); // Atualiza a tabela
    }

    updateTable();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const dobInput = document.getElementById('dob');

        const name = nameInput.value.trim();
        const dob = dobInput.value;

        nameInput.setCustomValidity('');
        dobInput.setCustomValidity('');

        const nameRegex = /^[A-Za-zÀ-ÿ]+$/;
        if (name === '') {
            nameInput.setCustomValidity('O campo Nome não pode estar vazio.');
        } else if (name.length < 3 || name.length > 120) {
            nameInput.setCustomValidity('O Nome deve ter entre 3 e 120 caracteres.');
        } else if (!nameRegex.test(name)) {
            nameInput.setCustomValidity('O Nome deve conter apenas letras.');
        }

        if (!dob) {
            dobInput.setCustomValidity('O campo Data de Nascimento não pode estar vazio.');
        }

        if (form.checkValidity()) {
            const people = JSON.parse(localStorage.getItem('pessoas')) || [];

            if (editIndex > -1) {
                people[editIndex] = { name, dob };
                editIndex = -1; 
            } else {
                people.push({ name, dob });
            }

            localStorage.setItem('pessoas', JSON.stringify(people));

            form.reset();
            updateTable();

            console.log('Nome:', name);
            console.log('Data de Nascimento:', dob);
        } else {
            console.log('Existem erros no formulário.');
        }
    });
});

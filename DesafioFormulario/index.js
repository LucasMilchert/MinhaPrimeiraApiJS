document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const peopleTableBody = document.querySelector('#peopleTable tbody');

   
    function updateTable() {
    
        peopleTableBody.innerHTML = '';

       
        const people = JSON.parse(localStorage.getItem('pessoas')) || [];

   
        people.forEach(person => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${person.name}</td><td>${person.dob}</td>`;
            peopleTableBody.appendChild(row);
        });
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

         
            people.push({ name, dob });

       
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

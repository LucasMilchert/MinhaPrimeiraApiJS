
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const name = document.getElementById('name').value.trim();
        const dob = document.getElementById('dob').value;

        // Validação do nome
        if (name === '') {
            console.log('O campo Nome não pode estar vazio.');
        } else {
            console.log('Nome:', name);
        }

        // Validação da data de nascimento
        if (!dob) {
            console.log('O campo Data de Nascimento não pode estar vazio.');
        } else {
            console.log('Data de Nascimento:', dob);
        }
    });
});

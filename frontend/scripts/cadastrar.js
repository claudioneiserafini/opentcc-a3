document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('arquivo');

    // Arrastar e soltar
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.background = '#e6f0ff';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.background = '#f0f8ff';
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.style.background = '#f0f8ff';

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files; // Vincula o arquivo ao input
        }
    });

    // Submissão do formulário
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(formCadastro);

        fetch('http://localhost:3000/tccs', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar TCC.');
                }
                return response.json();
            })
            .then((data) => {
                alert('TCC cadastrado com sucesso!');
                formCadastro.reset();
            })
            .catch((error) => {
                console.error(error);
                alert('Erro ao cadastrar o TCC.');
            });
    });
});

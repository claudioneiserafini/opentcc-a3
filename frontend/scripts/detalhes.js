// scripts/detalhes.js

document.addEventListener('DOMContentLoaded', () => {
    const detalhesTcc = document.getElementById('detalhes-tcc');

    // Função para obter o parâmetro 'id' da URL
    function getIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    const tccId = getIdFromURL();

    if (!tccId) {
        detalhesTcc.innerHTML = '<p>ID do TCC não fornecido.</p>';
        return;
    }

    // Função para buscar detalhes do TCC
    function buscarDetalhesTcc(id) {
        fetch(`http://localhost:3000/tccs/${id}`)
            .then(response => response.json())
            .then(tcc => {
                exibirDetalhesTcc(tcc);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do TCC:', error);
            });
    }

    // Função para exibir detalhes do TCC
    function exibirDetalhesTcc(tcc) {
        detalhesTcc.innerHTML = `
            <h2>${tcc.titulo}</h2>
            <p><strong>Autor:</strong> ${tcc.autor}</p>
            <p><strong>Resumo:</strong> ${tcc.resumo}</p>
            <a href="${tcc.arquivo_pdf}" download>Baixar PDF</a>
        `;
    }

    // Buscar os detalhes do TCC
    buscarDetalhesTcc(tccId);
});

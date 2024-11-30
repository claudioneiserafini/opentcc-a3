document.addEventListener('DOMContentLoaded', () => {
    const termoPesquisa = document.getElementById('termo-pesquisa');
    const listaTccs = document.getElementById('lista-tccs');

    // Função para buscar TCCs do backend
    function buscarTccs(termo = '') {
        const url = termo.trim()
            ? `http://localhost:3000/tccs?search=${encodeURIComponent(termo)}`
            : `http://localhost:3000/tccs`; // Mostra todos os TCCs quando o campo está vazio

        fetch(url)
            .then(response => response.json())
            .then(tccs => {
                exibirTccs(tccs);
            })
            .catch(error => {
                console.error('Erro ao buscar TCCs:', error);
            });
    }

    // Função para exibir os TCCs
    function exibirTccs(tccs) {
        listaTccs.innerHTML = ''; // Limpa a lista

        if (tccs.length === 0) {
            listaTccs.innerHTML = '<p>Nenhum TCC encontrado.</p>';
            return;
        }

        tccs.forEach(tcc => {
            const card = document.createElement('div');
            card.classList.add('tcc-card');
            card.innerHTML = `
                <h2>${tcc.titulo}</h2>
                <p><strong>Autor:</strong> ${tcc.autor}</p>
                <p>${tcc.resumo.slice(0, 100)}...</p>
                <a href="detalhes.html?id=${tcc.id}">Ver mais</a>
            `;
            listaTccs.appendChild(card);
        });
    }

    // Atualizar TCCs enquanto digita no campo de pesquisa
    termoPesquisa.addEventListener('input', () => {
        const termo = termoPesquisa.value;
        buscarTccs(termo);
    });

    // Buscar todos os TCCs ao carregar a página
    buscarTccs();
});

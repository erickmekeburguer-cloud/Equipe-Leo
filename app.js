// TROQUE PELA SUA URL DO RENDER
const API_URL = 'https://equipe100-api.onrender.com/api';

function fazerLogin() {
    document.getElementById('tela-login').style.display = 'none';
    document.getElementById('sistema').style.display = 'flex';
    abrirPagina('youpoints', document.querySelector('.sidebar a')); // Abre a primeira aba
}

function sair() {
    document.getElementById('sistema').style.display = 'none';
    document.getElementById('tela-login').style.display = 'flex';
}

function abrirPagina(nomePagina, elementoMenu) {
    // Esconde todas as páginas e tira o "active" do menu
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));

    // Mostra a página correta e ativa o menu
    document.getElementById(`page-${nomePagina}`).classList.add('active');
    if(elementoMenu) elementoMenu.classList.add('active');

    // Chama a função que busca os dados da página (se existir)
    if (nomePagina === 'youpoints') carregarYouPoints();
    if (nomePagina === 'abs') carregarABS();
    if (nomePagina === 'tempo') carregarTempo();
    if (nomePagina === 'banco') carregarBanco();
    if (nomePagina === 'indicadores') carregarIndicadores();
}

// === BUSCA DE DADOS NA API ===

async function carregarYouPoints() {
    const tbody = document.getElementById('tbody-youpoints');
    tbody.innerHTML = '<tr><td colspan="7">Buscando dados...</td></tr>';
    try {
        const res = await fetch(`${API_URL}/youpoints`);
        const dados = await res.json();
        tbody.innerHTML = '';
        if(dados.length === 0) return tbody.innerHTML = '<tr><td colspan="7">Sem dados no banco.</td></tr>';
        
        dados.forEach(d => {
            tbody.innerHTML += `
                <tr>
                    <td>${d.colaborador ? d.colaborador.nome : '-'}</td>
                    <td>${d.abs || 0}</td>
                    <td>${d.tempoLogado || 0}</td>
                    <td>${d.tempoProdutivo || 0}</td>
                    <td>${d.qualidade || '-'}</td>
                    <td>${d.tabulacaoNA || 0}</td>
                    <td>${d.transfPesquisa || 0}</td>
                </tr>`;
        });
    } catch (e) { tbody.innerHTML = '<tr><td colspan="7" style="color:red;">Erro ao conectar na API.</td></tr>'; }
}

// (As funções abaixo estão prontas, mas vão mostrar aviso se a rota não existir na API ainda)
async function carregarABS() {
    const tbody = document.getElementById('tbody-abs');
    try {
        const res = await fetch(`${API_URL}/abs`);
        if(!res.ok) throw new Error();
        // Lógica para preencher a tabela de ABS quando a rota existir
    } catch (e) { tbody.innerHTML = '<tr><td colspan="2">Rota de ABS ainda não criada na API.</td></tr>'; }
}

async function carregarTempo() {
    const tbody = document.getElementById('tbody-tempo');
    try {
        const res = await fetch(`${API_URL}/tempo-produtivo`);
        if(!res.ok) throw new Error();
        // Lógica para preencher a tabela de Tempo Produtivo
    } catch (e) { tbody.innerHTML = '<tr><td colspan="4">Rota de Tempo Produtivo ainda não criada na API.</td></tr>'; }
}

async function carregarBanco() {
    const tbody = document.getElementById('tbody-banco');
    try {
        const res = await fetch(`${API_URL}/banco-horas`);
        if(!res.ok) throw new Error();
        // Lógica para preencher a tabela de Banco de Horas
    } catch (e) { tbody.innerHTML = '<tr><td colspan="5">Rota de Banco de Horas ainda não criada na API.</td></tr>'; }
}

async function carregarIndicadores() {
    const tbody = document.getElementById('tbody-indicadores');
    try {
        const res = await fetch(`${API_URL}/indicadores`);
        if(!res.ok) throw new Error();
        // Lógica para preencher a tabela de Indicadores
    } catch (e) { tbody.innerHTML = '<tr><td colspan="5">Rota de Indicadores ainda não criada na API.</td></tr>'; }
}

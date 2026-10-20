
const RESTAURANTE = 'VEROCAI';
const URL_API = `https://tech4produtos.fly.dev/produtos/restaurante=${RESTAURANTE}`;
const URL_DETALHES = 'detalhes.html';

const PRECOS = {
    'Filé com Fritas': '32,90R$',
    'Frango à Parmegiana': '29,90R$',
    'Feijoada': '34,50R$',
    'Lasanha Bolonhesa': '27,90R$',
    'Risoto de Camarão': '38,90R$',
    'Espaguete à Carbonara': '26,50R$',
    'Strogonoff de Carne': '30,50R$',
    'Caldo Verde': '18,90R$',
    'Moqueca de Peixe': '39,90R$'
};

const listaCardapio = document.getElementById('lista-cardapio');

function criarCard(produto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    const imagem = document.createElement('img');
    imagem.className = 'card-img-top';
    imagem.src = produto.imagem;
    imagem.alt = produto.produto;
    imagem.height = 200;
    imagem.width = 200;

    const corpo = document.createElement('div');
    corpo.className = 'card-body';

    const titulo = document.createElement('h5');
    titulo.className = 'card-title';
    titulo.textContent = produto.produto;

    const descricao = document.createElement('p');
    descricao.className = 'card-text';
    descricao.textContent = produto.descricao;

    const preco = document.createElement('h6');
    const precoForte = document.createElement('strong');
    precoForte.textContent = PRECOS[produto.produto] || 'Consulte o preço';
    preco.appendChild(precoForte);

    const botao = document.createElement('a');
    botao.className = 'btn btn-danger';
    botao.href = `${URL_DETALHES}?id=${produto.id}`;
    botao.textContent = 'Ver detalhes';

    corpo.append(titulo, descricao, preco, botao);
    card.append(imagem, corpo);

    return card;
}

async function carregarCardapio() {
    listaCardapio.innerHTML = '<p>Carregando cardápio...</p>';

    const resposta = await fetch(URL_API);
    const produtos = await resposta.json();

    listaCardapio.innerHTML = '';

    if (produtos.length === 0) {
        listaCardapio.innerHTML = '<p>Nenhum produto encontrado para este restaurante.</p>';
        return;
    }

    produtos.forEach((produto) => {
        listaCardapio.appendChild(criarCard(produto));
    });
}

carregarCardapio();

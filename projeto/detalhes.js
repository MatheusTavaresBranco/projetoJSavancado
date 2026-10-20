
const RESTAURANTE = 'VEROCAI';
const URL_API = 'https://tech4produtos.fly.dev/produtos';

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

const EXTRAS = {
    'Filé com Fritas': {
        'Categoria': 'Carnes',
        'Ingredientes': 'Filé mignon grelhado, batatas rústicas, manteiga com alho e cheiro-verde',
        'Serve': '1 pessoa (aprox. 400g)',
        'Tempo de preparo': '25 minutos',
        'Alergênicos': 'Leite',
        'Dica da casa': 'Peça ao ponto para ficar ainda mais suculento.'
    },
    'Frango à Parmegiana': {
        'Categoria': 'Frangos',
        'Ingredientes': 'Filé de frango empanado, molho de tomate caseiro, mussarela e parmesão',
        'Serve': '1 pessoa (aprox. 450g)',
        'Tempo de preparo': '30 minutos',
        'Alergênicos': 'Glúten, leite e ovos',
        'Dica da casa': 'Combina perfeitamente com arroz branco e fritas.'
    },
    'Feijoada': {
        'Categoria': 'Tradicional',
        'Ingredientes': 'Feijão preto, carnes selecionadas, arroz, couve refogada, farofa e laranja',
        'Serve': '2 pessoas (aprox. 800g)',
        'Tempo de preparo': '40 minutos',
        'Alergênicos': 'Pode conter glúten (farofa)',
        'Dica da casa': 'Feita na hora, servida bem quente.'
    },
    'Lasanha Bolonhesa': {
        'Categoria': 'Massas',
        'Ingredientes': 'Massa de lasanha, molho bolonhesa, mussarela e parmesão gratinado',
        'Serve': '1 pessoa (aprox. 350g)',
        'Tempo de preparo': '20 minutos',
        'Alergênicos': 'Glúten e leite',
        'Dica da casa': 'Deixe gratinar mais 5 minutos para a borda dourar.'
    },
    'Risoto de Camarão': {
        'Categoria': 'Frutos do mar',
        'Ingredientes': 'Arroz arbóreo, camarão fresco, manteiga, vinho branco e limão siciliano',
        'Serve': '1 pessoa (aprox. 400g)',
        'Tempo de preparo': '35 minutos',
        'Alergênicos': 'Crustáceos e leite',
        'Dica da casa': 'Sirva imediatamente, enquanto está cremoso.'
    },
    'Espaguete à Carbonara': {
        'Categoria': 'Massas',
        'Ingredientes': 'Espaguete, pancetta crocante, gemas, parmesão e pimenta-do-reino',
        'Serve': '1 pessoa (aprox. 380g)',
        'Tempo de preparo': '25 minutos',
        'Alergênicos': 'Glúten, leite e ovos',
        'Dica da casa': 'O cremoso vem só das gemas, sem creme de leite.'
    },
    'Strogonoff de Carne': {
        'Categoria': 'Carnes',
        'Ingredientes': 'Cubos de carne macia, molho de tomate, creme de leite e champignon',
        'Serve': '2 pessoas (aprox. 700g)',
        'Tempo de preparo': '35 minutos',
        'Alergênicos': 'Leite',
        'Dica da casa': 'Acompanha arroz branco e batata palha.'
    },
    'Caldo Verde': {
        'Categoria': 'Sopas',
        'Ingredientes': 'Batata, couve fatiada fina e linguiça artesanal',
        'Serve': '1 pessoa (aprox. 500ml)',
        'Tempo de preparo': '20 minutos',
        'Alergênicos': 'Pode conter lactose',
        'Dica da casa': 'Sirva com pão quente e um fio de azeite por cima.'
    },
    'Moqueca de Peixe': {
        'Categoria': 'Frutos do mar',
        'Ingredientes': 'Postas de peixe fresco, leite de coco, azeite de dendê, pimentões e coentro',
        'Serve': '2 pessoas (aprox. 700g)',
        'Tempo de preparo': '40 minutos',
        'Alergênicos': 'Peixe e crustáceos',
        'Dica da casa': 'Acompanha pirão e arroz branco.'
    }
};

const areaDetalhes = document.getElementById('detalhes-produto');

function pegarIdDaUrl() {
    const busca = window.location.search;

    if (busca === '') {
        return null;
    }

    return busca.replace('?id=', '');
}

function montarExtras(produto) {
    const informacoes = EXTRAS[produto.produto];

    if (!informacoes) {
        return null;
    }

    const bloco = document.createElement('div');
    bloco.className = 'extras';

    const titulo = document.createElement('h6');
    titulo.textContent = 'Mais detalhes';

    const lista = document.createElement('ul');

    for (const rotulo in informacoes) {
        const item = document.createElement('li');

        const rotuloForte = document.createElement('strong');
        rotuloForte.textContent = `${rotulo}: `;

        item.append(rotuloForte, informacoes[rotulo]);
        lista.appendChild(item);
    }

    bloco.append(titulo, lista);

    return bloco;
}

function montarDetalhes(produto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.textAlign = 'center';

    const imagem = document.createElement('div');
    imagem.className = 'img-card';
    imagem.style.backgroundImage = `url('${produto.imagem}')`;

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

    const pedido = document.createElement('a');
    pedido.className = 'btn btn-danger piscar';
    pedido.href = 'detalhes.html';
    pedido.textContent = 'Realizar pedido';
    pedido.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Pedido realizado!');
    });

    corpo.append(titulo, descricao, preco, pedido);

    const extras = montarExtras(produto);

    if (extras) {
        corpo.appendChild(extras);
    }

    const perguntas = document.createElement('h4');
    perguntas.textContent = 'Deseja receber promoções deste pedido?';

    const form = document.createElement('form');

    const grupoEmail = document.createElement('div');
    grupoEmail.className = 'mb-3';

    const rotulo = document.createElement('label');
    rotulo.className = 'form-label';
    rotulo.textContent = 'Seu e-mail';

    const entrada = document.createElement('input');
    entrada.type = 'email';
    entrada.className = 'form-control';
    entrada.placeholder = 'Digite seu e-mail';

    grupoEmail.append(rotulo, entrada);

    const grupoTermos = document.createElement('div');
    grupoTermos.className = 'form-check mb-3';

    const caixa = document.createElement('input');
    caixa.className = 'form-check-input';
    caixa.type = 'checkbox';
    caixa.id = 'termos';

    const rotuloTermos = document.createElement('label');
    rotuloTermos.className = 'form-check-label';
    rotuloTermos.htmlFor = 'termos';
    rotuloTermos.textContent = 'Aceito os termos de uso';

    grupoTermos.append(caixa, rotuloTermos);

    const enviar = document.createElement('button');
    enviar.type = 'button';
    enviar.className = 'btn btn-success';
    enviar.textContent = 'Enviar';
    enviar.addEventListener('click', () => {
        alert('E-mail cadastrado com sucesso!');
    });

    form.append(grupoEmail, grupoTermos, enviar);

    const restaurante = document.createElement('p');
    restaurante.className = 'restaurante';
    restaurante.textContent = `Restaurante: ${produto.restaurante} | Atendente: ${produto.nome}`;

    card.append(imagem, corpo, perguntas, form, restaurante);

    return card;
}

function exibirMensagem(texto) {
    areaDetalhes.innerHTML = '';
    const mensagem = document.createElement('p');
    mensagem.className = 'text-center';
    mensagem.textContent = texto;
    areaDetalhes.appendChild(mensagem);
}

function exibirEscolha() {
    areaDetalhes.innerHTML = '';

    const mensagem = document.createElement('p');
    mensagem.className = 'text-center';
    mensagem.textContent = 'Escolha um prato no cardápio para ver os detalhes.';

    const botao = document.createElement('a');
    botao.className = 'btn btn-danger';
    botao.href = 'cardapio.html';
    botao.textContent = 'Ir para o cardápio';

    const espaco = document.createElement('div');
    espaco.className = 'text-center';
    espaco.appendChild(botao);

    areaDetalhes.append(mensagem, espaco);
}

async function carregarDetalhes() {
    areaDetalhes.innerHTML = '<p class="text-center">Carregando detalhes do produto...</p>';

    const id = pegarIdDaUrl();

    if (!id) {
        exibirEscolha();
        return;
    }

    const resposta = await fetch(`${URL_API}/${id}`);
    const produto = await resposta.json();

    if (!produto || !produto.produto) {
        exibirMensagem('Produto não encontrado. Escolha um prato no cardápio.');
        return;
    }

    areaDetalhes.innerHTML = '';
    areaDetalhes.appendChild(montarDetalhes(produto));
}

carregarDetalhes();

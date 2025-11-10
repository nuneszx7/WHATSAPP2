'use strict'

// mensagens das conversas
const mensagensPorContato = {
    'Cristiano Ronaldo': [
        { texto: 'SIUUUUUU', hora: '10:40', tipo: 'recebida' },
        { texto: 'É isso!!', hora: '10:45', tipo: 'enviada', status: 'visualizado' }
    ],
    'Maria': [
        { texto: 'Oi, tudo bem?', hora: '11:28', tipo: 'recebida' },
        { texto: 'KKKKKKKKKKKKKKKK que daora', hora: '11:30', tipo: 'recebida' }
    ],
    'Grupo': [
        { remetente: 'Mãe', texto: 'Bom dia', hora: '7:21', tipo: 'recebida' }
    ],
    'Trabalho': [
        { texto: 'Ok, amanhã eu vejo isso.', hora: 'Ontem', tipo: 'enviada', status: 'visualizado' }
    ]
};

//cria o HTML de uma única mensagem
const criarMensagemHTML = (mensagem) => {
    const div = document.createElement('div');
    div.classList.add('mensagem', mensagem.tipo);

    let conteudoMensagem = '';

    //se for uma mensagem de grupo (tem um remetente), adiciona o nome dele
    if (mensagem.remetente) {
        conteudoMensagem += `<span class="nome-remetente">${mensagem.remetente}</span>`;
    }
    conteudoMensagem += `<span>${mensagem.texto}</span>`; // deixando o texto em um span

    if (mensagem.tipo === 'enviada' && mensagem.status === 'visualizado') {
        conteudoMensagem += `<i class="fas fa-check-double status-mensagem-visualizado"></i>`;
    }

    conteudoMensagem += `<span class="hora-mensagem">${mensagem.hora}</span>`;

    div.innerHTML = conteudoMensagem;
    return div;
};

//atualizar o painel direito com os dados da conversa
const carregarConversa = (conversaClicada) => {
    const nomeContato = conversaClicada.querySelector('.nome-contato').textContent;
    const imagemContato = conversaClicada.querySelector('.avatar').src;

    const cabecalhoChat = document.querySelector('.cabecalho-chat');
    const nomeContatoDireito = cabecalhoChat.querySelector('.nome-contato');
    const imagemContatoDireito = cabecalhoChat.querySelector('.avatar');
    const areaMensagens = document.querySelector('.area-mensagens');

    //Atualiza o cabeçalho do chat
    nomeContatoDireito.textContent = nomeContato;
    imagemContatoDireito.src = imagemContato;

    //Limpa a area de mensagens
    areaMensagens.innerHTML = '';

    //carrega as mensagens do contato selecionado
    const mensagens = mensagensPorContato[nomeContato] || [];
    mensagens.forEach(msg => {
        const elementoMensagem = criarMensagemHTML(msg);
        areaMensagens.appendChild(elementoMensagem);
    });
}

//seleciona todos os itens de conversa
const conversas = document.querySelectorAll('.item-conversa');

conversas.forEach(conversa => {
    conversa.addEventListener('click', () => {
        //remove a classe 'ativo' da conversa atualmente ativa
        const conversaAtiva = document.querySelector('.item-conversa.ativo');
        if (conversaAtiva) {
            conversaAtiva.classList.remove('ativo');
        }

        //adiciona a classe 'ativo' na conversa clicada, tipo, quando eu clico em uma conversa, ela se torna a conversa "ativa"
        conversa.classList.add('ativo');

        carregarConversa(conversa);
    });
});

//carrega a conversa inicial que já está marcada como 'ativo' no HTML
const conversaInicial = document.querySelector('.item-conversa.ativo');
if (conversaInicial) {
    carregarConversa(conversaInicial);
}
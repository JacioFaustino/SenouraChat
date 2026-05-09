// 🔑 VERIFICA E MOSTRA USUÁRIO LOGADO
const usuarioAtual = localStorage.getItem('usuarioLogado');
if (!usuarioAtual) {
    alert('❌ Faça login primeiro!');
    window.location.href = 'index.html';
}

// ✅ MOSTRA USUÁRIO NO PERFIL
document.getElementById('nomeUsuario').textContent = usuarioAtual;

const txtArea = document.getElementById("txt_area");
const btnEnviar = document.getElementById("btn_enviar");
const chat = document.getElementById("chat");

const headerNome = document.getElementById("header_nome");
const headerImg = document.getElementById("header_img");

<<<<<<< HEAD
// Carrega mensagens antigas
mensagens.forEach(msg => criarMensagem(msg));
=======
const botoesChat = document.querySelectorAll(".chat-btn, button[data-chat]");

const chatsPadrao = {
    papai: [
        {
            tipo: "recebida",
            texto: "Fala, desocupado"
        },
        {
            tipo: "enviada",
            texto: "Tudo bem?"
        },
        {
            tipo: "recebida",
            texto: "Vai comprar pão"
        }
    ],

    fabricio: [
        {
            tipo: "recebida",
            texto: "Bora jogar mais tarde?"
        },
        {
            tipo: "recebida",
            texto: "umas 14 e pouco"
        },
        {
            tipo: "recebida",
            texto: "sipa"
        },
        {
            tipo: "enviada",
            texto: "Bora"
        }
    ],

    agiota: [
        {
            tipo: "recebida",
            texto: "Cadê meu dinheiro?"
        },
        {
            tipo: "enviada",
            texto: "Semana que vem eu pago, mano"
        },
        {
            tipo: "recebida",
            texto: "Semana que vem eu vou na sua casa, irmão"
        }
    ],

    mateus: [
        {
            tipo: "recebida",
            texto: "Tu viu o trabalho?"
        },
        {
            tipo: "enviada",
            texto: "vou ver, pow"
        },
        {
            tipo: "enviada",
            texto: "calmae"
        }
    ],

    amor: [
        {
            tipo: "recebida",
            texto: "Boa noite ❤️"
        },
        {
            tipo: "enviada",
            texto: "Boa noite, meu amor"
        }
    ]
};

let chats =
    JSON.parse(localStorage.getItem("senoura_chats"))
    || chatsPadrao;

let chatAtual =
    localStorage.getItem("chat_atual")
    || "papai";

function salvarChats() {

    localStorage.setItem(
        "senoura_chats",
        JSON.stringify(chats)
    );

    localStorage.setItem(
        "chat_atual",
        chatAtual
    );
}

function criarMensagem(tipo, texto) {
>>>>>>> c4f36d5dd4a364c2a15b0c13d0fdee908c3bdf17

function criarMensagem(textoCompleto) {
    const linha = document.createElement("div");
<<<<<<< HEAD
    
    // Separa: "joao: mensagem"
    const partes = textoCompleto.split(': ', 2);
    const usuarioMsg = partes[0];
    const textoMsg = partes[1] || textoCompleto;
    
    // ✅ SUAS MENSAGENS = DIREITA (laranja)
    if (usuarioMsg === usuarioAtual) {
        linha.className = "w-full flex justify-end mb-2";
        const balao = document.createElement("div");
        balao.className = `
            bg-orange-400 text-white px-4 py-2 rounded-2xl rounded-tr-sm
            max-w-[70%] break-words shadow-lg
        `;
        balao.innerHTML = `<strong>${usuarioMsg}:</strong> ${textoMsg}`;
        linha.appendChild(balao);
    } 
    // ✅ OUTROS = ESQUERDA (cinza)
    else {
        linha.className = "w-full flex justify-start mb-2";
        const balao = document.createElement("div");
        balao.className = `
            bg-gray-600 text-white px-4 py-2 rounded-2xl rounded-tl-sm
            max-w-[70%] break-words shadow-lg
        `;
        balao.innerHTML = `<strong>${usuarioMsg}:</strong> ${textoMsg}`;
        linha.appendChild(balao);
    }
    
=======

    linha.className =
        tipo === "enviada"
        ? "w-full flex justify-end"
        : "w-full flex";

    const balao = document.createElement("div");

    balao.className =
        tipo === "enviada"
        ? `
        bg-orange-400 text-white
        px-4 py-2 rounded-2xl
        max-w-[70%]
        break-words
        `
        : `
        bg-white text-black
        px-4 py-2 rounded-2xl
        max-w-[70%]
        break-words
        `;

    balao.textContent = texto;

    linha.appendChild(balao);

>>>>>>> c4f36d5dd4a364c2a15b0c13d0fdee908c3bdf17
    chat.appendChild(linha);
    linha.scrollIntoView({ behavior: "smooth" });
}

function carregarChat(nomeChat) {

    chat.innerHTML = "";

    const mensagens = chats[nomeChat];

    mensagens.forEach(msg => {

        criarMensagem(
            msg.tipo,
            msg.texto
        );

    });
}

function selecionarBotao(botaoAtual) {

    botoesChat.forEach(btn => {

        btn.classList.remove(
            "bg-gray-800"
        );

    });

    botaoAtual.classList.add(
        "bg-gray-800"
    );
}

function abrirChat(botao) {

    const nome = botao.dataset.nome;
    const img = botao.dataset.img;
    const id = botao.dataset.chat;

    chatAtual = id;

    headerNome.textContent = nome;
    headerImg.src = img;

    selecionarBotao(botao);

    carregarChat(id);

    salvarChats();
}

botoesChat.forEach(botao => {

    botao.addEventListener("click", () => {

        abrirChat(botao);

    });

});

function enviarMensagem() {
    const texto = txtArea.value.trim();
    if (texto === "") return;

<<<<<<< HEAD
    // ✅ ADICIONA USUÁRIO AUTOMATICAMENTE
    const mensagemCompleta = `${usuarioAtual}: ${texto}`;
    
    criarMensagem(mensagemCompleta);
    mensagens.push(mensagemCompleta);
    
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
    txtArea.value = "";
}

// Eventos
btnEnviar.addEventListener("click", enviarMensagem);

txtArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviarMensagem();
=======
    const novaMensagem = {
        tipo: "enviada",
        texto: texto
    };

    chats[chatAtual].push(
        novaMensagem
    );

    criarMensagem(
        "enviada",
        texto
    );

    salvarChats();

    txtArea.value = "";
}

btnEnviar.addEventListener(
    "click",
    enviarMensagem
);

txtArea.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Enter"
            && !e.shiftKey
        ) {

            e.preventDefault();

            enviarMensagem();
        }
>>>>>>> c4f36d5dd4a364c2a15b0c13d0fdee908c3bdf17
    }
);

<<<<<<< HEAD
const btnSenoura = document.getElementById("btn_senoura");
btnSenoura.addEventListener("click", () => {
    if (confirm('Limpar chat e deslogar? 🥕')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
});
=======
const btnSenoura =
    document.getElementById(
        "btn_senoura"
    );

btnSenoura.addEventListener(
    "click",
    () => {

        alert("💀");

        localStorage.clear();

        location.reload();
    }
);

const botaoInicial =
    document.querySelector(
        `[data-chat="${chatAtual}"]`
    );

abrirChat(botaoInicial);
>>>>>>> c4f36d5dd4a364c2a15b0c13d0fdee908c3bdf17

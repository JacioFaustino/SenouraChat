const usuarioAtual = localStorage.getItem("usuarioLogado");

if (!usuarioAtual) {

    alert("❌ Faça login primeiro!");

    window.location.href = "index.html";
}


document.getElementById("nomeUsuario").textContent = usuarioAtual;

const txtArea = document.getElementById("txt_area");
const btnEnviar = document.getElementById("btn_enviar");
const chat = document.getElementById("chat");

const headerNome = document.getElementById("header_nome");
const headerImg = document.getElementById("header_img");

const botoesChat = document.querySelectorAll(".chat-btn");

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
    texto: "Tava vendo as fotos aqui... que saudade do meu nene :/"
  },
  {
    tipo: "enviada",
    texto: "Tbm to com sdd do meu dengo. O papai ja ja chega pra te dar muito beijinho de esquilo 🐿️🐿️"
  },
  {
    tipo: "recebida",
    texto: "Aiiii paraaaa kkkkk eu fico toda arrepiada quando vc faz o barulhinho do esquilo no meu pescoço!! nham nham nham"
  },
  {
    tipo: "enviada",
    texto: "Vou morder essa orelhinha até vc pedir arrego. Quem é a minha gatinha manhosa?"
  },
  {
    tipo: "recebida",
    texto: "Eu sou! Miau! 😻 o nene quer leitinho no colo hoje?"
  },
  {
    tipo: "enviada",
    texto: "Quero mtoooo. Mas tem q ser na boquinha e fazendo carinho na minha careca kkkkkk"
  },
  {
    tipo: "recebida",
    texto: "Faço sim meu reizinho. Vou até colocar aquela nossa fantasia de pinguim pra gente ficar balançando de um lado pro outro na cama kkkkkk imagina a cena"
  },
  {
    tipo: "enviada",
    texto: "Kkkkkkkkk a gente é mto bobo né. Meu pinguinho de mel."
  },
  {
    tipo: "recebida",
    texto: "Sou sua e vc é meu. De quem é esse pinguim que o papai gosta?"
  },
  {
    tipo: "enviada",
    texto: "É seuuuu. Todo seu. Dá carão pra eu aprender a ser uma pinguim obediente? 🐧"
  },
  {
    tipo: "recebida",
    texto: "Vou dar mtooo. Vou te encher de \"nhoc nhoc\" nas bochechas tbm."
  },
  {
    tipo: "enviada",
    texto: "Te amo meu totó. Au au! Faz o barulhinho de cachorro pro seu amor fazzz"
  },
  {
    tipo: "recebida",
    texto: "Uf uf! Auuuu! 🐶 dps vou lamber seu nariz todinho kkkkkk"
  },
  {
    tipo: "enviada",
    texto: "Oi. Vou passar no mercado agora."
  },
  {
    tipo: "recebida",
    texto: "Beleza. Traz papel higiênico e sabão em pó."
  },
  {
    tipo: "enviada",
    texto: "Qual marca? O de sempre?"
  },
  {
    tipo: "recebida",
    texto: "Sim. E vê se não esquece a carne pro jantar."
  },
  {
    tipo: "enviada",
    texto: "Ok, chego em 20 minutos. Beijos."
  },
 {
    tipo: "recebida",
    texto: "Ah, aproveita e vê se tem arroz também, acho que acabou."
  },
  {
    tipo: "enviada",
    texto: "Tá bom, vou olhar tudo lá. Se tiver promoção eu já pego mais."
  },
  {
    tipo: "recebida",
    texto: "Perfeito. Hoje vou fazer aquele almoço mais simples mesmo, tô meio cansada."
  },
  {
    tipo: "enviada",
    texto: "Tranquilo, amor. Quer que eu passe na farmácia também?"
  },
  {
    tipo: "recebida",
    texto: "Não precisa não. Só vem logo pra casa depois."
  },
  {
    tipo: "enviada",
    texto: "Pode deixar. Já tô indo, te aviso quando estiver chegando."
  },
  {
    tipo: "recebida",
    texto: "Tá bom. Dirige com cuidado."
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

    const linha = document.createElement("div");

    linha.className =
        tipo === "enviada"
        ? "w-full flex justify-end mb-2"
        : "w-full flex justify-start mb-2";

    const balao = document.createElement("div");

    balao.className =
        tipo === "enviada"
        ? `
        bg-orange-400 text-white
        px-4 py-2 rounded-2xl rounded-tr-sm
        max-w-[70%]
        break-words
        shadow-lg
        `
        : `
        bg-gray-600 text-white
        px-4 py-2 rounded-2xl rounded-tl-sm
        max-w-[70%]
        break-words
        shadow-lg
        `;

    const nomeMensagem =
        tipo === "enviada"
        ? usuarioAtual
        : headerNome.textContent;

    balao.textContent = texto;

    linha.appendChild(balao);

    chat.appendChild(linha);

    linha.scrollIntoView({
        behavior: "smooth"
    });
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
    }
);


const btnSenoura =
    document.getElementById(
        "btn_senoura"
    );

btnSenoura.addEventListener(
    "click",
    () => {

        if (
            confirm("💀")
        ) {

            localStorage.clear();

            window.location.href =
                "index.html";
        }
    }
);

const botaoInicial =
    document.querySelector(
        `[data-chat="${chatAtual}"]`
    );

abrirChat(botaoInicial);
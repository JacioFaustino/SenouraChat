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

let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

// Carrega mensagens antigas
mensagens.forEach(msg => criarMensagem(msg));

function criarMensagem(textoCompleto) {
    const linha = document.createElement("div");
    
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
    
    chat.appendChild(linha);
    linha.scrollIntoView({ behavior: "smooth" });
}

function enviarMensagem() {
    const texto = txtArea.value.trim();
    if (texto === "") return;

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
    }
});

const btnSenoura = document.getElementById("btn_senoura");
btnSenoura.addEventListener("click", () => {
    if (confirm('Limpar chat e deslogar? 🥕')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
});

const usuarios = [
    {user: "mimmarcelo", pass: "Teste123"},
    {user: "joao", pass: "123"},
    {user: "maria", pass: "123"},
    {user: "ana", pass: "123"},
    {user: "carlos", pass: "123"}
];

let usuarioAtual = "";
let mensagens = [
    "Maria: Oi turma!",
    "João: Tudo certo por aqui."
];

// VERIFICA SE USUÁRIO ESTÁ LOGADO
function estaLogado() {
    return localStorage.getItem('usuarioLogado') !== null;
}

// FAZ O LOGIN
function fazerLogin(user, pass) {
    let valido = usuarios.find(u => u.user === user && u.pass === pass);
    
    if (valido) {
        usuarioAtual = user;
        localStorage.setItem('usuarioLogado', user); // SALVA NO NAVEGADOR
        document.getElementById("mensagemErro").innerText = "";
        window.location.href = "chat.html"; // REDIRECIONA PARA CHAT
        return true;
    } else {
        document.getElementById("mensagemErro").innerText = "❌ Usuário ou senha inválidos!";
        return false;
    }
}

// PROCESSA FORM DE LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // IMPEDIR RECARREGAMENTO DA PÁGINA
            
            let user = document.getElementById("usuario").value;
            let pass = document.getElementById("senha").value;
            
            fazerLogin(user, pass);
        });
    }

    // VERIFICA LINK DO CHAT
    const chatLink = document.querySelector('.requires-login');
    if (chatLink) {
        chatLink.addEventListener('click', function(e) {
            if (!estaLogado()) {
                e.preventDefault();
                
                // MOSTRA AVISO
                const alert = document.createElement('div');
                alert.className = 'login-alert';
                alert.innerHTML = `
                    🔐 Faça o login primeiro!
                    <button onclick="this.parentElement.remove()">×</button>
                `;
                document.body.appendChild(alert);
                
                setTimeout(() => alert.classList.add('show'), 100);
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.classList.remove('show');
                        setTimeout(() => alert.remove(), 400);
                    }
                }, 4000);
            }
            // SE LOGADO, DEIXA IR NORMALMENTE
        });
    }
});

// FUNÇÕES DO CHAT (para chat.html)
function mostrarMensagens() {
    let area = document.getElementById("mensagens");
    if (area) {
        area.innerHTML = "";
        for (let msg of mensagens) {
            area.innerHTML += `<p>${msg}</p>`;
        }
    }
}

function enviar() {
    let texto = document.getElementById("msg");
    if (texto && texto.value !== "" && usuarioAtual) {
        mensagens.push(usuarioAtual + ": " + texto.value);
        texto.value = "";
        mostrarMensagens();
    }
}
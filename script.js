const usuarios = [
    {user: "mimmarcelo", pass: "Teste123"},
    {user: "joao", pass: "123"},
    {user: "maria", pass: "123"},
    {user: "ana", pass: "123"},
    {user: "carlos", pass: "123"}
];

let usuarioAtual = "";
let mensagens = ["Maria: Oi turma!", "João: Tudo certo por aqui."];

function estaLogado() {
    return localStorage.getItem('usuarioLogado') !== null;
}

function fazerLogin(user, pass) {
    let valido = usuarios.find(u => u.user === user && u.pass === pass);
    if (valido) {
        usuarioAtual = user;
        localStorage.setItem('usuarioLogado', user);
        document.getElementById("mensagemErro").innerText = "";
        window.location.href = "chat.html";
        return true;
    } else {
        document.getElementById("mensagemErro").innerText = "❌ Usuário ou senha inválidos!";
        return false;
    }
}

function mostrarAlertaLogin() {
    const alertasAntigos = document.querySelectorAll('.login-alert');
    alertasAntigos.forEach(alerta => alerta.remove());
    
    const alert = document.createElement('div');
    alert.className = 'login-alert';
    alert.innerHTML = `🔐 Faça o login primeiro! <button onclick="this.parentElement.remove()">×</button>`;
    document.body.appendChild(alert);
    
    setTimeout(() => alert.classList.add('show'), 100);
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 400);
        }
    }, 4000);
}

// 🔧 EVENT LISTENER MAIS FORTE
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let user = document.getElementById("usuario").value;
            let pass = document.getElementById("senha").value;
            fazerLogin(user, pass);
        });
    }

    // ✅ BLOQUEIO TOTAL DO LINK CHAT
    const chatLink = document.querySelector('.requires-login');
    if (chatLink) {
        // ATIVA EVENTOS MÚLTIPLOS
        chatLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            mostrarAlertaLogin();
            return false;
        }, true); // CAPTURE PHASE
        
        chatLink.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            mostrarAlertaLogin();
            return false;
        }, true);
        
        chatLink.addEventListener('mouseup', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }, true);
    }
});

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
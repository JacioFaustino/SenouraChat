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

function entrar() {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("senha").value;

    let valido = usuarios.find(u => u.user === user && u.pass === pass);

    if (valido) {
        usuarioAtual = user;
       
    } else {
        document.getElementById("erro").innerText = "Login inválido";
    }
}

function mostrarMensagens() {
    let area = document.getElementById("mensagens");
    area.innerHTML = "";

    for (let msg of mensagens) {
        area.innerHTML += `<p>${msg}</p>`;
    }
}

function enviar() {
    let texto = document.getElementById("msg").value;

    if (texto !== "") {
        mensagens.push(usuarioAtual + ": " + texto);
        document.getElementById("msg").value = "";
        mostrarMensagens();
    }
}
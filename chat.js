const txtArea = document.getElementById("txt_area");
const btnEnviar = document.getElementById("btn_enviar");
const chat = document.getElementById("chat");

let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

mensagens.forEach(msg => {
    criarMensagem(msg);
});

function criarMensagem(texto) {

    const linha = document.createElement("div");

    linha.className = "w-full flex justify-end";

    const balao = document.createElement("div");

    balao.className = `
        bg-orange-400 text-white
        px-4 py-2 rounded-2xl
        max-w-[70%]
        break-words
    `;

    balao.textContent = texto;

    linha.appendChild(balao);

    chat.appendChild(linha);

    linha.scrollIntoView({
        behavior: "smooth"
    });
}

function enviarMensagem() {

    const texto = txtArea.value.trim();

    if (texto === "") return;

    criarMensagem(texto);

    mensagens.push(texto);

    localStorage.setItem(
        "mensagens",
        JSON.stringify(mensagens)
    );

    txtArea.value = "";
}

btnEnviar.addEventListener("click", enviarMensagem);

txtArea.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        enviarMensagem();
    }
});

const btnSenoura = document.getElementById("btn_senoura");

btnSenoura.addEventListener("click", () => {

    alert("💀");
    localStorage.clear();
    location.reload();

});


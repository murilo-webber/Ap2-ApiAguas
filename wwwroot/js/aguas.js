const API = "/api/aguas";

const form = document.querySelector("#formAgua");
const lista = document.querySelector("#listaAguas");
const mensagem = document.querySelector("#mensagem");

const campoId = document.querySelector("#id");
const campoMarca = document.querySelector("#marca");
const campoVolume = document.querySelector("#volume");
const campoTipo = document.querySelector("#tipo");

async function requisicao(url, opcoes = {}) {
    const resposta = await fetch(url, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...opcoes.headers
        }
    });

    if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
    }

    if (resposta.status === 204) {
        return null;
    }

    return resposta.json();
}

async function carregarAguas() {
    try {
        const aguas = await requisicao(API);
        lista.replaceChildren();

        aguas.forEach(agua => {
            const item = document.createElement("li");
            const descricao = document.createElement("span");

            descricao.textContent =
                `${agua.marca} — ${agua.volume} ml — ${agua.tipo} `;

            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.type = "button";
            editar.addEventListener("click", () => {
                campoId.value = agua.id;
                campoMarca.value = agua.marca;
                campoVolume.value = agua.volume;
                campoTipo.value = agua.tipo;
                mensagem.textContent = `Editando o registro ${agua.id}`;
            });

            const excluir = document.createElement("button");
            excluir.textContent = "Excluir";
            excluir.type = "button";
            excluir.addEventListener("click", async () => {
                if (!confirm(`Excluir ${agua.marca}?`)) return;

                try {
                    await requisicao(`${API}/${agua.id}`, {
                        method: "DELETE"
                    });
                    mensagem.textContent = "Registro excluído.";
                    await carregarAguas();
                } catch (erro) {
                    mensagem.textContent = erro.message;
                }
            });

            item.append(descricao, editar, excluir);
            lista.append(item);
        });
    } catch (erro) {
        mensagem.textContent =
            `Não foi possível carregar os registros: ${erro.message}`;
    }
}

form.addEventListener("submit", async evento => {
    evento.preventDefault();

    const id = campoId.value;

    const dados = {
        marca: campoMarca.value.trim(),
        volume: Number(campoVolume.value),
        tipo: campoTipo.value
    };

    if (!dados.marca || !dados.tipo || dados.volume <= 0) {
        mensagem.textContent = "Preencha os campos corretamente.";
        return;
    }

    try {
        if (id) {
            await requisicao(`${API}/${id}`, {
                method: "PUT",
                body: JSON.stringify(dados)
            });
            mensagem.textContent = "Registro atualizado.";
        } else {
            await requisicao(API, {
                method: "POST",
                body: JSON.stringify(dados)
            });
            mensagem.textContent = "Registro cadastrado.";
        }

        form.reset();
        campoId.value = "";
        await carregarAguas();
    } catch (erro) {
        mensagem.textContent =
            `Não foi possível salvar: ${erro.message}`;
    }
});

document.querySelector("#cancelar").addEventListener("click", () => {
    form.reset();
    campoId.value = "";
    mensagem.textContent = "Edição cancelada.";
});

document.querySelector("#atualizar").addEventListener("click", carregarAguas);

carregarAguas();

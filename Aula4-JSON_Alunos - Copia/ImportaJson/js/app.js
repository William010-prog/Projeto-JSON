let alunos = [];

const listaAlunos = document.getElementById("listaAlunos");
const status = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnAprovados = document.getElementById("btnAprovados");
const btnReprovados = document.getElementById("btnReprovados");

async function carregarAlunos(){
    try{
        status.textContent = "Carregar alunos...";
        const resposta = await fetch('alunos.json');

        //Verifica se houve erro
        if(!resposta.ok){
            throw new Error(
                "Não foi possível carregar a JSON.");
        }

    //Converte a resposta para JSON
    alunos = await resposta.json();

    status.textContent = `${alunos.length} aluno(s) carregado(s).`;
    mostrarAlunos(alunos);

} catch (erro) {
    status.textContent = `Erro: ${erro.message}`;
    }
}

function mostrarAlunos(lista){
    listaAlunos.innerHTML = "";

if (lista.lenght === 0) {
    listaAlunos.innerHTML = "<p> Nenhum aluno encontrado.</p>";
    return;
}
    lista.forEach((aluno) => {
        const card=document.createElement("div");
        card.classList.add("card");

        card.innerHTML=`
        <h2>${aluno.nome}</h2>
        <p><strong>Idade: </strong> ${aluno.idade}</p>
        <p><strong>Curso: </strong> ${aluno.curso}</p>
        <p><strong>Nota: </strong> ${aluno.nota}</p>
        `;
        listaAlunos.appendChild(card);
    });
}

function mostrarTodos() {
    mostrarAlunos(alunos);
    status.textContent = `${alunos.length} aluno(s) encontrado(s).`;
}

function mostrarAprovados() {
    const aprovados = alunos.filter((aluno)  => aluno.nota >= 6);
    mostrarAlunos(aprovados);
    status.textContent = `${aprovados.length} aluno() aprovado(s).`;
}

function mostrarReprovados() {
    const reprovados = alunos.filter((aluno)  => aluno.nota < 6);
    mostrarAlunos(reprovados);
    status.textContent =`${reprovados.length} aluno(s) reprovado(s).`;
}

btnBuscar.addEventListener("click", carregarAlunos);
btnTodos.addEventListener("click", mostrarTodos);
btnAprovados.addEventListener("click", mostrarAprovados);
btnReprovados.addEventListener("click", mostrarReprovados);

carregarAlunos()
import ehUmCPF from "./valida-cpf.js";
import ehUmaIdadeValida from "./valida-idade.js";
import ehUmNomeValido from "./valida-nome.js";
import ehUmEmailValido from "./valida-email.js";

// 1. TEMA (CLARO/ESCURO)
const btnTema = document.querySelector("#btn-tema");

const alternarTema = function() {
    const corpo = document.querySelector("body");
    // Selecionamos agora também parágrafos, listas e spans para garantir que o texto mude
    const caixas = document.querySelectorAll(".bg-white, .projeto-card, .tech-category, aside, form, .form, dd, dl");
    const textosGerais = document.querySelectorAll("p, li, h3, dd, dt");
    const textosAzuis = document.querySelectorAll(".text-blue-900");
    
    const temaAtual = corpo.getAttribute("data-tema") || "claro";

    if (temaAtual === "claro") {
        corpo.setAttribute("data-tema", "escuro");
        corpo.classList.replace("bg-gray-50", "bg-gray-800");
        corpo.classList.replace("text-gray-900", "text-gray-100");

        caixas.forEach(caixa => {
            caixa.classList.remove("bg-white", "bg-gray-50");
            caixa.classList.add("bg-gray-900", "text-gray-100");
        });

        textosGerais.forEach(texto => {
            texto.classList.remove("text-gray-900");
            texto.classList.add("text-gray-100");
        });

        textosAzuis.forEach(texto => {
            texto.classList.replace("text-blue-900", "text-blue-400");
        });

        btnTema.classList.add("invert");
        localStorage.setItem("tema", "escuro");
    } else {
        corpo.setAttribute("data-tema", "claro");
        corpo.classList.replace("bg-gray-800", "bg-gray-50");
        corpo.classList.replace("text-gray-100", "text-gray-900");

        caixas.forEach(caixa => {
            caixa.classList.remove("bg-gray-900", "text-gray-100");
            caixa.classList.add("bg-white", "text-gray-900");
        });

        textosGerais.forEach(texto => {
            texto.classList.remove("text-gray-100");
            texto.classList.add("text-gray-900");
        });

        document.querySelectorAll(".text-blue-400").forEach(texto => {
            texto.classList.replace("text-blue-400", "text-blue-900");
        });

        btnTema.classList.remove("invert");
        localStorage.setItem("tema", "claro");
    }
};

if (btnTema) btnTema.addEventListener("click", alternarTema);
if (localStorage.getItem("tema") === "escuro") {
    document.querySelector("body").setAttribute("data-tema", "claro");
    alternarTema();
}

// 2. VALIDAÇÃO E ENVIO DO FORMULÁRIO
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

// ... (mensagens e tiposDeErro continuam os mesmos) ...
const mensagens = {
    nome: { valueMissing: "O nome é obrigatório.", customError: "O nome inserido é inválido." },
    email: { valueMissing: "O e-mail é obrigatório.", typeMismatch: "Preencha um e-mail válido.", customError: "Formato não aceito." },
    idade: { valueMissing: "A idade é obrigatória.", customError: "A idade deve ser entre 10 e 120 anos." },
    cpf: { valueMissing: "O CPF é obrigatório.", patternMismatch: "Formato inválido.", customError: "Este CPF não existe.", tooShort: "Deve ter 11 dígitos." },
    nascimento: { valueMissing: "Data de nascimento é obrigatória." }
};
const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'tooShort', 'customError'];

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name == "nome") ehUmNomeValido(campo);
    if (campo.name == "email") ehUmEmailValido(campo);
    if (campo.name == "idade") ehUmaIdadeValida(campo);
    if (campo.name == "cpf" && campo.value.length >= 11) ehUmCPF(campo);

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) mensagem = mensagens[campo.name][erro];
    });

    const mensagemErro = campo.nextElementSibling;
    if (mensagemErro && !campo.checkValidity()) {
        mensagemErro.innerHTML = mensagem;
        mensagemErro.classList.remove('hidden');
    } else if (mensagemErro) {
        mensagemErro.innerHTML = "";
        mensagemErro.classList.add('hidden');
    }
}

if (formulario) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede que o formulário recarregue a página
        
        let formularioValido = true;

        // Força a checagem de todos os campos antes de deixar passar
        camposDoFormulario.forEach((campo) => {
            verificaCampo(campo); // Dispara os spans vermelhos se houver erro
            if (!campo.checkValidity()) {
                formularioValido = false; // Se um campo falhar, trava o envio
            }
        });

        // Se passar em todos os testes, o JavaScript faz a navegação
        if (formularioValido) {
            window.location.href = "identificacao-visual.html";
        }
    });
}
import ehUmCPF from "./valida-cpf.js";
import ehUmaIdadeValida from "./valida-idade.js";
import ehUmNomeValido from "./valida-nome.js";
import ehUmEmailValido from "./valida-email.js";

// 1. TEMA (CLARO/ESCURO)

/*const btnTema = document.querySelector("#btn-tema");
const htmlTag = document.documentElement; // Pega a tag <html>

const alternarTema = function() {
    if (htmlTag.classList.contains("dark")) {
        htmlTag.classList.remove("dark");
        localStorage.setItem("tema", "claro");
    } else {
        htmlTag.classList.add("dark");
        localStorage.setItem("tema", "escuro");
    }
};

if (btnTema) btnTema.addEventListener("click", alternarTema);

// Verifica ao carregar a página se já estava escuro
if (localStorage.getItem("tema") === "escuro") {
    htmlTag.classList.add("dark");
}*/
const btnTema = document.querySelector("#btn-tema");

const alternarTema = function() {
    const corpo = document.querySelector("body");
    const temaAtual = corpo.getAttribute("data-tema") || "claro";

    if (temaAtual === "claro") {
        corpo.setAttribute("data-tema", "escuro");
        corpo.classList.replace("bg-gray-50", "bg-gray-800");
        corpo.classList.replace("text-gray-900", "text-gray-100");

        // Escurece caixas brancas
        document.querySelectorAll(".bg-white").forEach(el => {
            el.classList.replace("bg-white", "bg-gray-900");
            el.classList.add("caixa-invertida"); 
        });

        // AQUI RESOLVE O SUMIÇO DO TEXTO M, F E INPUTS: 
        // Pega os fundos cinza claro (inputs, selects) e escurece
        document.querySelectorAll(".bg-gray-50").forEach(el => {
            el.classList.replace("bg-gray-50", "bg-gray-700");
            el.classList.replace("text-gray-900", "text-gray-100");
            el.classList.add("input-invertido");
        });

        // Clareia textos de labels e parágrafos
        document.querySelectorAll("main .text-gray-900, main label").forEach(el => {
            el.classList.replace("text-gray-900", "text-gray-100");
            el.classList.add("texto-invertido");
        });

        document.querySelectorAll("main .text-blue-900").forEach(el => {
            el.classList.replace("text-blue-900", "text-blue-400");
            el.classList.add("azul-invertido");
        });

        // LÓGICA DA LUA: Tira o fundo branco, aplica o invert para ela ficar branca
        if(btnTema) {
            btnTema.classList.remove("bg-white");
            btnTema.classList.add("invert");
        }

        localStorage.setItem("tema", "escuro");
    } else {
        // REVERTE PARA O MODO CLARO
        corpo.setAttribute("data-tema", "claro");
        corpo.classList.replace("bg-gray-800", "bg-gray-50");
        corpo.classList.replace("text-gray-100", "text-gray-900");

        document.querySelectorAll(".caixa-invertida").forEach(el => {
            el.classList.replace("bg-gray-900", "bg-white");
            el.classList.remove("caixa-invertida");
        });

        document.querySelectorAll(".input-invertido").forEach(el => {
            el.classList.replace("bg-gray-700", "bg-gray-50");
            el.classList.replace("text-gray-100", "text-gray-900");
            el.classList.remove("input-invertido");
        });

        document.querySelectorAll(".texto-invertido").forEach(el => {
            el.classList.replace("text-gray-100", "text-gray-900");
            el.classList.remove("texto-invertido");
        });

        document.querySelectorAll(".azul-invertido").forEach(el => {
            el.classList.replace("text-blue-400", "text-blue-900");
            el.classList.remove("azul-invertido");
        });

        // LÓGICA DA LUA: Volta o fundo branco e a lua preta
        if(btnTema) {
            btnTema.classList.add("bg-white");
            btnTema.classList.remove("invert");
        }

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

const mensagens = {
    nome: { valueMissing: "O nome é obrigatório." },
    email: { valueMissing: "O e-mail é obrigatório.", typeMismatch: "Preencha um e-mail válido." },
    idade: { valueMissing: "A idade é obrigatória." },
    cpf: { valueMissing: "O CPF é obrigatório.", patternMismatch: "Formato inválido.", tooShort: "Deve ter 11 dígitos." },
    nascimento: { valueMissing: "Data de nascimento é obrigatória." }
};
const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'tooShort'];

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

function verificaCampo(campo) {
    let mensagem = "";
    let validacaoHTML = campo.checkValidity(); // Pega a validação nativa (HTML5)
    let erroManual = false;

    // VALIDAÇÕES MANUAIS (Usa as nossas novas funções retornando true/false)
    if (campo.name === "nome" && !ehUmNomeValido(campo.value) && campo.value !== "") {
        mensagem = "O nome inserido é inválido (apenas letras).";
        erroManual = true;
    } 
    else if (campo.name === "email" && !ehUmEmailValido(campo.value) && campo.value !== "") {
        mensagem = "Formato de e-mail não aceito.";
        erroManual = true;
    } 
    else if (campo.name === "idade" && !ehUmaIdadeValida(campo.value) && campo.value !== "") {
        mensagem = "A idade deve ser entre 10 e 120 anos.";
        erroManual = true;
    } 
    else if (campo.name === "cpf" && campo.value.length >= 11 && !ehUmCPF(campo.value)) {
        mensagem = "Este CPF não é válido ou não existe.";
        erroManual = true;
    }

    // SE NÃO TEM ERRO MANUAL, PROCURA ERRO NATIVO (Ex: Campo Vazio)
    if (!erroManual) {
        tiposDeErro.forEach(erro => {
            if (campo.validity[erro]) {
                mensagem = mensagens[campo.name]?.[erro] || "Preencha este campo corretamente.";
            }
        });
    }

    // APLICA O ERRO NA TELA
    const mensagemErro = campo.nextElementSibling;
    if (mensagemErro) {
        if (mensagem !== "" || !validacaoHTML || erroManual) {
            mensagemErro.innerHTML = mensagem;
            mensagemErro.classList.remove('hidden');
            return false; // Retorna falso porque tem erro
        } else {
            mensagemErro.innerHTML = "";
            mensagemErro.classList.add('hidden');
            return true; // Retorna verdadeiro porque está tudo certo
        }
    }
    return true; 
}

// NAVEGAÇÃO
if (formulario) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        let formularioValido = true;

        camposDoFormulario.forEach((campo) => {
            let campoEstaCorreto = verificaCampo(campo); 
            if (!campoEstaCorreto) {
                formularioValido = false; 
            }
        });

        // Só viaja para a próxima página se tudo estiver certinho
        if (formularioValido) {
            window.location.href = "identificacao-visual.html";
        }
    });
}
